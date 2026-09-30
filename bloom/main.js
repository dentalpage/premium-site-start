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

const reveals = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -80px 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}
