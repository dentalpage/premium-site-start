import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ProblemList } from "@/components/ui/problem-list";
import { ProtocolList } from "@/components/ui/protocol-list";
import { ProcessSteps, type Step } from "@/components/ui/process-steps";
import { FAQ } from "@/components/ui/faq";
import { VisitCta } from "@/components/home/visit-cta";

export const metadata: Metadata = {
  title: "미백 | BLOOM 심미치과",
  description: "색을 더하지 않고, 밝기를 되찾는 전문가 미백과 잇몸미백.",
};

const PROBLEMS = [
  "전체적으로 치아가 어둡게 느껴지는 경우",
  "커피·차 등으로 착색이 신경 쓰이는 경우",
  "삭제 없이 인상 변화를 원하는 경우",
  "잇몸의 색조가 신경 쓰이는 경우",
];

const PROTOCOL = [
  {
    role: "원장",
    text: "미백에 앞서 변색의 원인과 현재 치아 상태를 먼저 확인합니다.",
  },
  {
    role: "치과위생사",
    text: "치료 전 준비와 치료 후 착색 및 민감도 관리 방법을 안내합니다.",
  },
];

const STEPS: Step[] = [
  { no: "01", title: "진단", desc: "변색 원인과 치아·잇몸 상태를 확인합니다." },
  { no: "02", title: "준비", desc: "잇몸과 주변 조직을 보호하고 미백을 준비합니다." },
  { no: "03", title: "미백", desc: "현재 치아 상태에 맞는 계획에 따라 진행합니다." },
  { no: "04", title: "확인", desc: "밝기 변화와 치아·잇몸 상태를 확인합니다." },
  { no: "05", title: "관리", desc: "착색과 민감도 관리 방법을 안내합니다." },
];

const FAQ_ITEMS = [
  {
    q: "미백으로 개선이 어려운 변색도 있나요?",
    a: "신경 치료 이력이 있거나 특정 약물로 인한 착색 등은 일반 미백만으로 개선이 제한적일 수 있습니다. 상담 시 원인을 먼저 확인해드립니다.",
  },
  {
    q: "시린 증상이 있을 수 있나요?",
    a: "치료 중이나 직후 일시적으로 시린 느낌이 있을 수 있습니다. 정도와 관리 방법은 사전에 안내해드립니다.",
  },
  {
    q: "유지 기간은 어느 정도인가요?",
    a: "식습관과 개인차에 따라 다릅니다. 착색 관리 방법을 함께 안내해드립니다.",
  },
  {
    q: "재시술이 필요한가요?",
    a: "시간이 지나며 밝기가 조금씩 변할 수 있어, 필요에 따라 재시술을 고려할 수 있습니다.",
  },
  {
    q: "미백이 적합하지 않은 경우도 있나요?",
    a: "임신 중이시거나 치아·잇몸에 다른 문제가 있는 경우에는 먼저 확인이 필요합니다. 상담 시 적합 여부를 안내해드립니다.",
  },
];

export default function WhiteningPage() {
  return (
    <>
      <PageHero
        eyebrow="Whitening"
        title={"색을 더하지 않습니다.\n밝기를 되찾습니다."}
        subtitle={"치아의 밝기부터\n잇몸의 색조까지."}
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
            <SectionLabel>Principle</SectionLabel>
            <div className="mt-6">
              <ProtocolList items={PROTOCOL} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-14 sm:grid-cols-2">
          <Reveal id="expert" className="scroll-mt-24">
            <SectionLabel>전문가 미백</SectionLabel>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              병원에서 진행하는 전문가 미백입니다. 현재 치아 상태에 맞춰
              계획을 세우고 진행합니다.
            </p>
          </Reveal>
          <Reveal id="gum" delay={0.1} className="scroll-mt-24">
            <SectionLabel>잇몸미백</SectionLabel>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              잇몸의 색소침착이 신경 쓰이는 경우 고려할 수 있는
              잇몸미백입니다. 잇몸 상태를 먼저 확인한 후 진행 여부를
              안내해드립니다.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Simple / Clean / Controlled</SectionLabel>
            <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              진행 과정
            </h2>
          </Reveal>
          <div className="mt-14">
            <ProcessSteps steps={STEPS} />
          </div>
        </div>
      </section>

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
