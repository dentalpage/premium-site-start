import type { Metadata } from "next";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { QuoteBand } from "@/components/ui/quote-band";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { VisitCta } from "@/components/home/visit-cta";

export const metadata: Metadata = {
  title: "일반진료 | BLOOM 심미치과",
  description: "심미는 기본 위에 올라갑니다. 신경치료·잇몸치료·충치치료.",
};

const CORE = [
  {
    id: "root-canal",
    no: "01",
    name: "신경치료",
    en: "Root Canal",
    desc: "가능한 경우 자연치를 오래 보존하는 방향을 먼저 고민합니다.",
  },
  {
    id: "gum",
    no: "02",
    name: "잇몸치료",
    en: "Periodontal",
    desc: "보철을 시작하기 전에 잇몸 상태부터 확인합니다.",
  },
  {
    id: "cavity",
    no: "03",
    name: "충치치료",
    en: "Cavity",
    desc: "다시 문제가 생길 위험을 줄일 수 있도록 접착과 마무리까지 꼼꼼하게 봅니다.",
  },
];

export default function GeneralCarePage() {
  return (
    <>
      <CinematicHero
        eyebrow="General Care"
        title={"심미는 기본 위에\n올라갑니다."}
        subtitle={"충치와 잇몸이 건강해야\n아름다운 치료도 오래 갈 수 있으니까요."}
      />

      <section className="px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Core Treatment</SectionLabel>
          </Reveal>
          <div className="mt-10 border-t border-line">
            {CORE.map((item, i) => (
              <Reveal key={item.id} id={item.id} delay={i * 0.08} className="scroll-mt-24">
                <div className="grid items-baseline gap-4 border-b border-line py-10 sm:grid-cols-[160px_220px_1fr] sm:gap-10 sm:py-14">
                  <span className="font-display text-6xl leading-none text-accent sm:text-[88px]">
                    {item.no}
                  </span>
                  <div>
                    <p className="font-display text-2xl text-ink sm:text-3xl">{item.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-muted">{item.en}</p>
                  </div>
                  <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        quote="Foundation comes first."
        ko={
          "심미치료 상담으로 오셨어도\n잇몸이나 충치 치료가 먼저 필요한 경우가 있습니다.\n조금 돌아가는 것처럼 느껴질 수 있지만\n오래 사용하려면 기본이 먼저입니다."
        }
        source="Director's Voice"
      />

      <VisitCta />
    </>
  );
}
