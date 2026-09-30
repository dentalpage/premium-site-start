import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";

const CASES = [
  { label: "LAMINATE", href: "/laminate#before-after" },
  { label: "RESIN", href: "/resin#before-after" },
  { label: "WHITENING", href: "/whitening" },
];

export function BeforeAfterPreview() {
  return (
    <section className="border-t border-line px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Before &amp; After</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
              말보다 확실한 건, 결과입니다.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            실제 케이스는 촬영 완료 후 업데이트됩니다. 감상평이나 과장된
            표현 없이, 치료 범위만 간단히 표시합니다.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <Link href={c.href} className="group block">
                <PlaceholderFrame aspect="square" caption="케이스 준비중" />
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-ink-muted transition-colors duration-200 group-hover:text-accent">
                  {c.label}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
