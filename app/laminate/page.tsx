import type { Metadata } from "next";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { QuoteBand } from "@/components/ui/quote-band";
import { TeamProtocol, type ProtocolMember } from "@/components/ui/team-protocol";
import { BeforeAfterSection } from "@/components/ui/before-after-section";
import { FaqSection } from "@/components/ui/faq-section";
import { VisitCta } from "@/components/home/visit-cta";
import { LaminateConcern } from "@/components/laminate/concern";
import { LaminateMaterial } from "@/components/laminate/material";
import { CraftMosaic } from "@/components/laminate/craft-mosaic";
import { LaminateProcess } from "@/components/laminate/process-chapters";
import { ReductionChart } from "@/components/laminate/reduction-chart";
import { LaminateRemake } from "@/components/laminate/remake";
import { LAMINATE_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "라미네이트 | BLOOM 심미치과",
  description: "자연치는 최대한 남기고 형태와 색을 자연스럽게 맞추는 라미네이트.",
};

const TEAM: ProtocolMember[] = [
  {
    role: "원장",
    principle: "삭제는 필요한 만큼만 합니다.",
    text: "치아 상태에 따라 필요한 삭제량은 달라질 수 있으며, 치료 전 예상 범위를 먼저 설명합니다.",
    photo: "스캔 데이터를 보는 원장",
  },
  {
    role: "기공사",
    principle: "사진만 보고 색을 정하지 않습니다.",
    text: "필요한 경우 원장과 함께 실제 치아를 확인하고, 색과 형태를 조율해 제작에 반영합니다.",
    photo: "세라믹을 다루는 기공사의 손",
  },
  {
    role: "치과위생사",
    principle: "잇몸 관리까지 함께 챙깁니다.",
    text: "치료 준비를 돕고, 치료 후에도 오래 관리할 수 있도록 필요한 관리 방법을 안내합니다.",
    photo: "진료를 준비하는 치과위생사",
  },
];

export default function LaminatePage() {
  return (
    <>
      <CinematicHero
        eyebrow="Laminate"
        title={"치아를 새로 만드는 것이 아니라,\n필요한 만큼 다듬습니다."}
        subtitle={"자연치는 최대한 남기고\n형태와 색을 자연스럽게 맞추는 라미네이트."}
      />
      <LaminateConcern />
      <CraftMosaic />
      <LaminateMaterial />
      <LaminateProcess />
      <ReductionChart />
      <TeamProtocol heading={"예쁜 치아는 한 사람이 만드는 게 아닙니다.\n필요한 사람이 함께 봅니다."} members={TEAM} />
      <QuoteBand
        quote="A removed tooth never grows back."
        ko={"한 번 삭제된 치아는 다시 돌아오지 않습니다.\n그래서 다시 하는 치료일수록 더 신중하게 봅니다."}
      />
      <LaminateRemake />
      <BeforeAfterSection
        id="before-after"
        heading="치료 범위와 목적을 함께 보여드립니다."
        cases={[
          ["LAMINATE · 4 UNITS", "기존 보철물 재제작", "전치부 색조 및 형태 개선", "치료 기간 ○주 · 내원 ○회"],
          ["LAMINATE · 6 UNITS", "첫 치료", "전치부 배열 및 색조 개선", "치료 기간 ○주 · 내원 ○회"],
          ["LAMINATE · 2 UNITS", "첫 치료", "중절치 형태 개선", "치료 기간 ○주 · 내원 ○회"],
        ]}
        sideEffects="시린 증상, 보철물 파절·탈락, 잇몸 경계 노출"
      />
      <FaqSection items={LAMINATE_FAQ} />
      <VisitCta />
    </>
  );
}
