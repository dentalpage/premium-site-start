// Procedural isometric "clay diorama" world for 쉼표치과.
// Stands in for the AI-generated stills of scroll-world: one SVG world, one camera path,
// so every dive/connector seam is frame-identical by construction.

const C = Math.cos(Math.PI / 6), S = 0.5;

const PAL = {
  bg: '#F4F1EC',
  accent: '#2F9E8F',
  grass: '#BCD9B2', grassDeep: '#94BFA0', soil: '#DCC6A6',
  wood: '#E9D4B5', woodDark: '#C9A57D',
  wall: '#FBF7F0', wallShade: '#EDE6DA',
  cream: '#FFF9EE', white: '#FDFCF9',
  skin: '#F2C9A8', hair: '#4A3B35', hair2: '#8A5A3C',
  peach: '#F2B49B', navy: '#4C5A73', sky: '#CFE6F0',
  tree: '#8FC49A', tree2: '#6FAE86', trunk: '#A97E5A',
  rose: '#F3A6A0', butter: '#F6D78B', lilac: '#C9B6E4',
};

function hexToRgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
function rgbToHex(r, g, b) { return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join(''); }
function mix(h, t, k) { const a = hexToRgb(h), b = hexToRgb(t); return rgbToHex(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k); }
const lighten = (h, k) => mix(h, '#ffffff', k);
const darken = (h, k) => mix(h, '#3a2f3a', k);
const tones = h => ({ top: lighten(h, 0.12), left: h, right: darken(h, 0.16) });

// One island = local iso coords projected around a screen origin; items are depth-sorted.
class Island {
  constructor(ox, oy) { this.ox = ox; this.oy = oy; this.items = []; }
  P(x, y, z) { return [this.ox + (x - y) * C, this.oy + (x + y) * S - z]; }
  pts(arr) { return arr.map(p => this.P(...p).map(v => v.toFixed(1)).join(',')).join(' '); }
  add(depth, svg) { this.items.push([depth, this.items.length, svg]); }
  poly(depth, arr, fill, extra = '') { this.add(depth, `<polygon points="${this.pts(arr)}" fill="${fill}" ${extra}/>`); }

  box(x, y, z, w, d, h, col, depth) {
    const t = typeof col === 'string' ? tones(col) : col;
    const dk = depth ?? (x + w / 2 + y + d / 2 + z * 0.02);
    const s = [
      `<polygon points="${this.pts([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]])}" fill="${t.right}"/>`,
      `<polygon points="${this.pts([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]])}" fill="${t.left}"/>`,
      `<polygon points="${this.pts([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]])}" fill="${t.top}"/>`,
    ].join('');
    this.add(dk, s);
  }
  quadX(xp, y1, y2, z1, z2, fill, depth, extra = '') { this.poly(depth, [[xp, y1, z1], [xp, y2, z1], [xp, y2, z2], [xp, y1, z2]], fill, extra); }
  quadY(yp, x1, x2, z1, z2, fill, depth, extra = '') { this.poly(depth, [[x1, yp, z1], [x2, yp, z1], [x2, yp, z2], [x1, yp, z2]], fill, extra); }
  tile(x, y, z, w, d, fill, depth) { this.poly(depth ?? -500, [[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]], fill); }

