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
  title: "라미네이트 | BLOOM 심미치과",
  description: "자연치는 최대한 남기고 형태와 색을 자연스럽게 맞추는 라미네이트.",
};

const PROBLEMS = [
  "치아 색이 신경 쓰인다.",
  "배열을 조금 정리하고 싶다.",
  "교정까지는 부담스럽다.",
  "기존 라미네이트가 부자연스럽다.",
  "다시 치료해야 하는데 추가 삭제가 걱정된다.",
];

const PROTOCOL = [
  {
    role: "원장",
    text: "삭제는 필요한 만큼만 합니다.\n치아 상태에 따라 필요한 삭제량은 달라질 수 있으며 치료 전 예상 범위를 먼저 설명합니다.",
  },
  {
    role: "기공사",
    text: "사진만 보고 색을 정하지 않습니다.\n필요한 경우 원장과 함께 실제 치아를 확인하고, 색과 형태를 조율해 제작에 반영합니다.",
  },
  {
    role: "위생사",
    text: "보철만 보는 것이 아니라 잇몸 관리까지 함께 챙깁니다.\n치료 후에도 오래 관리할 수 있도록 필요한 관리 방법을 안내합니다.",
  },
];

const STEPS: Step[] = [
  { no: "01", title: "DIAGNOSIS", ko: "진단", desc: "현재 치아와 잇몸 상태, 기존 보철 여부를 확인하고 치료 가능 범위를 판단합니다." },
  { no: "02", title: "SCAN", ko: "기록", desc: "현재 치아의 형태와 교합 상태를 기록합니다." },
  { no: "03", title: "DESIGN", ko: "설계", desc: "가능한 경우 최종 형태를 사전에 계획하고 함께 확인합니다." },
  { no: "04", title: "SHADE", ko: "색 확인", desc: "삭제 전 자연치의 색을 기록하고, 필요한 경우 원장과 기공사가 함께 확인합니다." },
  { no: "05", title: "PREPARATION", ko: "삭제", desc: "설계에 따라 필요한 범위만 다듬습니다. 예상 범위는 미리 설명해 드립니다." },
  { no: "06", title: "IMPRESSION", ko: "인상", desc: "다듬은 치아의 정보를 기공 과정으로 전달합니다." },
  { no: "07", title: "TEMPORARY", ko: "임시치아", desc: "제작 기간 동안 임시치아를 사용합니다." },
  { no: "08", title: "DELIVERY", ko: "부착", desc: "형태·색·교합을 확인한 뒤 최종 부착합니다." },
  { no: "09", title: "CARE", ko: "관리", desc: "관리 방법을 안내하고 정기 점검 일정을 함께 잡습니다." },
];

const FAQ_ITEMS = [
  {
    q: "누구에게 적합한가?",
    a: "치아 색이나 배열이 신경 쓰이지만 교정까지는 부담스러우신 분, 기존 보철을 다시 하고 싶으신 분들이 주로 찾아주십니다. 정확한 적합 여부는 실제 치아와 잇몸 상태를 확인한 후 상담에서 안내해 드립니다.",
  },
  {
    q: "삭제량은 어느 정도인가?",
    a: "치아 배열과 변색 정도, 기존 보철 상태에 따라 달라집니다. 상담 시 예상 범위를 먼저 설명해 드립니다.",
  },
  {
    q: "무삭제가 가능한가?",
    a: "치아 상태에 따라 다르며, 무삭제를 단정해서 안내하지 않습니다. 가능한 범위 내에서 최대한 보존하는 방향을 원칙으로 합니다.",
  },
  {
    q: "라미네이트보다 교정이나 레진이 더 나은 경우는?",
    a: "배열 차이가 크거나 국소적인 개선만 필요한 경우에는 교정이나 심미레진이 더 적합할 수 있습니다. 상담에서 함께 비교해 드립니다.",
  },
  {
    q: "기존 라미네이트 재제작이 가능한가?",
    a: "가능합니다. 다만 남아있는 자연치와 잇몸 상태를 먼저 확인한 뒤 신중하게 진행합니다.",
  },
  {
    q: "임시치아 기간 동안 주의할 점은?",
    a: "임시치아는 최종 보철물보다 약해 단단하거나 끈적한 음식은 피하시는 것이 좋습니다. 자세한 주의사항은 삭제 당일 안내해 드립니다.",
  },
  {
    q: "치료 후 관리 방법은?",
    a: "치료 후 관리 방법은 치과위생사가 상세히 안내해 드립니다.",
  },
  {
    q: "예상 가능한 한계와 부작용은?",
    a: "치료 후 일시적인 시린 증상이 있을 수 있고, 강한 힘이 가해지면 보철물이 파절되거나 탈락할 수 있습니다. 시간이 지나며 잇몸 경계가 드러날 수도 있습니다. 개인차가 있으므로 상담 시 예상되는 한계와 주의사항을 함께 설명해 드립니다.",
  },
];

export default function LaminatePage() {
  return (
    <>
      <PageHero
        eyebrow="Laminate"
        title={"치아를 새로 만드는 것이 아니라,\n필요한 만큼 다듬습니다."}
        subtitle={"자연치는 최대한 남기고\n형태와 색을 자연스럽게 맞추는 라미네이트."}
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
            <SectionLabel>Craft / Laboratory / Team</SectionLabel>
            <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              제작 공정
            </h2>
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={STEPS} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface px-6 py-24 sm:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl leading-[1.6] text-ink sm:text-3xl">
            다시 하는 치료는
            <br />
            처음보다 조금 더 조심스럽습니다.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink-muted sm:text-base">
            기존 보철물을 제거한 뒤에는 남아 있는 자연치, 기존 삭제량, 잇몸
            상태, 보철물 주변 상태를 다시 확인합니다.
            <br />
            다시 깎을 수 있는 치아의 양은 처음보다 적을 수 있으니까요.
          </p>
          <p className="mt-6 text-sm font-medium text-ink sm:text-base">
            BLOOM은 재제작일수록 더 많이 하기보다,
            <br />
            어디까지 손대지 않아도 되는지를 먼저 봅니다.
          </p>
        </Reveal>
      </section>

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
