// BLOOM shared behaviour: mobile menu, quick contact, booking modal.
(function () {
  var TEL = 'tel:0200000000';
  var KAKAO = 'https://pf.kakao.com/_bloomdental';
  var TALKTALK = 'https://talk.naver.com/';
  var ENDPOINT = ''; // booking receiver URL; empty = demo confirmation only
  var LABELS = { 'about.html': '소개', 'laminate.html': '라미네이트', 'resin.html': '심미레진', 'whitening.html': '미백', 'general.html': '일반진료' };
  var INTEREST = { 'laminate.html': '라미네이트', 'resin.html': '심미레진', 'whitening.html': '치아 미백', 'general.html': '일반진료' };
  var OPTIONS = ['라미네이트', '라미네이트 재치료', '심미레진', '치아 미백', '잇몸 미백', '일반진료', '기타 / 잘 모르겠어요'];
  var here = location.pathname.split('/').pop() || 'main.html';
  var lastFocus = null;

  // Every page opens at its hero (hosts that keep the previous scroll position included); in-page anchors still work
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) {
    window.scrollTo(0, 0);
    try { document.documentElement.scrollIntoView({ block: 'start' }); } catch (e) {}
  }

  function trapTab(box, e) {
    if (e.key !== 'Tab') return;
    var f = box.querySelectorAll('a[href],button:not([disabled]),input,select,textarea');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  // ---- booking modal: one form, opened from every 예약하기 / 상담 button
  var modal = document.createElement('div');
  modal.className = 'bl-modal';
  modal.id = 'bl-booking';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'bl-booking-title');
  modal.innerHTML =
    '<div class="bl-modal-backdrop" data-close></div>' +
    '<div class="bl-modal-panel">' +
      '<button class="bl-x" type="button" aria-label="닫기" data-close><span></span><span></span></button>' +
      '<div class="bl-eyebrow">RESERVATION</div>' +
      '<h2 id="bl-booking-title">상담 예약</h2>' +
      '<p class="bl-modal-lead">남겨주신 연락처로 진료일 기준 하루 안에 연락드립니다.</p>' +
      '<form class="bl-form" novalidate>' +
        '<label>성함<input name="name" autocomplete="name" required placeholder="홍길동"></label>' +
        '<label>연락처<input name="phone" type="tel" inputmode="numeric" autocomplete="tel" required placeholder="010-0000-0000"></label>' +
        '<label>관심 진료<select name="interest">' + (INTEREST[here] ? '' : '<option value="">선택해 주세요</option>') + OPTIONS.map(function (o) {
          return '<option' + (o === INTEREST[here] ? ' selected' : '') + '>' + o + '</option>';
        }).join('') + '</select></label>' +
        '<label>희망 상담 시간<select name="time"><option>상관없음</option><option>평일 오전</option><option>평일 오후</option><option>토요일</option></select></label>' +
        '<label class="bl-full">궁금한 점 (선택)<textarea name="memo" rows="2" placeholder="예) 기존 라미네이트가 깨져서 재치료를 고민 중이에요."></textarea></label>' +
        '<label class="bl-agree bl-full"><input type="checkbox" name="agree" required> <span>개인정보 수집·이용 동의 (성함, 연락처 / 상담 목적 / 1년 보관) <a href="info.html#privacy">보기</a></span></label>' +
        '<button type="submit" class="bl-full">예약 신청하기</button>' +
        '<p class="bl-form-msg bl-full" role="status" aria-live="polite"></p>' +
      '</form>' +
      '<div class="bl-modal-alt"><a href="' + TALKTALK + '" target="_blank" rel="noopener">네이버톡톡</a><a href="' + KAKAO + '" target="_blank" rel="noopener">카카오톡</a><a href="' + TEL + '">02-000-0000</a></div>' +
    '</div>';
  document.body.appendChild(modal);
  var panel = modal.querySelector('.bl-modal-panel');

  function openBooking() {
    lastFocus = document.activeElement;
    modal.classList.add('open');
    document.body.classList.add('bl-locked');
    setTimeout(function () { modal.querySelector('input[name=name]').focus({ preventScroll: true }); }, 50);
  }
  function closeBooking() {
    modal.classList.remove('open');
    document.body.classList.remove('bl-locked');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  modal.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeBooking(); });
  document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeBooking(); else trapTab(panel, e);
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href="#consult"], a[href="main.html#consult"]');
    if (!a) return;
    e.preventDefault();
    if (document.body.classList.contains('bl-menu-open')) closeMenu();
    openBooking();
  });
  if (location.hash === '#consult') openBooking();

  // ---- mobile menu: built from each page's existing nav so headers stay as designed
  var header = document.querySelector('.bl-header');
  var nav = header && header.querySelector('.bl-nav');
  var closeMenu = function () {};
  if (nav) {
    var drawer = document.createElement('div');
    drawer.className = 'bl-drawer';
    drawer.id = 'bl-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', '전체 메뉴');
    var links = '';
    nav.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!LABELS[href]) return;
      links += '<a href="' + href + '"' + (href === here ? ' aria-current="page"' : '') + '>' + LABELS[href] +
        '<small>' + a.textContent.trim() + '</small></a>';
    });
    drawer.innerHTML =
      '<button class="bl-x" type="button" aria-label="메뉴 닫기"><span></span><span></span></button>' +
      '<a class="bl-drawer-home" href="main.html">BLOOM</a>' +
      '<nav aria-label="전체 메뉴">' + links + '</nav>' +
      '<div class="bl-drawer-foot"><a href="' + TEL + '">전화 상담 02-000-0000</a><a class="primary" href="#consult">예약하기</a></div>';
    document.body.appendChild(drawer);

    var burger = header.querySelector('.bl-burger');

    var setOpen = function (open) {
      drawer.classList.toggle('open', open);
      document.body.classList.toggle('bl-menu-open', open);
      document.body.classList.toggle('bl-locked', open);
      burger.setAttribute('aria-expanded', String(open));
      if (open) drawer.querySelector('.bl-x').focus();
    };
    closeMenu = function () { setOpen(false); };
    burger.addEventListener('click', function () { setOpen(true); });
    drawer.querySelector('.bl-x').addEventListener('click', function () { setOpen(false); burger.focus(); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    drawer.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); burger.focus(); } trapTab(drawer, e); });
  }

  // ---- quick contact: one bar on phones, one button (revealing two more on hover) on desktop
  var quick = document.createElement('div');
  quick.className = 'bl-quick';
  quick.setAttribute('aria-label', '빠른 상담');
  quick.innerHTML =
    '<a class="naver" href="' + TALKTALK + '" target="_blank" rel="noopener">네이버톡톡</a>' +
    '<a class="kakao" href="' + KAKAO + '" target="_blank" rel="noopener">카카오톡</a>' +
    '<a class="primary" href="#consult">상담하기</a>';
  document.body.appendChild(quick);
  var visit = document.getElementById('visit');
  var visitInView = false;
  if (visit && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { visitInView = en[0].isIntersecting; update(); }, { threshold: 0.2 }).observe(visit);
  }
  var hero = document.querySelector('section.hero');
  function update() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-solid', y > (hero ? Math.max(hero.offsetHeight - header.offsetHeight - 1, 40) : 40));
    quick.classList.toggle('show', y > window.innerHeight * 0.6 && !visitInView);
  }
  addEventListener('scroll', update, { passive: true });
  update();

  // ---- form submit: POSTs JSON to ENDPOINT when set
  var form = modal.querySelector('.bl-form');
  var msg = form.querySelector('.bl-form-msg');
  var phone = form.elements.phone;
  phone.addEventListener('input', function () {
    var d = phone.value.replace(/\D/g, '').slice(0, 11);
    phone.value = d.length < 4 ? d : d.length < 8 ? d.slice(0, 3) + '-' + d.slice(3)
      : d.slice(0, 3) + '-' + d.slice(3, d.length - 4) + '-' + d.slice(-4);
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var errors = [];
    var name = form.elements.name, agree = form.elements.agree;
    [name, phone].forEach(function (f) { f.removeAttribute('aria-invalid'); });
    if (name.value.trim().length < 2) { errors.push('성함을 입력해 주세요.'); name.setAttribute('aria-invalid', 'true'); }
    if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(phone.value)) { errors.push('휴대폰 번호를 확인해 주세요.'); phone.setAttribute('aria-invalid', 'true'); }
    if (!agree.checked) errors.push('개인정보 수집·이용에 동의해 주세요.');
    if (errors.length) { msg.textContent = errors[0]; return; }
    msg.textContent = '';
    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });
    data.page = here;
    var btn = form.querySelector('button');
    btn.disabled = true;
    var send = ENDPOINT
      ? fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); })
      : Promise.resolve();
    send.then(function () {
      form.innerHTML = '<div class="bl-form-done" role="status"><h3>예약 신청이 접수되었습니다.</h3>' +
        '<p>' + data.name.replace(/[<>&]/g, '') + '님, 진료일 기준 하루 안에 ' + data.phone + '로 연락드리겠습니다.<br>급하신 경우 02-000-0000으로 전화 주세요.</p>' +
        '<button type="button" data-close>닫기</button></div>';
    }).catch(function () {
      btn.disabled = false;
      msg.textContent = '전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.';
    });
  });
})();
