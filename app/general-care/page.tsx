import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
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
    name: "신경치료",
    desc: "가능한 경우 자연치를 오래 보존하는 방향을 먼저 고민합니다.",
  },
  {
    id: "gum",
    name: "잇몸치료",
    desc: "보철을 시작하기 전에 잇몸 상태부터 확인합니다.",
  },
  {
    id: "cavity",
    name: "충치치료",
    desc: "다시 문제가 생길 위험을 줄일 수 있도록 접착과 마무리까지 꼼꼼하게 봅니다.",
  },
];

export default function GeneralCarePage() {
  return (
    <>
      <PageHero
        eyebrow="General Care"
        title={"심미는 기본 위에 올라갑니다."}
        subtitle={"충치와 잇몸이 건강해야\n아름다운 치료도 오래 갈 수 있으니까요."}
      />

      <section className="border-b border-line px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-4xl divide-y divide-line border-t border-line">
          {CORE.map((item, i) => (
            <Reveal key={item.id} id={item.id} delay={i * 0.08}>
              <div className="scroll-mt-24 py-8 sm:flex sm:items-baseline sm:gap-10">
                <p className="font-display text-xl text-ink sm:w-40 sm:shrink-0">
                  {item.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:mt-0 sm:text-base">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-line bg-surface px-6 py-24 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Director&apos;s Voice</SectionLabel>
          <p className="mt-6 whitespace-pre-line font-display text-xl leading-[1.8] text-ink sm:text-2xl">
            {
              "심미치료 상담으로 오셨어도\n잇몸이나 충치 치료가 먼저 필요한 경우가 있습니다.\n조금 돌아가는 것처럼 느껴질 수 있지만\n오래 사용하려면 기본이 먼저입니다."
            }
          </p>
        </Reveal>
      </section>

      <VisitCta />
    </>
  );
}
