// usage: node extract-blocks.js <siteDir> <outDir>
// Splits the site into Sixshop blocks: per-block HTML + the original CSS rules (source text, cascade order) that touch it.
const { chromium } = require('playwright');
const postcss = require('postcss');
const http = require('http');
const fs = require('fs');
const path = require('path');
const [siteDir, outDir] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

const BLOCKS = [
  { key: 'header', roots: ['#header', '#mobile-menu'] },
  { key: 'hero', roots: ['#home'] },
  { key: 'promise', roots: ['#promise'] },
  { key: 'doctor', roots: ['#doctor'] },
  { key: 'visit', roots: ['#first-visit'] },
  { key: 'comfort', roots: ['#comfort'] },
  { key: 'symptoms', roots: ['#symptoms'] },
  { key: 'implant', roots: ['#implant'] },
  { key: 'location', roots: ['#location'] },
  { key: 'footer', roots: ['.clinic-footer', '.sticky-book', '#booking-dialog', '#section-dialog'] },
];

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const p = path.join(siteDir, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' }); res.end(d); });
});

(async () => {
  const html = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
  const sheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+\.css)">/g)].map(m => m[1]);
  const roots = sheets.map(f => postcss.parse(fs.readFileSync(path.join(siteDir, f), 'utf8')));
  const allSelectors = new Set();
  roots.forEach(r => r.walkRules(rule => rule.selectors.forEach(s => allSelectors.add(s))));

  await new Promise(r => server.listen(0, r));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  const matches = await page.evaluate(({ BLOCKS, selectors }) => {
    const strip = s => s
      .replace(/::?(before|after|backdrop|placeholder|marker|-webkit-[a-z-]+)/g, '')
      .replace(/:(hover|focus-visible|focus-within|focus|active|visited)/g, '')
      .replace(/\.is-active/g, '')
      .trim() || '*';
    const out = {};
    for (const b of BLOCKS) {
      const roots = b.roots.map(s => document.querySelector(s));
      const els = roots.flatMap(r => [r, ...r.querySelectorAll('*')]);
      const inMain = roots[0].closest('main') !== null;
      out[b.key] = {
        html: roots.map(r => r.outerHTML).join('\n'),
        sel: selectors.filter(sel => {
          if (/^\s*(:root|body)\s*$/.test(sel) || (inMain && /^\s*main\s*$/.test(sel))) return true;
          try { return els.some(e => e.matches(strip(sel))); } catch { return false; }
        }),
      };
    }
    return out;
  }, { BLOCKS, selectors: [...allSelectors] });

  for (const b of BLOCKS) {
    const keep = new Set(matches[b.key].sel);
    let css = '';
    roots.forEach((root, i) => {
      const clone = root.clone();
      clone.walkRules(rule => {
        if (rule.parent && rule.parent.type === 'atrule' && /keyframes/.test(rule.parent.name)) return;
        const sels = rule.selectors.filter(s => keep.has(s) && !/^\s*html\b/.test(s)).map(s => s.replace(/^\s*(:root|body|main)\b/, '.an').trim());
        if (sels.length) rule.selectors = [...new Set(sels)]; else rule.remove();
      });
      clone.walkAtRules(at => { if (at.name === 'media' && !at.nodes.length) at.remove(); });
      clone.walkComments(c => c.remove());
      const text = clone.toString().trim();
      if (text) css += `/* ${sheets[i]} */\n${text}\n`;
    });
    fs.writeFileSync(path.join(outDir, b.key + '.html'), matches[b.key].html);
    fs.writeFileSync(path.join(outDir, b.key + '.css'), css);
    console.log(b.key, 'html', matches[b.key].html.length, 'css', css.length);
  }
  await browser.close(); server.close();
})();
