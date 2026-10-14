// usage: node build-blocks.js <rawDir> <outDir>
// Turns extracted HTML/CSS into Sixshop block payloads (content + settings + property).
const fs = require('fs');
const path = require('path');
const [rawDir, outDir] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });

const META = {
  header:   { title: '아는치과 · 헤더 메뉴', tags: ['HEADER', 'MENU'] },
  hero:     { title: '아는치과 · 메인 배너', tags: ['MAIN_BANNER'] },
  promise:  { title: '아는치과 · 진료 약속', tags: ['INFORMATION'] },
  doctor:   { title: '아는치과 · 원장소개', tags: ['INFORMATION'] },
  visit:    { title: '아는치과 · 첫방문 안내', tags: ['INFORMATION'] },
  comfort:  { title: '아는치과 · 통증케어', tags: ['INFORMATION'] },
  symptoms: { title: '아는치과 · 증상별 진료', tags: ['INFORMATION'] },
  implant:  { title: '아는치과 · 임플란트', tags: ['INFORMATION'] },
  location: { title: '아는치과 · 오시는 길', tags: ['MAP', 'INFORMATION'] },
  footer:   { title: '아는치과 · 푸터와 예약 안내', tags: ['FOOTER', 'POPUP'] },
};

const IMAGE_LABELS = {
  'hero': '메인 배너 사진', 'doctor': '원장 사진', 'doctor-reference': '원장 갤러리 사진 (3칸 공용)',
  'first-visit-identity': '"먼저 듣습니다" 배너 사진', 'exam-panorama-v2': '검사 카드: 파노라마', 'exam-ct-v2': '검사 카드: CT',
  'exam-pa-v2': '검사 카드: PA', 'exam-oral-v2': '검사 카드: 구내포토', 'exam-qray-v2': '검사 카드: 큐레이',
  'first-visit': '멸균 배너 사진', 'scaling-insurance': '보험 스케일링 카드 배경',
  'comfort-greige-v2': '통증케어 사진 (배경·원형 사진 공용)',
  'symptom-gum': '잇몸치료 사진', 'symptom-crown': '크라운·신경치료 사진', 'symptom-resin': '레진·인레이 사진',
  'symptom-sensitivity': '치경부 마모증 사진', 'symptom-wisdom': '사랑니 발치 사진', 'symptom-jaw': '턱관절 사진', 'symptom-implant': '임플란트 치료 사진',
  'implant-identity-v3': '임플란트 상단 사진', 'implant-reference': '임플란트 카드 사진 (3칸 공용)', 'implant-background-v2': '사후관리 배경 사진',
  'location-reference': '약도 이미지',
};

// Browser defaults the original page relied on; Sixshop resets most UA styles inside blocks.
const UA = `
/* 원본이 기대하던 브라우저 기본값 복원 (식스샵 블록 기본 스타일 초기화 대응) */
.an{display:flow-root;-webkit-text-size-adjust:100%;line-height:normal;font-size:16px;font-weight:400;text-align:left}
.an [hidden]{display:none!important}
:where(.an) h1{font-size:2em;font-weight:700}:where(.an) h2{font-size:1.5em;font-weight:700}:where(.an) h3{font-size:1.17em;font-weight:700}
:where(.an) h4{font-size:1em;font-weight:700;margin:1.33em 0}:where(.an) h5{font-size:.83em;font-weight:700;margin:1.67em 0}
:where(.an) ol,:where(.an) ul{margin:1em 0;padding-left:40px}:where(.an) ol{list-style:decimal}:where(.an) ul{list-style:disc}
:where(.an) dl{margin:1em 0}:where(.an) dd{margin-left:40px}:where(.an) blockquote{margin:1em 40px}:where(.an) figure{margin:1em 40px}
:where(.an) small{font-size:smaller}:where(.an) strong,:where(.an) b{font-weight:700}:where(.an) em{font-style:italic}
:where(.an) img,:where(.an) svg{max-width:none;vertical-align:middle}:where(.an) svg:not(:root){overflow:hidden}
:where(.an) button{border:2px outset buttonborder;padding:1px 6px;background:buttonface;line-height:normal;text-align:center}
:where(.an) dialog{position:fixed;inset:0;margin:auto;border:1.5px solid;padding:1em;background:#fff;color:#000;max-width:calc(100% - 2em - 6px);max-height:calc(100% - 2em - 6px);overflow:auto;z-index:1000}
:where(.an) dialog:not([open]){display:none}
:where(.an) dialog::backdrop{background:rgba(0,0,0,.1)}
.an section[id],.an [id]{scroll-margin-top:90px}
`;

