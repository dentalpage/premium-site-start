import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ProblemList } from "@/components/ui/problem-list";
import { FAQ } from "@/components/ui/faq";

const PROBLEMS = [
  "잇몸 색이 어둡게 보여 신경 쓰이는 경우",
  "웃을 때 드러나는 잇몸 색조가 고민인 경우",
];

// Method (laser etc.) not yet confirmed by the clinic; keep step 02 generic until it is.
const STEPS = [
  { no: "01", title: "진단", desc: "색소 침착의 원인과 잇몸 상태를 확인합니다." },
  { no: "02", title: "시술", desc: "잇몸 상태에 맞는 방법으로 진행합니다." },
  { no: "03", title: "회복 및 관리", desc: "회복 기간과 주의사항을 안내합니다." },
];

const FAQ_ITEMS = [
  {
    q: "색소가 다시 생길 수 있나요?",
    a: "개인에 따라 시간이 지나며 색소가 다시 생길 수 있습니다. 재발 가능성과 관리 방법을 상담 시 안내해 드립니다.",
  },
  {
    q: "시술 후 통증이나 회복 기간은 어느 정도인가요?",
    a: "시술 후 일시적인 불편감이 있을 수 있으며, 회복 기간은 잇몸 상태에 따라 다릅니다. 시술 전 자세히 설명해 드립니다.",
  },
  {
    q: "재발에 영향을 주는 요인이 있나요?",
    a: "흡연 등 생활 습관이 색소 침착에 영향을 줄 수 있습니다.",
  },
];

export function GumWhitening() {
  return (
    <section id="gum" className="scroll-mt-20 border-b border-line bg-surface px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>Gum Whitening · 잇몸미백</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-[1.4] text-ink sm:text-4xl">
            잇몸의 색도
            <br />
            인상의 일부입니다.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">
            잇몸미백은 치아미백과 원리가 다릅니다. 잇몸에 침착된 색소를
            다루는 치료로, 잇몸 상태를 먼저 확인한 뒤 진행 여부를 안내해
            드립니다.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-muted">
              이런 경우 찾아주십니다
            </p>
            <div className="mt-5">
              <ProblemList items={PROBLEMS} />
            </div>
            <ol className="mt-12 space-y-6 border-t border-line pt-8">
              {STEPS.map((s) => (
                <li key={s.no} className="flex gap-5">
                  <span className="text-xs tracking-[0.15em] text-accent">{s.no}</span>
                  <div>
                    <p className="text-base text-ink">{s.title}</p>
                    <p className="mt-1 text-sm text-ink-muted">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-muted">
              잇몸미백 자주 묻는 질문
            </p>
            <div className="mt-5">
              <FAQ items={FAQ_ITEMS} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
