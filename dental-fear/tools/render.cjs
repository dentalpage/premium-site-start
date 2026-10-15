// Renders the camera chain (dive0, conn0, dive1, … dive4) for desktop 16:9 and mobile 9:16.
// usage: node render.cjs <outDir> [desktop|mobile|both] [--preview]
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const W = require('./world.cjs');

const OUT = path.resolve(process.argv[2] || 'out');
const WHICH = process.argv[3] || 'both';
const PREVIEW = process.argv.includes('--preview');
const FPS = 24, DIVE_S = 4, CONN_S = 3;

const VARIANTS = {
  desktop: { vw: 1280, vh: 720, dsf: 1.5, wide: 1350, close: 560, mid: 2500, ax: 0.62, ay: 0.5, cax: 0.6, cay: 0.5 },
  mobile: { vw: 720, vh: 1280, dsf: 1, wide: 820, close: 420, mid: 1500, ax: 0.5, ay: 0.36, cax: 0.5, cay: 0.36 },
};

// camera = viewBox centre + width; anchors put the subject where the copy isn't
function cam(pt, w, ax, ay, v) {
  const h = w * v.vh / v.vw;
  return { cx: pt[0] + (0.5 - ax) * w, cy: pt[1] + (0.5 - ay) * h, w };
}
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (a, b, t) => a + (b - a) * t;

function chain(v) {
  const segs = [];
  const n = W.ISLANDS.length;
  for (let i = 0; i < n; i++) {
    const wide = cam(W.center(W.ISLANDS[i]), v.wide, v.ax, v.ay, v);
    const close = cam(W.FOCAL[i], v.close, v.cax, v.cay, v);
    segs.push({ name: `dive${i + 1}`, frames: DIVE_S * FPS, a: wide, b: close, bump: 1 });
    if (i < n - 1) {
      const next = cam(W.center(W.ISLANDS[i + 1]), v.wide, v.ax, v.ay, v);
      segs.push({ name: `conn${i + 1}`, frames: CONN_S * FPS, a: close, b: next, bump: v.mid });
    }
  }
  let t0 = 0;
  for (const s of segs) { s.t0 = t0; t0 += (s.frames - 1) / FPS; }
  return segs;
}

function camAt(s, t) {
  const e = ease(t);
  const lw = lerp(Math.log(s.a.w), Math.log(s.b.w), e);
  const peak = s.bump > 1 ? Math.log(s.bump) - (Math.log(s.a.w) + Math.log(s.b.w)) / 2 : 0;
  return { cx: lerp(s.a.cx, s.b.cx, e), cy: lerp(s.a.cy, s.b.cy, e), w: Math.exp(lw + Math.max(0, peak) * Math.sin(Math.PI * t)) };
}

async function renderVariant(browser, key) {
  const v = VARIANTS[key];
  const page = await browser.newPage({ viewport: { width: v.vw, height: v.vh }, deviceScaleFactor: v.dsf });
  await page.setContent(`<html><body style="margin:0;background:${W.PAL.bg}"><svg id="w" xmlns="http://www.w3.org/2000/svg" width="${v.vw}" height="${v.vh}" style="display:block" shape-rendering="geometricPrecision"><rect id="bgr" fill="${W.PAL.bg}" x="-99999" y="-99999" width="199998" height="199998"/><g id="back"></g>${W.STATIC}<g id="dyn"></g></svg></body></html>`);
  const segs = chain(v);
  for (const s of segs) {
    const dir = path.join(OUT, key, s.name);
    fs.mkdirSync(dir, { recursive: true });
    const list = PREVIEW ? [0, s.frames - 1] : [...Array(s.frames).keys()];
    for (const k of list) {
      const t = k / (s.frames - 1), c = camAt(s, t), h = c.w * v.vh / v.vw, T = s.t0 + k / FPS;
      await page.evaluate(([vb, back, dyn]) => {
        const svg = document.getElementById('w');
        svg.setAttribute('viewBox', vb);
        document.getElementById('back').innerHTML = back;
        document.getElementById('dyn').innerHTML = dyn;
      }, [`${(c.cx - c.w / 2).toFixed(2)} ${(c.cy - h / 2).toFixed(2)} ${c.w.toFixed(2)} ${h.toFixed(2)}`, W.dynBack(T), W.dynamic(T)]);
      await page.screenshot({ path: path.join(dir, `${String(k).padStart(4, '0')}.png`) });
    }
    console.log(key, s.name, list.length);
  }
  await page.close();
  return segs;
}

(async () => {
  const browser = await chromium.launch();
  for (const key of WHICH === 'both' ? ['desktop', 'mobile'] : [WHICH]) await renderVariant(browser, key);
  await browser.close();
})();
