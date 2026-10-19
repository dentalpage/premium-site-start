import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const STEPS = [
  { title: "진단", desc: "변색 원인과 치아·잇몸 상태를 확인합니다." },
  { title: "준비", desc: "잇몸과 주변 조직을 보호하고 미백을 준비합니다." },
  { title: "미백", desc: "현재 치아 상태에 맞는 계획에 따라 진행합니다." },
  { title: "확인", desc: "밝기 변화와 치아·잇몸 상태를 확인합니다." },
  { title: "관리", desc: "착색과 민감도 관리 방법을 안내합니다." },
];

export function WhiteningTimeline() {
  return (
    <section className="bg-sand px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Simple / Clean / Controlled</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">치아미백 진행 과정</h2>
        </Reveal>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-ink/20 md:left-0 md:top-[7px] md:h-px md:w-full" />
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="relative pl-8 md:pl-0 md:pt-10">
                <span className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-accent bg-sand md:top-0" />
                <span className="text-xs tracking-[0.15em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display text-xl text-ink">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
