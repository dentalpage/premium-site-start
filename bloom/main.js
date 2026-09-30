const header = document.querySelector(".bl-header");
const menu = document.querySelector(".bl-menu");

const syncHeader = () => header.classList.toggle("is-solid", window.scrollY > 40);
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menu.addEventListener("click", () => {
  const open = header.classList.toggle("is-open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && header.classList.contains("is-open")) menu.click();
});
