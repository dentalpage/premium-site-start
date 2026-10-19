import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const TYPES = [
  {
    label: "표면 착색",
    cause: "커피 · 차 · 흡연 등",
    text: "치아 표면에 쌓인 착색은 미백으로 개선을 기대할 수 있는 경우가 많습니다.",
    swatch: "from-[#efe6d2] to-[#d9c39b]",
  },
  {
    label: "내부 변색",
    cause: "신경치료 이력 · 약물 등",
    text: "치아 내부의 변색은 일반 미백만으로는 개선이 제한적일 수 있어, 다른 방법을 함께 검토합니다.",
    swatch: "from-[#e4dccf] to-[#a9a092]",
  },
  {
    label: "보철물 · 레진",
    cause: "기존 치료 부위",
    text: "보철물과 레진은 미백되지 않습니다. 미백 후 자연치와 색 차이가 생길 수 있어 미리 확인합니다.",
    swatch: "from-[#f3efe8] to-[#e8e1d4]",
  },
];

export function DiscolorationTypes() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>Discoloration</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-[1.45] text-ink sm:text-4xl">
            같은 누런 빛도, 원인이 다릅니다.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {TYPES.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.08} className="bg-bg p-8 sm:p-10">
              <span className={`block h-16 w-16 rounded-full bg-gradient-to-br ${t.swatch} ring-1 ring-ink/10`} />
              <p className="mt-8 font-display text-2xl text-ink">{t.label}</p>
              <p className="mt-1 text-xs tracking-[0.1em] text-ink-muted">{t.cause}</p>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
