import { Reveal } from "@/components/ui/reveal";
import { ToothDiagram } from "@/components/laminate/tooth-diagram";

const CASES = [
  {
    id: "minimal",
    label: "CASE A",
    title: "색·형태 개선",
    text: "배열이 고른 경우, 법랑질 범위 안에서 최소한으로 다듬는 것을 우선 검토합니다.",
    removed: 6,
  },
  {
    id: "moderate",
    label: "CASE B",
    title: "배열 조정",
    text: "튀어나온 치아가 있으면 그 부분은 조금 더 다듬어야 할 수 있습니다.",
    removed: 13,
  },
  {
    id: "remake",
    label: "CASE C",
    title: "기존 라미네이트 재제작",
    text: "이미 삭제된 양과 남은 치질을 먼저 확인한 뒤, 추가로 다듬을지 결정합니다.",
    removed: 5,
    existing: 8,
  },
];

const LEGEND = [
  { swatch: "border border-dashed border-ink", label: "원래 치아 표면" },
  { swatch: "bg-[repeating-linear-gradient(45deg,var(--color-accent)_0_1.5px,transparent_1.5px_4px)]", label: "다듬는 범위" },
  { swatch: "bg-ink/30", label: "이미 삭제된 범위" },
];

export function ReductionChart() {
  return (
    <section className="bg-bone px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-xs tracking-[0.25em] text-accent">PREPARATION GUIDE</p>
          <h2 className="mt-6 font-display text-3xl leading-[1.45] text-ink sm:text-[44px]">
            삭제량은 정해져 있지 않습니다.
            <br />
            치아마다 다릅니다.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-muted">
            라미네이트는 법랑질에 붙어 있을 때 가장 안정적으로 유지되는 것으로
            알려져 있습니다. 그래서 BLOOM은 법랑질을 최대한 남기는 것을 기본으로
            하고, 치아 상태에 따라 필요한 범위를 진단 후 미리 설명해 드립니다.
          </p>
        </Reveal>

        <div className="mt-16 grid border-t border-ink/70 md:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1} className="border-b border-ink/15 py-10 md:border-b-0 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0">
              <p className="text-xs tracking-[0.2em] text-accent">{c.label}</p>
              <p className="mt-2 font-display text-2xl text-ink">{c.title}</p>
              <div className="mt-8 flex justify-center">
                <ToothDiagram id={`hatch-${c.id}`} removed={c.removed} existing={c.existing} />
              </div>
              <p className="mt-8 text-sm leading-relaxed text-ink-muted">{c.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-ink/15 pt-6 text-xs text-ink-muted sm:flex-row">
          <ul className="flex flex-wrap gap-5">
            {LEGEND.map((l) => (
              <li key={l.label} className="flex items-center gap-2">
                <span className={`inline-block h-3 w-5 ${l.swatch}`} />
                {l.label}
              </li>
            ))}
          </ul>
          <p>※ 이해를 돕기 위한 도식이며, 실제 삭제량은 진단 후 안내해 드립니다.</p>
        </div>
      </div>
    </section>
  );
}
