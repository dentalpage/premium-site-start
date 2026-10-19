import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const COST_ITEMS = [
  { name: "라미네이트", unit: "1치아" },
  { name: "심미레진", unit: "1치아" },
  { name: "치아미백", unit: "1회" },
  { name: "잇몸미백", unit: "1회" },
];

export function CostTable() {
  return (
    <section id="cost" className="scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Reveal>
          <SectionLabel>비급여 진료비용 안내</SectionLabel>
          <h2 className="mt-6 font-display text-3xl leading-[1.45] text-ink sm:text-4xl">
            비용은 먼저,
            <br />
            투명하게.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink-muted sm:text-base">
            치료 범위와 기존 보철물의 상태에 따라 비용은 달라질 수 있습니다.
            상담 후 예상 비용을 먼저 안내해 드립니다.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            아래 금액은 원내 게시 금액과 동일하며, 부가세(VAT) 포함 금액입니다.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <table className="w-full border-t border-ink/70 text-sm sm:text-base">
            <thead>
              <tr className="text-left text-xs tracking-[0.15em] text-ink-muted">
                <th className="py-4 font-medium">항목</th>
                <th className="py-4 font-medium">기준</th>
                <th className="py-4 text-right font-medium">금액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line border-y border-line">
              {COST_ITEMS.map((item) => (
                <tr key={item.name}>
                  <td className="py-5 font-display text-lg text-ink">{item.name}</td>
                  <td className="py-5 text-ink-muted">{item.unit}</td>
                  <td className="py-5 text-right text-ink-muted">입력 예정</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
