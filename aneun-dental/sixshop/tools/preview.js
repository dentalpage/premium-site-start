// usage: node preview.js <blocksOutDir> <siteDir> <previewDir>
// Assembles blocks the way Sixshop renders them (scoped CSS, Handlebars, bm runtime) for local comparison.
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const postcss = require('postcss');
const [blocksDir, siteDir, outDir] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
fs.cpSync(path.join(siteDir, 'assets'), path.join(outDir, 'assets'), { recursive: true });

const ORDER = ['header', 'hero', 'promise', 'doctor', 'visit', 'comfort', 'symptoms', 'implant', 'location', 'footer'];
const scope = (css, key) => postcss([root => {
  root.walkRules(rule => {
    if (rule.parent && rule.parent.type === 'atrule' && /keyframes/.test(rule.parent.name)) return;
    rule.selectors = rule.selectors.map(s => `div[data-block-id="${key}"] ${s}`);
  });
}]).process(css, { from: undefined }).css;

let body = '', styles = '', scripts = '';
for (const key of ORDER) {
  const b = JSON.parse(fs.readFileSync(path.join(blocksDir, key + (process.env.SUFFIX || '') + '.json'), 'utf8'));
  const prop = { ...b.property };
  for (const name of b.images) prop['img' + name.replace(/-v\d+$/, '').replace(/(^|-)([a-z0-9])/g, (_, d, c) => c.toUpperCase())] = `assets/${name}.webp`;
  const ctx = { id: key, property: prop };
  const style = b.content.match(/<style>([\s\S]*?)<\/style>/)[1];
  const tpl = b.content.match(/<template>([\s\S]*?)<\/template>/)[1];
  const script = b.content.match(/<script>([\s\S]*?)<\/script>/)[1];
  styles += scope(Handlebars.compile(style)(ctx), key);
  const html = Handlebars.compile(tpl)(ctx);
  const wrapStart = key === 'header' ? '<div class="ss-section ss-sticky">' : '<div class="ss-section">';
  body += `${wrapStart}<div data-block-id="${key}">${html}</div></div>\n`;
  scripts += `(function(){const bm={container:document.querySelector('div[data-block-id="${key}"]'),context:${JSON.stringify(ctx)}};${script}})();\n`;
}

const page = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600&family=Noto+Sans+KR:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{--font-family-heading:'Noto Serif KR';--font-weight-heading:400;--font-family-body:'Noto Sans KR';--font-weight-body:400}
body{margin:0;background:#F8F7F5;font-family:'Noto Sans KR';font-size:16px;line-height:1.5}
/* 식스샵 블록 초기화 가정(최악의 경우) */
div[data-block-id] *, div[data-block-id] *::before, div[data-block-id] *::after{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline;box-sizing:border-box}
div[data-block-id] ol, div[data-block-id] ul{list-style:none}
div[data-block-id] button{background:none;color:inherit}
div[data-block-id] img{max-width:100%;height:auto}
.ss-sticky{position:sticky;top:0;z-index:100}
${styles}
</style></head><body>
${body}
<script>${scripts}</script>
</body></html>`;
fs.writeFileSync(path.join(outDir, 'index.html'), page);
console.log('preview written', page.length);
