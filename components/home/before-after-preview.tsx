import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { BaDisclaimer } from "@/components/ui/ba-disclaimer";

const CASES = [
  { label: "LAMINATE", note: "기존 보철물 재제작", href: "/laminate#before-after" },
  { label: "RESIN", note: "앞니 사이 공간 개선", href: "/resin#before-after" },
];

export function BeforeAfterPreview() {
  return (
    <section className="border-t border-line px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Before &amp; After</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
              치료 범위와 목적을 함께 보여드립니다.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
            감상평이나 과장된 표현 없이, 같은 조건에서 촬영한 사진과 치료
            범위만 표시합니다.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <Link href={c.href} className="group block">
                <div className="grid grid-cols-2 gap-1">
                  <PlaceholderFrame aspect="landscape" caption="BEFORE" />
                  <PlaceholderFrame aspect="landscape" caption="AFTER" />
                </div>
                <div className="mt-4 flex items-baseline justify-between text-xs">
                  <p className="font-medium uppercase tracking-[0.15em] text-ink transition-colors duration-200 group-hover:text-accent">
                    {c.label}
                  </p>
                  <p className="text-ink-muted">{c.note}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <BaDisclaimer
          sideEffects="시린 증상, 보철물 파절·탈락, 변색"
          className="mt-12"
        />
      </div>
    </section>
  );
}
