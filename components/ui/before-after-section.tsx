import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { BaDisclaimer } from "@/components/ui/ba-disclaimer";

export function BeforeAfterSection({
  id,
  heading,
  cases,
  sideEffects,
}: {
  id: string;
  heading: string;
  cases: string[][];
  sideEffects: string;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Before &amp; After</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            후기나 감상평 없이 치료 범위와 목적만 표시합니다. 모든 사진은 같은
            조건에서 촬영하며 보정하지 않습니다. 실제 케이스는 환자분의 게시
            동의를 받은 뒤 업데이트됩니다.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {cases.map((lines, i) => (
            <Reveal key={lines.join()} delay={i * 0.1}>
              <div className="grid grid-cols-2 gap-1">
                <PlaceholderFrame aspect="portrait" caption="BEFORE" />
                <PlaceholderFrame aspect="portrait" caption="AFTER" />
              </div>
              <ul className="mt-4 space-y-1 text-xs leading-relaxed text-ink-muted">
                {lines.map((line, j) => (
                  <li key={line} className={j === 0 ? "font-medium tracking-[0.12em] text-ink" : ""}>
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <BaDisclaimer sideEffects={sideEffects} className="mt-12" />
      </div>
    </section>
  );
}
