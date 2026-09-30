import Link from "next/link";

const QUICK_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "LAMINATE", href: "/laminate" },
  { label: "RESIN", href: "/resin" },
  { label: "WHITENING", href: "/whitening" },
  { label: "일반진료", href: "/general-care" },
  { label: "VISIT", href: "/visit" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <p className="font-display text-2xl text-ink">BLOOM</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              삭제는 필요한 만큼만.
              <br />
              색은 직접 보고 확인합니다.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-ink-muted sm:grid-cols-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="text-sm leading-relaxed text-ink-muted">
            <p>주소 · 입력 예정</p>
            <p>대표번호 · 입력 예정</p>
            <p>진료시간 · 입력 예정</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-muted">
          <p>
            BLOOM 심미치과의원 · 대표원장 입력 예정 · 사업자등록번호 입력 예정
          </p>
          <p>© {new Date().getFullYear()} BLOOM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
