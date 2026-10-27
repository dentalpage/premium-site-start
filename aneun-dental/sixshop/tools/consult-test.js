// usage: node consult-test.js <footer.block.html> <outDir>
// Renders the footer block like Sixshop (scoped CSS, worst-case reset) and drives the consult/booking flow.
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const postcss = require('postcss');
const { chromium } = require('playwright');
const [blockFile, outDir] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

const src = fs.readFileSync(blockFile, 'utf8');
const style = src.match(/<style>([\s\S]*?)<\/style>/)[1];
const tpl = src.match(/<template>([\s\S]*?)<\/template>/)[1];
const script = src.match(/<script>([\s\S]*?)<\/script>/)[1];
const scope = (css) => postcss([(root) => root.walkRules((r) => {
  if (r.parent && r.parent.type === 'atrule' && /keyframes/.test(r.parent.name)) return;
  r.selectors = r.selectors.map((s) => `div[data-block-id="f"] ${s}`);
})]).process(css, { from: undefined }).css;

function page(ctx) {
  const html = Handlebars.compile(tpl)(ctx);
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{margin:0;background:#F8F7F5;font-family:sans-serif}.filler{height:1400px;background:linear-gradient(#e9eef3,#fff)}
div[data-block-id] *, div[data-block-id] *::before, div[data-block-id] *::after{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline;box-sizing:border-box}
div[data-block-id] ol, div[data-block-id] ul{list-style:none}div[data-block-id] button{background:none;color:inherit}
${scope(Handlebars.compile(style)(ctx))}</style></head><body><section data-section-id="hero" class="filler" style="height:900px"></section><section data-section-id="s2" class="filler"></section>
<a id="adBanner" style="position:fixed;left:0;right:0;bottom:0;height:58px;background:#444;z-index:9999"></a><section data-section-id="foot" class="global-bottom"><div data-block-id="f" style="visibility:hidden">${html}</div></section>
<script>window.__posts=[];window.__fail=false;
(function(){const bm={container:document.querySelector('div[data-block-id="f"]'),context:${JSON.stringify(ctx)},
do:async(a,p)=>{if(a==='snackbar:open'){window.__snack=p.message;return;}if(a!=='board:createPost')return;await new Promise(r=>setTimeout(r,150));if(window.__fail)throw new Error('테스트 오류');window.__posts.push(p.params);}};
${script}})();</script></body></html>`;
}

const base = {
  id: 'f',
  property: { paddingTopDesktop: 0, paddingRightDesktop: 0, paddingBottomDesktop: 0, paddingLeftDesktop: 0, paddingTopMobile: 0, paddingRightMobile: 0, paddingBottomMobile: 0, paddingLeftMobile: 0,
    kakaoLink: { id: null, type: 'url', label: '', value: 'http://pf.kakao.com/_test/chat' },
    talktalkLink: { id: null, type: '', label: '', value: '' },
    consultBoard: { id: 6183, name: '상담 예약 접수' } },
  customer: null,
  social: { email: 'clinic@example.com', kakao: '' },
};

(async () => {
  const browser = await chromium.launch();
  const results = [];
  for (const vp of [{ n: 'desktop', w: 1440, h: 900 }, { n: 'mobile', w: 390, h: 844 }]) {
    const ctxB = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
    const p = await ctxB.newPage();
    const errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.setContent(page(base));
    await p.waitForTimeout(400);
    const shot = (k) => p.screenshot({ path: path.join(outDir, `${vp.n}-${k}.png`) });
    const awayTop = await p.$eval('.cta-dock', (el) => getComputedStyle(el).visibility);
    await p.evaluate(() => window.scrollTo(0, 400));
    await p.waitForTimeout(500);
    await shot('1-dock');
    const shownAfterHero = await p.$eval('.cta-dock', (el) => getComputedStyle(el).visibility);
    const gapAboveAd = await p.evaluate(() => Math.round(document.getElementById('adBanner').getBoundingClientRect().top - document.querySelector('.cta-dock').getBoundingClientRect().bottom));
    const dock = await p.$eval('.cta-dock', (el) => { const r = el.getBoundingClientRect(); return [r.left, r.top, r.width, r.height].map(Math.round); });
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);

    const kakaoHref = await p.$eval('.dock-kakao', (el) => el.getAttribute('href'));
    await p.click('.dock-naver');
    const snack = await p.evaluate(() => window.__snack);
    await p.click('.dock-consult');
    await p.waitForTimeout(300);
    const collapsed = await p.$eval('.cta-dock', (el) => el.classList.contains('is-closed') && getComputedStyle(el.querySelector('.dock-channels')).visibility === 'hidden');
    await shot('2-collapsed');
    await p.click('.dock-consult');
    await p.waitForTimeout(300);
    const expanded = await p.$eval('.dock-consult', (el) => el.getAttribute('aria-expanded'));
    await p.evaluate(() => window.dispatchEvent(new CustomEvent('aneun:book')));
    await p.waitForTimeout(200);
    await shot('3-booking');
    await p.click('.submit-btn');
    const err1 = await p.$eval('.form-error', (e) => e.textContent);
    await p.fill('#bk-name', '홍길동');
    await p.type('#bk-phone', '01012345678');
    const phoneVal = await p.$eval('#bk-phone', (e) => e.value);
    await p.click('.submit-btn');
    const err2 = await p.$eval('.form-error', (e) => e.textContent);
    await p.click('text=임플란트');
    await p.click('text=저녁');
    await p.fill('#bk-message', '왼쪽 어금니가 <아파요>');
    await p.check('input[name=agree]');
    await shot('4-filled');
    await p.evaluate(() => { window.__fail = true; });
    await p.click('.submit-btn');
    await p.waitForTimeout(300);
    const err3 = await p.$eval('.form-error', (e) => e.textContent);
    await p.evaluate(() => { window.__fail = false; });
    await p.click('.submit-btn');
    await p.waitForTimeout(300);
    await shot('5-done');
    const posts = await p.evaluate(() => window.__posts);
    // reopen from another block's signal resets the form
    await p.click('.booking-done [data-close]');
    await p.evaluate(() => window.dispatchEvent(new CustomEvent('aneun:book')));
    await p.waitForTimeout(200);
    const reset = await p.evaluate(() => !document.querySelector('.booking-form').hidden && document.querySelector('#bk-name').value === '');
    // dialog fits viewport
    const fits = await p.$eval('#booking-dialog', (d) => { const r = d.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight; });
    results.push({ vp: vp.n, awayTop, shownAfterHero, gapAboveAd, dock, overflow, kakaoHref, snack, collapsed, expanded, err1, err2, phoneVal, err3, posts, reset, fits, errors });
    await ctxB.close();
  }
  console.log(JSON.stringify(results, null, 1));
  await browser.close();
})();
