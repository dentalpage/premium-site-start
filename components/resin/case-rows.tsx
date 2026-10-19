import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { BaDisclaimer } from "@/components/ui/ba-disclaimer";

const CASES = [
  { title: "앞니 사이 공간 개선", scope: "RESIN · 2 UNITS" },
  { title: "앞니 일부 파절 회복", scope: "RESIN · 1 UNIT" },
  { title: "측절치 형태 보정", scope: "RESIN · 2 UNITS" },
];

export function ResinCaseRows() {
  return (
    <section id="before-after" className="scroll-mt-20 border-t border-line px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <SectionLabel>Before &amp; After</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
            작은 차이가, 인상을 바꿉니다.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-muted">
            같은 조건에서 촬영하고 보정하지 않습니다. 실제 케이스는 환자분의 게시
            동의를 받은 뒤 업데이트됩니다.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16">
          {CASES.map((c, i) => (
            <Reveal key={c.title}>
              <div className="flex items-baseline justify-between border-t border-ink/70 pt-4">
                <p className="font-display text-xl text-ink sm:text-2xl">
                  <span className="mr-4 text-sm tracking-[0.15em] text-accent">CASE {String(i + 1).padStart(2, "0")}</span>
                  {c.title}
                </p>
                <p className="hidden text-xs tracking-[0.15em] text-ink-muted sm:block">{c.scope}</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <PlaceholderFrame aspect="landscape" caption="BEFORE" />
                <PlaceholderFrame aspect="landscape" caption="AFTER" />
              </div>
            </Reveal>
          ))}
        </div>

        <BaDisclaimer sideEffects="변색, 부분 파절, 시린 증상" className="mt-16" />
      </div>
    </section>
  );
}
