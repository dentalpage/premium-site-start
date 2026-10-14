const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu() { mobileMenu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); mobileMenu.hidden = !open; });
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
const bookingDialog = document.querySelector('#booking-dialog');
const sectionDialog = document.querySelector('#section-dialog');
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => { closeMenu(); bookingDialog.showModal(); }));
document.querySelectorAll('[data-section]').forEach(button => button.addEventListener('click', () => { closeMenu(); document.querySelector('#section-title').textContent = button.dataset.section; sectionDialog.showModal(); }));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => { if(event.target === dialog) { const rect = dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } }));
document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
const sectionLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
if ('IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   const link = sectionLinks.find(a => a.getAttribute('href') === '#' + entry.target.id);
   if (!link) return;
   link.classList.toggle('is-active', entry.isIntersecting);
   if (entry.isIntersecting) link.setAttribute('aria-current', 'location');
   else link.removeAttribute('aria-current');
  });
 }, { rootMargin: '-90px 0px -35% 0px', threshold: 0 });
 sectionLinks.forEach(a => {const target = document.querySelector(a.getAttribute('href'));if(target) observer.observe(target);});
}
const symptomTabs = [...document.querySelectorAll('.symptom-tabs [role="tab"]')];
function selectSymptom(tab, focus = false) {
 symptomTabs.forEach(item => {
  const selected = item === tab;
  item.setAttribute('aria-selected', String(selected));
  item.tabIndex = selected ? 0 : -1;
  document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
 });
 if (focus) tab.focus();
 if (window.matchMedia("(max-width:700px)").matches) tab.scrollIntoView({block:"nearest",inline:"nearest"});
}
symptomTabs.forEach((tab, index) => {
 tab.addEventListener('click', () => selectSymptom(tab));
 tab.addEventListener('keydown', event => {
  let next;
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % symptomTabs.length;
  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + symptomTabs.length) % symptomTabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = symptomTabs.length - 1;
  if (next !== undefined) { event.preventDefault(); selectSymptom(symptomTabs[next], true); }
 });
});
document.querySelectorAll('[data-info]').forEach(button => button.addEventListener('click', () => {
 document.querySelector('#section-title').textContent = button.dataset.info;
 sectionDialog.showModal();
}));

window.addEventListener("resize", () => { if (window.innerWidth > 860) closeMenu(); });