const PAD = `
/* 블록 여백 설정 */
.an-pad{padding:{{property.paddingTopDesktop}}px {{property.paddingRightDesktop}}px {{property.paddingBottomDesktop}}px {{property.paddingLeftDesktop}}px}
@media (max-width:767px){.an-pad{padding:{{property.paddingTopMobile}}px {{property.paddingRightMobile}}px {{property.paddingBottomMobile}}px {{property.paddingLeftMobile}}px}}
`;

const BOOK = `
  // 예약 버튼: 푸터 블록의 예약 안내 팝업을 연다
  function onBookClick(e) {
    if (e.target.closest('[data-book]')) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('aneun:book'));
    }
  }
  container.addEventListener('click', onBookClick);
`;

const SCRIPTS = {
  header: `
  const container = bm.container;
${BOOK}
  function menuParts() {
    return { button: container.querySelector('.menu-toggle'), menu: container.querySelector('#mobile-menu') };
  }
  function closeMenu() {
    const { button, menu } = menuParts();
    if (!menu) return;
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  }
  // 모바일 메뉴 열기/닫기, 메뉴 링크 누르면 닫기
  function onMenuClick(e) {
    const { button, menu } = menuParts();
    if (e.target.closest('.menu-toggle')) {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    } else if (e.target.closest('#mobile-menu a')) {
      closeMenu();
    }
  }
  function onKey(e) { if (e.key === 'Escape') closeMenu(); }
  function onResize() { if (window.innerWidth > 860) closeMenu(); }
  container.addEventListener('click', onMenuClick);
  document.addEventListener('keydown', onKey);
  window.addEventListener('resize', onResize);

  // 현재 보고 있는 섹션의 메뉴에 밑줄 표시 (같은 페이지의 다른 블록 섹션을 관찰)
  let observer = null;
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const link = container.querySelector('.desktop-nav a[href$="#' + entry.target.id + '"]');
        if (!link) return;
        link.classList.toggle('is-active', entry.isIntersecting);
        if (entry.isIntersecting) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-90px 0px -35% 0px', threshold: 0 });
    setTimeout(() => {
      container.querySelectorAll('.desktop-nav a').forEach(a => {
        const target = document.getElementById(a.getAttribute('href').split('#')[1]);
        if (target) observer.observe(target);
      });
    }, 300);
  }

  bm.onDestroy = () => {
    container.removeEventListener('click', onBookClick);
    container.removeEventListener('click', onMenuClick);
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', onResize);
    if (observer) observer.disconnect();
  };`,
  visit: `
  const container = bm.container;
${BOOK}
  bm.onDestroy = () => container.removeEventListener('click', onBookClick);`,
  implant: `
  const container = bm.container;
${BOOK}
  bm.onDestroy = () => container.removeEventListener('click', onBookClick);`,
  symptoms: `
  const container = bm.container;
  const tabs = () => [...container.querySelectorAll('.symptom-tabs [role="tab"]')];

  // 증상 탭 선택: 패널 전환 + 키보드 이동
  function selectSymptom(tab, focus) {
    tabs().forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = container.querySelector('#' + item.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
    if (focus) tab.focus();
  }
  function onClick(e) {
    const tab = e.target.closest('.symptom-tabs [role="tab"]');
    if (tab) selectSymptom(tab, false);
  }
  function onKey(e) {
    const list = tabs();
    const index = list.indexOf(e.target);
    if (index < 0) return;
    let next;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % list.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index - 1 + list.length) % list.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = list.length - 1;
    if (next !== undefined) { e.preventDefault(); selectSymptom(list[next], true); }
  }
  container.addEventListener('click', onClick);
  container.addEventListener('keydown', onKey);
  bm.onDestroy = () => {
    container.removeEventListener('click', onClick);
    container.removeEventListener('keydown', onKey);
  };`,
  footer: `
  const container = bm.container;
  const booking = () => container.querySelector('#booking-dialog');
  function openBooking() { const d = booking(); if (d && !d.open) d.showModal(); }

  // 예약하기·안내 버튼, 닫기, 바깥 클릭 닫기
  function onClick(e) {
    const t = e.target;
    if (t.closest('[data-close]')) { t.closest('dialog').close(); return; }
    if (t.closest('[data-book]')) { e.preventDefault(); openBooking(); return; }
    const info = t.closest('[data-info]');
    if (info) {
      const d = container.querySelector('#section-dialog');
      d.querySelector('#section-title').textContent = info.dataset.info;
      if (!d.open) d.showModal();
      return;
    }
    if (t.matches('dialog')) {
      const r = t.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) t.close();
    }
  }
  container.addEventListener('click', onClick);
  // 다른 블록의 예약 버튼에서 보내는 신호
  window.addEventListener('aneun:book', openBooking);
  bm.onDestroy = () => {
    container.removeEventListener('click', onClick);
    window.removeEventListener('aneun:book', openBooking);
  };`,
};

