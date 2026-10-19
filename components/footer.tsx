import Link from "next/link";

const QUICK_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "LAMINATE", href: "/laminate" },
  { label: "RESIN", href: "/resin" },
  { label: "WHITENING", href: "/whitening" },
  { label: "일반진료", href: "/general-care" },
  { label: "VISIT", href: "/visit" },
];

const LEGAL_LINKS = [
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "비급여 진료비용 안내", href: "/visit#cost" },
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

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs leading-relaxed text-ink-muted sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            {/* Official name must match the 개설 신고 registration, not the brand name. */}
            <p>
              <span className="text-ink">블룸치과의원</span> (BLOOM) · 대표원장
              입력 예정 · 사업자등록번호 입력 예정
            </p>
            <p>주소 입력 예정 · 대표번호 입력 예정</p>
            <p>© {new Date().getFullYear()} BLOOM. All rights reserved.</p>
          </div>
          <nav className="flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-ink first:font-medium first:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
