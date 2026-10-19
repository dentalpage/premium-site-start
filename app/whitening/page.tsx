import type { Metadata } from "next";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { SplitFeature } from "@/components/ui/split-feature";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ProblemList } from "@/components/ui/problem-list";
import { ProtocolList } from "@/components/ui/protocol-list";
import { FaqSection } from "@/components/ui/faq-section";
import { VisitCta } from "@/components/home/visit-cta";
import { DiscolorationTypes } from "@/components/whitening/discoloration-types";
import { WhiteningTimeline } from "@/components/whitening/timeline";
import { GumWhitening } from "@/components/whitening/gum-whitening";
import { WHITENING_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "미백 | BLOOM 심미치과",
  description: "변색의 원인부터 확인하는 치아미백, 그리고 잇몸미백.",
};

const PROBLEMS = [
  "전체적으로 치아가 어둡게 느껴지는 경우",
  "커피·차 등으로 착색이 신경 쓰이는 경우",
  "삭제 없이 인상 변화를 원하는 경우",
];

const PROTOCOL = [
  { role: "원장", text: "미백에 앞서 변색의 원인과 현재 치아 상태를 먼저 확인합니다." },
  { role: "치과위생사", text: "치료 전 준비와 치료 후 착색 및 민감도 관리 방법을 안내합니다." },
];

export default function WhiteningPage() {
  return (
    <>
      <CinematicHero
        eyebrow="Whitening"
        title={"색을 더하지 않습니다.\n밝기를 되찾습니다."}
        subtitle="변색의 원인부터 확인하는 치아미백."
      />

      <section id="teeth" className="scroll-mt-20 px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <SectionLabel>치아미백 · 이런 경우 찾아주십니다</SectionLabel>
            <div className="mt-6">
              <ProblemList items={PROBLEMS} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Principle</SectionLabel>
            <div className="mt-6">
              <ProtocolList items={PROTOCOL} />
            </div>
          </Reveal>
        </div>
      </section>

      <SplitFeature reverse photoNote="셰이드 가이드와 미백 준비 기구 디테일 (환자 구강 내 장면 제외)">
        <SectionLabel>Simple · Controlled</SectionLabel>
        <h2 className="mt-6 font-display text-3xl leading-[1.45] text-ink sm:text-[40px]">
          밝기보다 먼저,
          <br />
          원인을 봅니다.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-ink-muted">
          같은 누런 빛이라도 표면의 착색인지, 치아 내부의 변색인지에 따라
          방법과 기대할 수 있는 변화가 다릅니다. 미백 전에 원인을 먼저
          확인하고, 가능한 범위를 함께 설명해 드립니다.
        </p>
      </SplitFeature>

      <DiscolorationTypes />
      <WhiteningTimeline />
      <FaqSection title="치아미백 자주 묻는 질문" items={WHITENING_FAQ} />
      <GumWhitening />
      <VisitCta />
    </>
  );
}
