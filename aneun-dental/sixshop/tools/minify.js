// Shrinks block content (CSS whitespace/comments, template whitespace) so it can be sent inline.
const fs = require('fs'), path = require('path');
const [dir] = process.argv.slice(2);
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.includes('.min'))) {
  const b = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  let c = b.content;
  c = c.replace(/<style>([\s\S]*?)<\/style>/, (_, raw) => { const hb = []; const css = raw.replace(/\{\{[^}]*\}\}/g, m => `@@HB${hb.push(m) - 1}@@`); return '<style>\n' + (css
    .replace(/\/\*(?![\s\S]*?블록|[\s\S]*?원본)[\s\S]*?\*\//g, '')
    .replace(/\/\*[^*]*\.css \*\//g, '')
    .replace(/\s*\n\s*/g, '\n').replace(/\s*([{};,])\s*/g, '$1').replace(/;}/g, '}').replace(/\n+/g, '\n').trim()).replace(/@@HB(\d+)@@/g, (_, i) => hb[i]) + '\n</style>'; });
  c = c.replace(/<template>([\s\S]*?)<\/template>/, (_, t) => '<template>\n' + t.replace(/>\s*\n\s*</g, '><').trim() + '\n</template>');
  b.content = c;
  fs.writeFileSync(path.join(dir, f.replace('.json', '.min.json')), JSON.stringify(b));
  console.log(f, c.length);
}
