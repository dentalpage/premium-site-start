import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";

export function BeforeAfterSection({
  id,
  heading,
  formatExamples,
}: {
  id: string;
  heading: string;
  formatExamples: string[];
}) {
  return (
    <section id={id} className="border-t border-line px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Before &amp; After</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
            후기나 감정적인 코멘트는 붙이지 않습니다. 실제 케이스는 촬영이
            준비되는 대로 업데이트되며, 아래는 표기 형식 예시입니다.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {formatExamples.map((label, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <PlaceholderFrame aspect="square" caption="케이스 준비중" />
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                {label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
