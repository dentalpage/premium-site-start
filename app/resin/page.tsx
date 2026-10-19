import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ProblemList } from "@/components/ui/problem-list";
import { ProtocolList } from "@/components/ui/protocol-list";
import { ProcessSteps, type Step } from "@/components/ui/process-steps";
import { BeforeAfterSection } from "@/components/ui/before-after-section";
import { FAQ } from "@/components/ui/faq";
import { VisitCta } from "@/components/home/visit-cta";

export const metadata: Metadata = {
  title: "심미레진 | BLOOM 심미치과",
  description: "자연치를 최대한 보존하며 형태와 색을 회복하는 심미레진.",
};

const PROBLEMS = [
  "앞니 사이의 작은 공간",
  "일부 치아 파절",
  "한두 개 치아의 형태 차이",
  "큰 보철치료까지는 부담스러운 경우",
  "자연치를 최대한 보존하고 싶은 경우",
];

const PROTOCOL = [
  {
    role: "원장",
    text: "가능한 범위에서 자연치를 최대한 보존합니다.\n치료 부위에 맞는 방습과 접착 과정을 거쳐 색과 형태를 단계적으로 완성합니다.",
  },
  {
    role: "위생사",
    text: "치료 준비와 시술 보조, 치료 후 유지관리 안내까지 함께합니다.",
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

const FAQ_ITEMS = [
  {
    q: "레진으로 가능한 범위는 어디까지인가요?",
    a: "앞니 사이의 작은 틈, 일부 파절, 한두 개 치아의 형태 차이처럼 비교적 국소적인 변화에 적합합니다. 변화 범위가 크신 경우에는 상담 시 다른 방법도 함께 안내해 드립니다.",
  },
  {
    q: "라미네이트가 더 적합한 경우는?",
    a: "여러 개 치아의 색과 배열을 한 번에 정리하고 싶으신 경우에는 라미네이트가 더 적합할 수 있습니다.",
  },
  {
    q: "변색이나 파절 가능성이 있나요?",
    a: "레진은 시간이 지나며 변색되거나 일부 파절될 수 있습니다. 정기 점검을 통해 필요한 경우 부분적으로 보수합니다.",
  },
  {
    q: "관리 및 정기 점검은 어떻게 하나요?",
    a: "치료 후 관리 방법을 치과위생사가 안내해드리며, 정기적인 점검을 권해 드립니다.",
  },
];

export default function ResinPage() {
  return (
    <>
      <PageHero
        eyebrow="Resin"
        title={"필요한 만큼만 다듬고,\n자연스러운 결을 더합니다."}
        subtitle={"자연치를 최대한 보존하며\n형태와 색을 회복하는 심미레진."}
      />

      <section className="border-b border-line px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <SectionLabel>이런 경우 찾아주십니다</SectionLabel>
            <div className="mt-6">
              <ProblemList items={PROBLEMS} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Signature Protocol</SectionLabel>
            <div className="mt-6">
              <ProtocolList items={PROTOCOL} />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="process" className="border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Chairside / Technique / Hand</SectionLabel>
            <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              제작 공정
            </h2>
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={STEPS} />
          </div>
        </div>
      </section>

      <BeforeAfterSection
        id="before-after"
        heading="작은 차이가, 인상을 바꿉니다."
        cases={[
          ["RESIN · 2 UNITS", "앞니 사이 공간 개선"],
          ["RESIN · 1 UNIT", "앞니 일부 파절 회복"],
          ["RESIN · 2 UNITS", "측절치 형태 보정"],
        ]}
        sideEffects="변색, 부분 파절, 시린 증상"
      />

      <section className="border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-5 font-display text-3xl text-ink sm:text-4xl">
              자주 묻는 질문
            </h2>
          </Reveal>
          <div className="mt-10">
            <FAQ items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <VisitCta />
    </>
  );
}
