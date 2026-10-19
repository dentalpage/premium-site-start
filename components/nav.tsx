"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Pages whose first section is a dark CinematicHero; nav sits transparent on top of it.
const DARK_HERO = new Set(["/", "/about", "/laminate", "/resin", "/whitening"]);

const GNB = [
  {
    label: "ABOUT",
    href: "/about",
    items: [
      { label: "필로소피", href: "/about#philosophy" },
      { label: "디렉터 소개", href: "/about#director" },
      { label: "팀 소개", href: "/about#team" },
      { label: "ACADEMIC & CAREER", href: "/about#academic-career" },
    ],
  },
  {
    label: "LAMINATE",
    href: "/laminate",
    items: [
      { label: "라미네이트", href: "/laminate" },
      { label: "제작 공정", href: "/laminate#process" },
      { label: "Before & After", href: "/laminate#before-after" },
    ],
  },
  {
    label: "RESIN",
    href: "/resin",
    items: [
      { label: "심미레진", href: "/resin" },
      { label: "제작 공정", href: "/resin#process" },
      { label: "Before & After", href: "/resin#before-after" },
    ],
  },
  {
    label: "WHITENING",
    href: "/whitening",
    items: [
      { label: "치아미백", href: "/whitening#teeth" },
      { label: "잇몸미백", href: "/whitening#gum" },
    ],
  },
  {
    label: "일반진료",
    href: "/general-care",
    items: [
      { label: "신경치료", href: "/general-care#root-canal" },
      { label: "잇몸치료", href: "/general-care#gum" },
      { label: "충치치료", href: "/general-care#cavity" },
    ],
  },
  {
    label: "VISIT",
    href: "/visit",
    items: [
      { label: "비용안내", href: "/visit#cost" },
      { label: "오시는 길 · 예약", href: "/visit#location" },
    ],
  },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onDark = DARK_HERO.has(pathname) && !scrolled && !mobileOpen;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        onDark ? "border-transparent bg-transparent" : "border-line bg-bg/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className={`font-display text-xl tracking-[0.05em] transition-colors duration-500 ${onDark ? "text-on-dark" : "text-ink"}`}>
          BLOOM
        </Link>

        <nav className="hidden lg:flex lg:gap-9">
          {GNB.map((menu) => (
            <div key={menu.label} className="group relative">
              <Link
                href={menu.href}
                className={`flex h-[68px] items-center text-[13px] font-medium tracking-[0.08em] transition-colors duration-200 group-hover:text-accent ${onDark ? "text-on-dark" : "text-ink"}`}
              >
                {menu.label}
              </Link>
              <div className="invisible absolute left-1/2 top-full w-max -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <ul className="min-w-[180px] border border-line bg-bg py-2 shadow-[0_12px_32px_rgba(33,30,27,0.08)]">
                  {menu.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="block px-5 py-2.5 text-[13px] text-ink-muted transition-colors duration-150 hover:bg-surface hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>

        <Link
          href="/visit#reservation"
          className={`hidden rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-300 hover:bg-accent hover:text-on-dark lg:inline-flex ${onDark ? "bg-on-dark text-ink" : "bg-ink text-bg"}`}
        >
          온라인 예약
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="메뉴 열기"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-5 transition-transform ${onDark ? "bg-on-dark" : "bg-ink"} duration-200 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 transition-transform ${onDark ? "bg-on-dark" : "bg-ink"} duration-200 ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {mobileOpen ? (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-line bg-bg px-6 py-6 lg:hidden">
          {GNB.map((menu) => (
            <div key={menu.label} className="border-b border-line py-4 first:pt-0 last:border-none">
              <Link
                href={menu.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium tracking-[0.08em] text-ink"
              >
                {menu.label}
              </Link>
              <ul className="mt-3 flex flex-col gap-2.5">
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-ink-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link
            href="/visit#reservation"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg"
          >
            온라인 예약
          </Link>
        </div>
      ) : null}
    </header>
  );
}
