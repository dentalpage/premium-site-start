// usage: node block-check.js <blocksDir> <assetsDir> <outDir> <key> [key...]
// Renders single blocks like Sixshop (scoped CSS, worst-case reset) at phone/tablet/desktop widths,
// reports text smaller than 13px and anything wider than the viewport, and saves screenshots.
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const postcss = require('postcss');
const { chromium } = require('playwright');
const [blocksDir, assetsDir, outDir, ...keys] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

const scope = (css) => postcss([(root) => root.walkRules((r) => {
  if (r.parent && r.parent.type === 'atrule' && /keyframes/.test(r.parent.name)) return;
  r.selectors = r.selectors.map((s) => `div[data-block-id="b"] ${s}`);
})]).process(css, { from: undefined }).css;

function page(key) {
  const src = fs.readFileSync(path.join(blocksDir, `${key}.block.html`), 'utf8');
  const st = JSON.parse(fs.readFileSync(path.join(blocksDir, `${key}.settings.json`), 'utf8'));
  const property = { ...st.property };
  for (const s of st.settings) {
    const m = s.type === 'IMAGE_PICKER' && /원본 파일: (\S+)/.exec(s.description || '');
    if (m) property[s.id] = 'file://' + path.resolve(assetsDir, m[1]);
  }
  const ctx = { id: 'b', property, customer: null, social: {} };
  const style = src.match(/<style>([\s\S]*?)<\/style>/)[1];
  const tpl = src.match(/<template>([\s\S]*?)<\/template>/)[1];
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{margin:0;font-family:sans-serif}
div[data-block-id] *, div[data-block-id] *::before, div[data-block-id] *::after{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline;box-sizing:border-box}
div[data-block-id] ol, div[data-block-id] ul{list-style:none}div[data-block-id] button{background:none;color:inherit}
${scope(Handlebars.compile(style)(ctx))}</style></head><body><div data-block-id="b">${Handlebars.compile(tpl)(ctx)}</div></body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  for (const key of keys) {
    const html = page(key);
    const file = path.resolve(outDir, `${key}.html`);
    fs.writeFileSync(file, html);
    for (const w of [360, 390, 768, 1440]) {
      const p = await browser.newPage({ viewport: { width: w, height: 900 } });
      await p.goto('file://' + file);
      await p.waitForTimeout(300);
      const r = await p.evaluate(() => {
        const small = {};
        const walker = document.createTreeWalker(document.querySelector('[data-block-id]'), NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const t = walker.currentNode.textContent.trim();
          const el = walker.currentNode.parentElement;
          if (!t || !el.getClientRects().length || getComputedStyle(el).visibility === 'hidden') continue;
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs < 13) { const k = `${fs}px ${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}`; (small[k] = small[k] || []).push(t.slice(0, 18)); }
        }
        const wide = [...document.querySelectorAll('[data-block-id] *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed').map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`).slice(0, 5);
        return { small, wide, scrollW: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight };
      });
      await p.screenshot({ path: path.join(outDir, `${key}-${w}.png`), fullPage: true });
      console.log(key, w, JSON.stringify(r));
      await p.close();
    }
  }
  await browser.close();
})();
