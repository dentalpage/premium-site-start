import type { Metadata } from "next";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ProcessSteps, type Step } from "@/components/ui/process-steps";
import { TeamProtocol, type ProtocolMember } from "@/components/ui/team-protocol";
import { FaqSection } from "@/components/ui/faq-section";
import { VisitCta } from "@/components/home/visit-cta";
import { ResinCaseChips } from "@/components/resin/case-chips";
import { ResinOutlineIntro } from "@/components/resin/outline-intro";
import { ResinChapters } from "@/components/resin/chapters";
import { ResinCompare } from "@/components/resin/compare-table";
import { ResinCaseRows } from "@/components/resin/case-rows";
import { RESIN_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "심미레진 | BLOOM 심미치과",
  description: "자연치를 최대한 보존하며 형태와 색을 회복하는 심미레진.",
};

const TEAM: ProtocolMember[] = [
  {
    role: "원장",
    principle: "가능한 범위에서 자연치를 최대한 보존합니다.",
    text: "치료 부위에 맞는 방습과 접착 과정을 거쳐 색과 형태를 단계적으로 완성합니다.",
    photo: "적층 기구를 든 원장의 손",
  },
  {
    role: "치과위생사",
    principle: "준비부터 관리까지 함께합니다.",
    text: "치료 준비와 시술 보조, 치료 후 유지관리 안내까지 함께합니다.",
    photo: "진료를 준비하는 치과위생사",
  },
];

const STEPS: Step[] = [
  { no: "01", title: "진단", desc: "치아 상태와 개선이 필요한 부위를 확인합니다." },
  { no: "02", title: "색 선택", desc: "주변 치아와 어우러지도록 재료의 색을 고릅니다." },
  { no: "03", title: "방습 및 준비", desc: "치료 부위에 맞는 방습과 준비 과정을 거칩니다." },
  { no: "04", title: "적층", desc: "필요한 부위에 재료를 단계적으로 쌓아 올립니다." },
  { no: "05", title: "형태와 색 조정", desc: "주변 치아와 어우러지도록 형태와 색을 다듬습니다." },
  { no: "06", title: "교합 확인", desc: "씹을 때 불편함이 없도록 맞물림을 확인합니다." },
  { no: "07", title: "연마", desc: "자연스러운 광택과 질감을 위해 마무리 연마를 진행합니다." },
];

export default function ResinPage() {
  return (
    <>
      <CinematicHero
        eyebrow="Resin"
        title={"필요한 만큼만 다듬고,\n자연스러운 결을 더합니다."}
        subtitle={"자연치를 최대한 보존하며\n형태와 색을 회복하는 심미레진."}
      />
      <ResinCaseChips />
      <ResinOutlineIntro />
      <ResinChapters />
      <TeamProtocol heading={"필요한 사람이\n필요한 만큼 함께합니다."} members={TEAM} />

      <section id="process" className="scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Process</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">진행 과정</h2>
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={STEPS} />
          </div>
          <p className="mt-12 text-xs text-ink-muted">※ 러버댐 등 방습 방법은 치료 부위와 상황에 따라 달라질 수 있습니다.</p>
        </div>
      </section>

      <ResinCompare />
      <ResinCaseRows />
      <FaqSection items={RESIN_FAQ} />
      <VisitCta />
    </>
  );
}
