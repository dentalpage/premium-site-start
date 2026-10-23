// BLOOM shared behaviour: mobile menu, quick contact, consultation form.
(function () {
  var TEL = 'tel:0200000000';
  var KAKAO = 'https://pf.kakao.com/_bloomdental';
  var LABELS = { 'about.html': '소개', 'laminate.html': '라미네이트', 'resin.html': '심미레진', 'whitening.html': '미백', 'general.html': '일반진료' };
  var here = location.pathname.split('/').pop() || 'main.html';
  var CONSULT = document.getElementById('consult') ? '#consult' : 'main.html#consult';

  // ---- mobile menu: built from each page's existing nav so headers stay as designed
  var header = document.querySelector('header');
  var nav = header && header.querySelector('nav');
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
      '<button class="bl-drawer-close" type="button" aria-label="메뉴 닫기"><span></span><span></span></button>' +
      '<a class="bl-drawer-home" href="main.html">BLOOM</a>' +
      '<nav aria-label="전체 메뉴">' + links + '</nav>' +
      '<div class="bl-drawer-foot"><a href="' + TEL + '">전화 상담 02-000-0000</a><a class="primary" href="' + CONSULT + '">상담 신청하기</a></div>';
    document.body.appendChild(drawer);

    var burger = document.createElement('button');
    burger.className = 'bl-burger';
    burger.type = 'button';
    burger.setAttribute('aria-label', '메뉴 열기');
    burger.setAttribute('aria-controls', 'bl-drawer');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    nav.parentNode.appendChild(burger);

    var setOpen = function (open) {
      drawer.classList.toggle('open', open);
      document.body.classList.toggle('bl-menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      if (open) drawer.querySelector('.bl-drawer-close').focus(); else burger.focus({ preventScroll: true });
    };
    burger.addEventListener('click', function () { setOpen(true); });
    drawer.querySelector('.bl-drawer-close').addEventListener('click', function () { setOpen(false); });
    drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('open')) setOpen(false); });
  }

  // ---- quick contact: appears after the hero, steps aside while the form or visit block is on screen
  var consult = document.getElementById('consult');
  var visit = document.getElementById('visit');
  var quick = document.createElement('div');
  quick.className = 'bl-quick';
  quick.setAttribute('aria-label', '빠른 상담');
  quick.innerHTML = '<a href="' + TEL + '">전화</a><a href="' + KAKAO + '" target="_blank" rel="noopener">카카오톡</a><a class="primary" href="' + CONSULT + '">상담 신청</a>';
  document.body.appendChild(quick);
  var inView = {};
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { inView[en.target.id] = en.isIntersecting; });
      update();
    }, { threshold: 0.15 });
    [consult, visit].forEach(function (el) { if (el) io.observe(el); });
  }
  function update() {
    var past = window.scrollY > window.innerHeight * 0.6;
    quick.classList.toggle('show', past && !inView.consult && !inView.visit);
  }
  addEventListener('scroll', update, { passive: true });
  update();

  // ---- consultation form. Set data-endpoint on the form to POST JSON to a real backend.
  document.querySelectorAll('.bl-form').forEach(function (form) {
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
      var endpoint = form.getAttribute('data-endpoint');
      var send = endpoint
        ? fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
            .then(function (r) { if (!r.ok) throw new Error(r.status); })
        : Promise.resolve();
      send.then(function () {
        form.innerHTML = '<div class="bl-form-done" role="status"><h3>상담 신청이 접수되었습니다.</h3>' +
          '<p>' + data.name.replace(/[<>&]/g, '') + '님, 진료일 기준 하루 안에 ' + data.phone + '로 연락드리겠습니다.<br>급하신 경우 02-000-0000으로 전화 주세요.</p></div>';
      }).catch(function () {
        btn.disabled = false;
        msg.textContent = '전송에 실패했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.';
      });
    });
  });
})();