const padSettings = () => {
  const s = [{ type: 'TITLE', content: '블록 여백 (PC)' }];
  const mk = (id, label) => ({ type: 'RANGE', id, label, description: `${label}이에요.`, min: 0, max: 200, step: 1, unit: 'px' });
  s.push(mk('paddingTopDesktop', '위쪽 여백 (PC)'), mk('paddingBottomDesktop', '아래쪽 여백 (PC)'), mk('paddingLeftDesktop', '왼쪽 여백 (PC)'), mk('paddingRightDesktop', '오른쪽 여백 (PC)'));
  s.push({ type: 'TITLE', content: '블록 여백 (모바일)' });
  s.push(mk('paddingTopMobile', '위쪽 여백 (모바일)'), mk('paddingBottomMobile', '아래쪽 여백 (모바일)'), mk('paddingLeftMobile', '왼쪽 여백 (모바일)'), mk('paddingRightMobile', '오른쪽 여백 (모바일)'));
  return s;
};
const padProps = () => Object.fromEntries(['Top', 'Bottom', 'Left', 'Right'].flatMap(d => [[`padding${d}Desktop`, 0], [`padding${d}Mobile`, 0]]));

const camel = s => 'img' + s.replace(/-v\d+$/, '').replace(/(^|-)([a-z0-9])/g, (_, d, c) => c.toUpperCase());

for (const key of Object.keys(META)) {
  let html = fs.readFileSync(path.join(rawDir, key + '.html'), 'utf8');
  let css = fs.readFileSync(path.join(rawDir, key + '.css'), 'utf8');

  // 이미지 → IMAGE_PICKER 설정
  const images = [];
  html = html.replace(/assets\/([a-z0-9-]+)\.webp/g, (_, name) => {
    const id = camel(name);
    if (!images.find(i => i.id === id)) images.push({ id, name });
    return `{{property.${id}}}`;
  });
  // 메뉴 링크는 다른 페이지에서도 홈의 해당 섹션으로 가도록
  if (key === 'header') html = html.replace(/href="#(?!home)([a-z-]+)"/g, 'href="/#$1"').replace('href="#home"', 'href="/"');
  if (key === 'footer') html = html.replace('href="#home"', 'href="/"');

  // 폰트는 테마 글꼴 변수 사용, 원래 글꼴을 대체 글꼴로
  css = css.replace(/--serif:\s*[^;]+;/, "--serif: var(--font-family-heading),'Noto Serif KR',Batang,serif;")
           .replace(/--sans:\s*[^;]+;/, "--sans: var(--font-family-body),'Noto Sans KR',Arial,sans-serif;");
  // 모바일 하단 고정 예약 버튼 자리는 푸터 블록에서만 확보
  if (key !== 'footer') css = css.replace(/padding-bottom:\s*calc\(76px[^;}]*;?/g, '');

  const content = `<style>\n${UA}\n${css}\n${PAD}</style>\n\n<template>\n<div class="an-pad"><div class="an an-${key}">\n${html}\n</div></div>\n</template>\n\n<script>${SCRIPTS[key] || '\n'}\n</script>\n`;

  const settings = [];
  if (images.length) {
    settings.push({ type: 'TITLE', content: '이미지' }, { type: 'DESCRIPTION', content: '원본 사이트 assets 폴더의 같은 이름 파일을 올려 주세요. 크롭 위치가 원본 크기 기준이라 같은 파일을 쓰는 것이 좋아요.' });
    for (const i of images) settings.push({ type: 'IMAGE_PICKER', id: i.id, label: IMAGE_LABELS[i.name] || i.name, description: `원본 파일: ${i.name}.webp` });
  }
  settings.push(...padSettings());
  const property = { ...Object.fromEntries(images.map(i => [i.id, ''])), ...padProps() };

  fs.writeFileSync(path.join(outDir, key + '.json'), JSON.stringify({ title: META[key].title, tags: META[key].tags, content, settings, property, images: images.map(i => i.name) }, null, 1));
  console.log(key, 'content', content.length, 'images', images.map(i => i.name).join(','));
}