  ell(x, y, z, r) { const [cx, cy] = this.P(x, y, z); return { cx, cy, rx: r * 1.2247, ry: r * 0.7071 }; }
  disc(x, y, z, r, fill, depth, extra = '') {
    const e = this.ell(x, y, z, r);
    this.add(depth ?? (x + y + z * 0.02), `<ellipse cx="${e.cx.toFixed(1)}" cy="${e.cy.toFixed(1)}" rx="${e.rx.toFixed(1)}" ry="${e.ry.toFixed(1)}" fill="${fill}" ${extra}/>`);
  }
  cyl(x, y, z, r, h, col, depth) {
    const t = tones(col);
    const b = this.ell(x, y, z, r), tp = this.ell(x, y, z + h, r);
    const side = `<path d="M${(b.cx - b.rx).toFixed(1)},${b.cy.toFixed(1)} A${b.rx.toFixed(1)},${b.ry.toFixed(1)} 0 0 0 ${(b.cx + b.rx).toFixed(1)},${b.cy.toFixed(1)} L${(tp.cx + tp.rx).toFixed(1)},${tp.cy.toFixed(1)} L${(tp.cx - tp.rx).toFixed(1)},${tp.cy.toFixed(1)} Z" fill="${t.left}"/>`;
    const shade = `<path d="M${(b.cx - b.rx).toFixed(1)},${b.cy.toFixed(1)} A${b.rx.toFixed(1)},${b.ry.toFixed(1)} 0 0 0 ${(b.cx + b.rx).toFixed(1)},${b.cy.toFixed(1)} L${(tp.cx + tp.rx).toFixed(1)},${tp.cy.toFixed(1)} L${(tp.cx - tp.rx).toFixed(1)},${tp.cy.toFixed(1)} Z" fill="url(#cylShade)"/>`;
    const top = `<ellipse cx="${tp.cx.toFixed(1)}" cy="${tp.cy.toFixed(1)}" rx="${tp.rx.toFixed(1)}" ry="${tp.ry.toFixed(1)}" fill="${t.top}"/>`;
    this.add(depth ?? (x + y + z * 0.02), side + shade + top);
  }
  sphere(x, y, z, r, col, depth) {
    const [cx, cy] = this.P(x, y, z);
    this.add(depth ?? (x + y + z * 0.02),
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${col}"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="url(#sphShade)"/>`);
  }
  shadow(x, y, z, r, depth = -400, op = 0.13) {
    const e = this.ell(x, y, z, r);
    this.add(depth, `<ellipse cx="${e.cx.toFixed(1)}" cy="${e.cy.toFixed(1)}" rx="${e.rx.toFixed(1)}" ry="${e.ry.toFixed(1)}" fill="#3a2f3a" opacity="${op}" filter="url(#soft)"/>`);
  }

  tree(x, y, s = 1) {
    this.shadow(x + 6, y + 6, 0, 30 * s);
    this.cyl(x, y, 0, 5 * s, 26 * s, PAL.trunk, x + y);
    this.sphere(x, y, 48 * s, 30 * s, PAL.tree2, x + y + 0.1);
    this.sphere(x - 4, y - 2, 70 * s, 22 * s, PAL.tree, x + y + 0.2);
  }
  bush(x, y, col = PAL.tree, r = 14) { this.sphere(x, y, r * 0.8, r, col, x + y); }

  // Minimal clay figure. pose: stand | sit | lie | raise | back
  person(x, y, z, o = {}) {
    const shirt = o.shirt || PAL.peach, pants = o.pants || PAL.navy, dk = o.depth ?? (x + y + 1);
    const pose = o.pose || 'stand';
    let headZ;
    if (pose === 'lie') {
      this.box(x + 20, y - 11, z, 62, 22, 14, pants, dk);
      this.box(x - 30, y - 13, z + 4, 52, 26, 20, shirt, dk + 0.1);
      headZ = z + 22; this.head(x - 44, y, headZ, o, dk + 0.2);
      if (o.raise) {
        const [sx, sy] = this.P(x - 18, y + 12, z + 22), [hx, hy] = this.P(x - 18, y + 16, z + 92);
        this.add(dk + 0.3, `<line x1="${sx}" y1="${sy}" x2="${hx}" y2="${hy}" stroke="${shirt}" stroke-width="9" stroke-linecap="round"/><circle cx="${hx}" cy="${hy - 4}" r="8" fill="${PAL.skin}"/>`);
      }
      return;
    }
    if (pose === 'sit') {
      this.box(x, y - 8, z, 26, 16, 10, pants, dk);
      this.cyl(x, y, z, 11, 26, shirt, dk + 0.1);
      headZ = z + 38;
    } else {
      this.box(x - 6, y - 6, z, 12, 12, 22, pants, dk);
      this.cyl(x, y, z + 20, 12, 28, shirt, dk + 0.1);
      headZ = z + 60;
      if (pose === 'raise') {
        const [sx, sy] = this.P(x + 6, y + 8, z + 42), [hx, hy] = this.P(x + 8, y + 12, z + 84);
        this.add(dk + 0.3, `<line x1="${sx}" y1="${sy}" x2="${hx}" y2="${hy}" stroke="${shirt}" stroke-width="8" stroke-linecap="round"/><circle cx="${hx}" cy="${hy - 3}" r="7" fill="${PAL.skin}"/>`);
      }
    }
    this.head(x, y, headZ, o, dk + 0.2);
  }
  head(x, y, z, o, dk) {
    const [cx, cy] = this.P(x, y, z);
    const hair = o.hair || PAL.hair;
    let face = '';
    if (!o.back) {
      const mood = o.mood || 'calm';
      face += `<circle cx="${cx - 4}" cy="${cy + 1}" r="1.5" fill="#3a2f3a"/><circle cx="${cx + 4}" cy="${cy + 1}" r="1.5" fill="#3a2f3a"/>`;
      if (mood === 'smile') face += `<path d="M${cx - 4},${cy + 5} Q${cx},${cy + 9.5} ${cx + 4},${cy + 5}" stroke="#3a2f3a" stroke-width="1.4" fill="none" stroke-linecap="round"/><circle cx="${cx - 7}" cy="${cy + 5}" r="2.2" fill="${PAL.rose}" opacity=".7"/><circle cx="${cx + 7}" cy="${cy + 5}" r="2.2" fill="${PAL.rose}" opacity=".7"/>`;
      else if (mood === 'worry') face += `<path d="M${cx - 3},${cy + 7} Q${cx},${cy + 5} ${cx + 3},${cy + 7}" stroke="#3a2f3a" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
      else face += `<path d="M${cx - 3},${cy + 6} L${cx + 3},${cy + 6}" stroke="#3a2f3a" stroke-width="1.3" stroke-linecap="round"/>`;
      if (o.mask) face = `<circle cx="${cx - 4}" cy="${cy}" r="1.5" fill="#3a2f3a"/><circle cx="${cx + 4}" cy="${cy}" r="1.5" fill="#3a2f3a"/><path d="M${cx - 9},${cy + 3} Q${cx},${cy + 13} ${cx + 9},${cy + 3} Z" fill="${lighten(PAL.accent, 0.55)}"/>`;
    }
    this.add(dk, `<circle cx="${cx}" cy="${cy - 2}" r="13" fill="${hair}"/><circle cx="${cx}" cy="${cy + 1.5}" r="11.5" fill="${PAL.skin}"/><circle cx="${cx}" cy="${cy + 1.5}" r="11.5" fill="url(#sphShade)"/>` +
      (o.back ? `<circle cx="${cx}" cy="${cy + 1}" r="11.6" fill="${hair}"/>` : `<path d="M${cx - 12},${cy - 1} Q${cx},${cy - 12} ${cx + 12},${cy - 1} Q${cx + 6},${cy - 7} ${cx},${cy - 6} Q${cx - 6},${cy - 7} ${cx - 12},${cy - 1}Z" fill="${hair}"/>`) + face);
    if (o.cap) this.add(dk + 0.01, `<path d="M${cx - 12},${cy - 4} Q${cx},${cy - 18} ${cx + 12},${cy - 4} Z" fill="${o.cap}"/>`);
  }

  // Floating ground slab with grass/floor top and a soil skirt.
  slab(topCol, sideCol, size = 520) {
    this.shadow(size / 2 + 40, size / 2 + 40, -150, size * 0.48, -3000, 0.08);
    this.box(0, 0, -74, size, size, 50, { top: sideCol, left: sideCol, right: darken(sideCol, 0.14) }, -2001);
    this.box(0, 0, -24, size, size, 24, { top: topCol, left: darken(topCol, 0.06), right: darken(topCol, 0.18) }, -2000);
  }
  room(floor, wall, size = 520, h = 210) {
    this.slab(floor, PAL.soil, size);
    this.box(0, 0, 0, 14, size, h, { top: lighten(wall, .3), left: wall, right: darken(wall, 0.05) }, -1000);
    this.box(14, 0, 0, size - 14, 14, h, { top: lighten(wall, .3), left: mix(wall, '#d9cfc0', 0.25), right: darken(wall, 0.05) }, -1001);
    // skirting board
    this.quadX(14.5, 14, size, 0, 10, darken(wall, 0.12), -999);
    this.quadY(14.5, 14, size, 0, 10, darken(wall, 0.18), -999);
  }
  window(onX, a, b, z1, z2, depth = -998) {
    const f = PAL.white, q = onX ? this.quadX.bind(this, 14.5) : this.quadY.bind(this, 14.5);
    q(a - 6, b + 6, z1 - 6, z2 + 6, f, depth);
    q(a, b, z1, z2, PAL.sky, depth + 0.1);
    q(a, b, z1, z1 + (z2 - z1) * 0.35, lighten(PAL.grass, 0.1), depth + 0.2);
    q((a + b) / 2 - 2, (a + b) / 2 + 2, z1, z2, f, depth + 0.3);
  }
  // Brand mark: a disc with a comma — a pause in the sentence.
  commaMark(cx, cy, r, bg = PAL.accent, fg = PAL.white) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${bg}"/>` +
      `<circle cx="${cx}" cy="${cy - r * 0.12}" r="${r * 0.26}" fill="${fg}"/>` +
      `<path d="M${cx + r * 0.2},${cy - r * 0.05} Q${cx + r * 0.22},${cy + r * 0.42} ${cx - r * 0.18},${cy + r * 0.55}" stroke="${fg}" stroke-width="${r * 0.2}" fill="none" stroke-linecap="round"/>`;
  }
  svg() { return this.items.sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(i => i[2]).join(''); }
}

// ---------- scenes ----------
const ISLANDS = [];
const FOCAL = [];   // screen-space dive targets
const DYN = [];     // per-island dynamic layers: (T) => svg

// 01 — the door you've been avoiding
{
  const I = new Island(0, 0);
  I.slab(PAL.grass, PAL.soil);
  // path stones to the door
  [[470, 270], [440, 262], [410, 255], [380, 250]].forEach(([x, y], k) => I.tile(x - 12, y - 10, 0.5, 24, 20, lighten(PAL.soil, 0.35), -600 + k));
  // house
  const x1 = 120, x2 = 350, y1 = 110, y2 = 320, zt = 140, zr = 225, ym = (y1 + y2) / 2;
  I.shadow(260, 240, 0, 150, -700, 0.1);
  I.box(x1, y1, 0, x2 - x1, y2 - y1, zt, { top: PAL.wall, left: PAL.cream, right: PAL.wallShade }, 400);
  I.poly(401, [[x2, y1 - 12, zt], [x2, y2 + 12, zt], [x2, ym, zr]], lighten(PAL.wallShade, 0.2));
  I.poly(402, [[x1 - 14, ym, zr], [x2 + 14, ym, zr], [x2 + 14, y2 + 16, zt - 8], [x1 - 14, y2 + 16, zt - 8]], PAL.accent);
  I.poly(402.1, [[x2 + 14, ym, zr], [x2 + 14, y2 + 16, zt - 8], [x2 + 14, y2 + 16, zt - 14], [x2 + 14, ym, zr - 6]], darken(PAL.accent, 0.2));
  // door + windows
  I.quadX(x2 + 0.5, 195, 240, 0, 88, darken(PAL.wood, 0.1), 403);
  I.quadX(x2 + 0.6, 200, 235, 5, 83, PAL.wood, 403.1);
  I.quadX(x2 + 0.7, 228, 231, 40, 46, PAL.hair, 403.2);
  I.quadX(x2 + 0.5, 125, 170, 55, 105, PAL.sky, 403);
  I.quadX(x2 + 0.5, 265, 305, 55, 105, PAL.sky, 403);
  I.quadY(y2 + 0.5, 160, 220, 55, 105, PAL.sky, 403);
  I.quadY(y2 + 0.5, 260, 320, 55, 105, PAL.sky, 403);
  // warm light in windows
  I.quadY(y2 + 0.6, 160, 220, 55, 75, PAL.butter, 403.1, 'opacity=".55"');
  // sign above the door
  const [sx, sy] = I.P(x2 + 1, 217, 118);
  I.add(404, I.commaMark(sx, sy, 18));
  // planters + trees
  I.tree(60, 70, 1.1); I.tree(70, 430, 0.9); I.tree(455, 70, 0.95); I.tree(440, 455, 0.8);
  I.bush(370, 330, PAL.tree, 13); I.bush(372, 150, PAL.tree2, 12); I.bush(395, 340, PAL.rose, 7); I.bush(380, 140, PAL.butter, 7);
  // the patient, hesitating at the gate
  I.shadow(480, 300, 0, 14);
  I.person(480, 300, 0, { mood: 'worry', shirt: PAL.peach });
  ISLANDS.push(I);
  FOCAL.push(I.P(430, 262, 60));
  const [bx, by] = I.P(486, 300, 104);
  DYN.push(T => {
    let d = `<g transform="translate(${bx + 18},${by - 16})"><ellipse rx="24" ry="15" fill="${PAL.white}" stroke="${PAL.wallShade}"/><circle cx="-8" cy="${17}" r="4" fill="${PAL.white}"/><circle cx="-12" cy="${25}" r="2.5" fill="${PAL.white}"/>`;
    for (let k = 0; k < 3; k++) d += `<circle cx="${-9 + k * 9}" cy="0" r="3" fill="${PAL.hair}" opacity="${(0.25 + 0.75 * (0.5 + 0.5 * Math.sin(T * 3 - k * 0.9))).toFixed(2)}"/>`;
    return d + '</g>';
  });
}

// 02 — the first visit is just a conversation
{
  const I = new Island(1300, 420);
  I.room(PAL.wood, PAL.wall);
  I.window(false, 150, 330, 70, 170);
  // framed picture on the left wall
  I.quadX(14.5, 200, 330, 90, 160, PAL.white, -998);
  I.quadX(14.6, 208, 322, 97, 153, lighten(PAL.grass, 0.25), -997);
  I.poly(-996, [[14.7, 215, 97], [14.7, 270, 140], [14.7, 315, 97]], PAL.grassDeep);
  // rug + table
  I.disc(300, 300, 0.5, 140, lighten(PAL.accent, 0.72), -800);
  I.shadow(305, 305, 0.6, 50, -790, 0.12);
  I.cyl(300, 300, 0, 10, 26, PAL.woodDark, 290);
  I.cyl(300, 300, 26, 50, 6, PAL.wood, 600);
  I.cyl(282, 290, 32, 8, 10, PAL.white, 601); I.cyl(318, 312, 32, 8, 10, PAL.white, 602);
  I.disc(282, 290, 42.2, 6, '#C08A5A', 601.5); I.disc(318, 312, 42.2, 6, '#C08A5A', 602.5);
  // patient sofa (faces +x)
  I.box(120, 240, 0, 80, 130, 34, PAL.peach, 300);
  I.box(110, 240, 0, 22, 130, 76, PAL.peach, 290);
  I.box(120, 228, 0, 80, 16, 52, PAL.peach, 289); I.box(120, 366, 0, 80, 16, 52, PAL.peach, 420);
  I.person(168, 300, 34, { pose: 'sit', mood: 'calm', shirt: lighten(PAL.navy, 0.35), depth: 400 });
  // counsellor chair (faces +y)
  I.box(250, 140, 0, 100, 70, 34, PAL.lilac, 330);
  I.box(250, 128, 0, 100, 20, 76, PAL.lilac, 300);
  I.person(300, 172, 34, { pose: 'sit', mood: 'smile', shirt: PAL.white, hair: PAL.hair2, depth: 360 });
  // plant + lamp
  I.cyl(470, 60, 0, 18, 30, PAL.woodDark, 530); I.sphere(470, 60, 58, 26, PAL.tree2, 531); I.sphere(462, 52, 80, 18, PAL.tree, 532);
  I.cyl(60, 460, 0, 14, 4, PAL.hair, 520); I.cyl(60, 460, 4, 2, 120, PAL.hair, 521); I.cyl(60, 460, 118, 20, 22, PAL.butter, 522);
  ISLANDS.push(I);
  FOCAL.push(I.P(260, 270, 60));
  const cups = [I.P(282, 290, 44), I.P(318, 312, 44)], heart = I.P(240, 250, 150);
  DYN.push(T => {
    let d = '';
    cups.forEach(([cx, cy], k) => {
      for (let j = 0; j < 2; j++) {
        const ph = (T * 0.45 + j * 0.5 + k * 0.27) % 1;
        const y = cy - 6 - ph * 34, sw = Math.sin(T * 2 + j + k) * 4;
        d += `<path d="M${cx + j * 5 - 2},${y + 10} q${sw},-6 0,-12 q${-sw},-6 0,-12" stroke="${PAL.white}" stroke-width="3" fill="none" stroke-linecap="round" opacity="${(Math.sin(ph * Math.PI) * 0.9).toFixed(2)}"/>`;
      }
    });
    const s = 1 + 0.06 * Math.sin(T * 2.4);
    d += `<g transform="translate(${heart[0]},${heart[1]}) scale(${s.toFixed(3)})"><rect x="-34" y="-26" width="68" height="46" rx="23" fill="${PAL.white}" stroke="${PAL.wallShade}"/><path d="M-10,22 L-2,20 L-14,34Z" fill="${PAL.white}"/><path d="M0,10 C-16,0 -12,-14 0,-6 C12,-14 16,0 0,10Z" fill="${PAL.accent}"/></g>`;
    return d;
  });
}

// 03 — less sound, less sting
{
  const I = new Island(2600, 0);
  I.room('#E3EBEA', PAL.wall);
  I.window(false, 300, 460, 80, 175);
  // calm screen on the left wall (nature scene)
  I.quadX(14.5, 150, 330, 100, 190, PAL.hair, -998);
  I.quadX(14.6, 156, 324, 106, 184, PAL.sky, -997);
  I.poly(-996, [[14.7, 156, 106], [14.7, 230, 150], [14.7, 290, 125], [14.7, 324, 140], [14.7, 324, 106]], PAL.grassDeep);
  // chair
  I.shadow(270, 290, 0, 80, -700, 0.12);
  I.cyl(280, 280, 0, 30, 10, '#C9CED2', 200);
  I.cyl(280, 280, 10, 10, 26, '#C9CED2', 201);
  I.box(225, 252, 36, 120, 56, 14, PAL.white, 300);
  I.box(160, 254, 44, 70, 52, 12, PAL.white, 299);
  I.box(140, 262, 52, 26, 36, 10, PAL.white, 298);
  I.person(210, 280, 58, { pose: 'lie', shirt: PAL.peach, mood: 'calm', depth: 320 });
  // headphones in accent
  const [hx, hy] = I.P(166, 280, 82);
  I.add(321, `<path d="M${hx - 15},${hy + 2} A15,15 0 0 1 ${hx + 15},${hy + 2}" stroke="${PAL.accent}" stroke-width="4" fill="none"/><rect x="${hx - 19}" y="${hy - 3}" width="9" height="14" rx="4" fill="${PAL.accent}"/><rect x="${hx + 10}" y="${hy - 3}" width="9" height="14" rx="4" fill="${PAL.accent}"/>`);
  // lamp arm
  I.cyl(380, 190, 0, 14, 6, '#C9CED2', 210); I.cyl(380, 190, 6, 4, 190, '#C9CED2', 211);
  const [ax, ay] = I.P(380, 190, 196), [lx, ly] = I.P(200, 270, 180);
  I.add(420, `<path d="M${ax},${ay} Q${(ax + lx) / 2},${ay - 40} ${lx},${ly}" stroke="#C9CED2" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="${lx}" cy="${ly}" rx="26" ry="12" fill="${PAL.white}" stroke="#C9CED2" stroke-width="3"/>`);
  // dentist, behind the chair
  I.shadow(220, 190, 0, 14, -600);
  I.person(220, 190, 0, { shirt: PAL.white, pants: lighten(PAL.accent, 0.3), mask: true, cap: lighten(PAL.accent, 0.4), hair: PAL.hair2, depth: 250 });
  // tray
  I.cyl(350, 380, 0, 4, 60, '#C9CED2', 500); I.box(320, 360, 60, 60, 40, 6, PAL.white, 501);
  I.cyl(470, 460, 0, 16, 26, PAL.woodDark, 560); I.sphere(470, 460, 50, 22, PAL.tree2, 561);
  ISLANDS.push(I);
  FOCAL.push(I.P(190, 275, 85));
  const head = I.P(160, 282, 96), lamp = [lx, ly];
  DYN.push(T => {
    let d = `<ellipse cx="${lamp[0]}" cy="${lamp[1] + 70}" rx="70" ry="38" fill="${PAL.butter}" opacity="${(0.16 + 0.05 * Math.sin(T * 1.4)).toFixed(3)}" filter="url(#soft)"/>`;
    for (let k = 0; k < 3; k++) {
      const ph = (T * 0.35 + k / 3) % 1, x = head[0] - 30 - ph * 40 + Math.sin(T * 2 + k) * 6, y = head[1] - 18 - ph * 70;
      const op = Math.sin(ph * Math.PI);
      d += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})" opacity="${op.toFixed(2)}"><ellipse cx="0" cy="0" rx="5" ry="4" fill="${PAL.accent}" transform="rotate(-20)"/><path d="M4,-1 V-18 Q10,-14 12,-8" stroke="${PAL.accent}" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
    }
    return d;
  });
}

// 04 — raise your hand, everything stops
{
  const I = new Island(3900, 420);
  I.room('#EFE7DE', PAL.wall);
  // step board on the left wall
  I.quadX(14.5, 140, 340, 70, 190, PAL.white, -998);
  [0, 1, 2].forEach(k => {
    const z = 165 - k * 36;
    I.quadX(14.6, 160, 178, z - 9, z + 9, k < 2 ? PAL.accent : PAL.wallShade, -997);
    I.quadX(14.6, 192, 312 - k * 30, z - 4, z + 4, PAL.wallShade, -997);
  });
  I.window(false, 170, 330, 80, 175);
  I.shadow(270, 290, 0, 80, -700, 0.12);
  I.cyl(280, 280, 0, 30, 10, '#C9CED2', 200);
  I.cyl(280, 280, 10, 10, 26, '#C9CED2', 201);
  I.box(225, 252, 36, 120, 56, 14, PAL.white, 300);
  I.box(160, 254, 44, 70, 52, 12, PAL.white, 299);
  I.box(140, 262, 52, 26, 36, 10, PAL.white, 298);
  I.person(210, 280, 58, { pose: 'lie', shirt: PAL.peach, mood: 'smile', raise: true, depth: 320 });
  // dentist stepping back, hands off
  I.shadow(250, 160, 0, 14, -600);
  I.person(250, 160, 0, { shirt: PAL.white, pants: lighten(PAL.accent, 0.3), mask: true, cap: lighten(PAL.accent, 0.4), hair: PAL.hair2, depth: 250 });
  I.cyl(470, 70, 0, 18, 30, PAL.woodDark, 530); I.sphere(470, 70, 58, 26, PAL.tree2, 531);
  I.cyl(80, 470, 0, 14, 22, PAL.woodDark, 560); I.sphere(80, 470, 44, 20, PAL.tree, 561);
  ISLANDS.push(I);
  const hand = I.P(192, 296, 140);
  FOCAL.push([hand[0] + 10, hand[1] + 10]);
  DYN.push(T => {
    const [cx, cy] = [hand[0] + 4, hand[1] - 48];
    const ring = (T * 0.6) % 1;
    return `<circle cx="${cx}" cy="${cy}" r="${(30 + ring * 40).toFixed(1)}" fill="none" stroke="${PAL.accent}" stroke-width="3" opacity="${(0.5 * (1 - ring)).toFixed(2)}"/>` +
      `<circle cx="${cx}" cy="${cy}" r="${(30 + ((ring + 0.5) % 1) * 40).toFixed(1)}" fill="none" stroke="${PAL.accent}" stroke-width="3" opacity="${(0.5 * (1 - (ring + 0.5) % 1)).toFixed(2)}"/>` +
      `<circle cx="${cx}" cy="${cy}" r="28" fill="${PAL.accent}"/><rect x="${cx - 9}" y="${cy - 11}" width="6" height="22" rx="2" fill="${PAL.white}"/><rect x="${cx + 3}" y="${cy - 11}" width="6" height="22" rx="2" fill="${PAL.white}"/>`;
  });
}

// 05 — the garden: smiling again
{
  const I = new Island(5200, 0);
  I.slab(PAL.grass, PAL.soil);
  [[120, 120], [200, 120], [120, 200]].forEach(([x, y]) => { I.box(x, y, 0, 64, 64, 14, PAL.woodDark, x + y - 50); });
  const fl = [PAL.rose, PAL.butter, PAL.lilac, PAL.white];
  [[120, 120], [200, 120], [120, 200]].forEach(([x, y], k) => {
    for (let a = 0; a < 6; a++) I.sphere(x + 14 + (a % 3) * 18, y + 18 + Math.floor(a / 3) * 26, 22, 7, fl[(a + k) % 4], x + y + a);
  });
  // stone path
  for (let k = 0; k < 6; k++) I.tile(300 + k * 30 - 10, 380 - k * 6, 0.5, 22, 20, lighten(PAL.soil, 0.35), -600 + k);
  // bench + the patient, smiling
  I.shadow(300, 290, 0, 60, -700, 0.11);
  I.box(270, 240, 0, 8, 100, 26, PAL.woodDark, 290); I.box(330, 240, 0, 8, 100, 26, PAL.woodDark, 330);
  I.box(268, 236, 26, 74, 110, 8, PAL.wood, 340);
  I.box(262, 236, 34, 10, 110, 40, PAL.wood, 300);
  I.person(300, 280, 34, { pose: 'sit', mood: 'smile', shirt: PAL.peach, depth: 380 });
  // brand post
  I.cyl(440, 240, 0, 4, 80, PAL.woodDark, 680);
  const [sx, sy] = I.P(440, 240, 98); I.add(681, I.commaMark(sx, sy, 20));
  I.tree(80, 420, 1); I.tree(440, 90, 1.15); I.tree(460, 440, 0.85);
  I.bush(400, 160, PAL.tree2, 14); I.bush(200, 450, PAL.tree, 12);
  ISLANDS.push(I);
  FOCAL.push(I.P(300, 280, 70));
  const sun = I.P(150, 380, 330), face = I.P(300, 280, 72);
  DYN.push(T => {
    let d = `<g transform="translate(${sun[0]},${sun[1]}) rotate(${(T * 6).toFixed(2)})">`;
    for (let k = 0; k < 10; k++) d += `<rect x="-3" y="-66" width="6" height="18" rx="3" fill="${PAL.butter}" transform="rotate(${k * 36})"/>`;
    d += `<circle r="38" fill="${PAL.butter}"/></g>`;
    for (let k = 0; k < 2; k++) {
      const a = T * 0.7 + k * 3, x = face[0] + Math.cos(a) * (70 + k * 20), y = face[1] - 60 + Math.sin(a * 1.3) * 26;
      const flap = Math.abs(Math.sin(T * 9 + k));
      d += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><ellipse cx="-5" cy="0" rx="${(6 * flap + 1).toFixed(1)}" ry="7" fill="${k ? PAL.lilac : PAL.rose}"/><ellipse cx="5" cy="0" rx="${(6 * flap + 1).toFixed(1)}" ry="7" fill="${k ? PAL.lilac : PAL.rose}"/><rect x="-1" y="-6" width="2" height="12" fill="${PAL.hair}"/></g>`;
    }
    return d;
  });
}

// ---------- in-between world: stepping stones, islets, clouds ----------
function between() {
  let s = '';
  for (let i = 0; i < ISLANDS.length - 1; i++) {
    const A = ISLANDS[i], B = ISLANDS[i + 1];
    const a = A.P(520, 260, -24), b = B.P(260, 0, -24);
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + (i % 2 ? -150 : 150);
    for (let k = 1; k < 12; k++) {
      const t = k / 12, x = (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * mx + t * t * b[0], y = (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * my + t * t * b[1];
      s += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><ellipse cy="34" rx="16" ry="5" fill="#3a2f3a" opacity=".06"/><path d="M-20,0 L0,-11 L20,0 L0,11Z" fill="${lighten(PAL.soil, 0.3)}"/><path d="M-20,0 L0,11 L0,19 L-20,8Z" fill="${PAL.soil}"/><path d="M20,0 L0,11 L0,19 L20,8Z" fill="${darken(PAL.soil, 0.12)}"/></g>`;
    }
    // little islet with a tree
    const ix = mx + (i % 2 ? 120 : -100), iy = my + (i % 2 ? -150 : 140);
    s += `<g transform="translate(${ix.toFixed(1)},${iy.toFixed(1)})"><ellipse cy="90" rx="50" ry="12" fill="#3a2f3a" opacity=".06"/><path d="M-60,0 L0,-34 L60,0 L0,34Z" fill="${lighten(PAL.grass, 0.08)}"/><path d="M-60,0 L0,34 L0,54 L-60,20Z" fill="${PAL.soil}"/><path d="M60,0 L0,34 L0,54 L60,20Z" fill="${darken(PAL.soil, 0.12)}"/><rect x="-4" y="-30" width="8" height="26" fill="${PAL.trunk}"/><circle cy="-44" r="24" fill="${PAL.tree2}"/><circle cx="-3" cy="-60" r="17" fill="${PAL.tree}"/><circle cy="-44" r="24" fill="url(#sphShade)"/></g>`;
  }
  return s;
}

function clouds(T) {
  const seeds = [[-500, -260, 1], [700, -120, 0.8], [1900, 120, 1.1], [3200, -240, 0.9], [4500, 80, 1], [5800, -220, 0.85], [6400, 300, 0.7], [-300, 600, 0.7], [2300, 820, 0.8], [4700, 900, 0.75]];
  return seeds.map(([x, y, k], i) => {
    const dx = ((x + T * (10 + i * 2) + 1000) % 8000) - 1000;
    return `<g transform="translate(${dx.toFixed(1)},${y}) scale(${k})" opacity=".85"><ellipse cx="0" cy="0" rx="90" ry="28" fill="#fff"/><ellipse cx="-34" cy="-16" rx="40" ry="28" fill="#fff"/><ellipse cx="22" cy="-24" rx="48" ry="34" fill="#fff"/></g>`;
  }).join('');
}

const DEFS = `<defs>
<radialGradient id="sphShade" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#3a2f3a" stop-opacity=".22"/></radialGradient>
<linearGradient id="cylShade" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#3a2f3a" stop-opacity=".22"/></linearGradient>
<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
</defs>`;

const STATIC = DEFS + between() + ISLANDS.map(i => i.svg()).join('');
const dynBack = T => clouds(T);
const dynamic = T => DYN.map(f => f(T)).join('');
const center = I => I.P(260, 260, 0);

module.exports = { PAL, STATIC, dynamic, dynBack, FOCAL, ISLANDS, center };
