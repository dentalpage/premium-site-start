import { Reveal } from "@/components/ui/reveal";
import { ChapterBand } from "@/components/ui/chapter-band";

const STEPS = ["진단", "기록", "설계", "색 확인", "삭제", "인상", "임시치아", "부착", "관리"];

const CHAPTERS = [
  {
    label: "DESIGN",
    ko: "진단 · 기록 · 설계",
    title: "다듬기 전에,\n결과를 먼저 그립니다.",
    text: "치아와 잇몸 상태, 기존 보철 여부를 확인하고 형태와 교합을 기록합니다. 가능한 경우 최종 형태를 미리 계획해 함께 확인합니다.",
    photoNote: "스캔 데이터를 모니터로 확인하는 원장",
  },
  {
    label: "PREPARATION",
    ko: "색 확인 · 삭제 · 인상 · 임시치아",
    title: "설계한 만큼만\n다듬습니다.",
    text: "삭제 전 자연치의 색을 기록하고, 설계에 따라 필요한 범위만 다듬습니다. 예상 범위는 미리 설명해 드리며, 제작 기간에는 임시치아를 사용합니다.",
    photoNote: "삭제 가이드와 모형 (환자 구강 내 장면 제외)",
  },
  {
    label: "CRAFT",
    ko: "기공 · 셰이드 조율",
    title: "사진 한 장으로\n색을 정하지 않습니다.",
    text: "조명과 카메라에 따라 같은 치아도 다르게 보입니다. 필요한 경우 원장과 기공사가 함께 실제 치아를 확인하고, 조율한 결과를 세라믹에 옮깁니다.",
    photoNote: "셰이드 탭과 세라믹을 비교하는 기공사의 손",
  },
  {
    label: "DELIVERY",
    ko: "부착 · 관리",
    title: "형태, 색, 교합을\n확인한 뒤에 붙입니다.",
    text: "최종 부착 전 형태·색·교합을 함께 확인합니다. 부착 후에는 치과위생사가 관리 방법을 안내하고 정기 점검 일정을 잡습니다.",
    photoNote: "완성된 라미네이트와 모형 (오브제 컷)",
  },
];

export function LaminateProcess() {
  return (
    <div id="process" className="scroll-mt-16">
      <section className="bg-olive px-6 pt-28 text-on-dark sm:px-10 sm:pt-36">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="text-xs tracking-[0.3em] text-on-dark-muted">PROCESS</p>
          <h2 className="mt-6 font-display text-3xl leading-[1.5] sm:text-[44px]">제작 공정 · 4개의 장, 9단계</h2>
          <ol className="mt-10 flex flex-wrap justify-center gap-2">
            {STEPS.map((s, i) => (
              <li key={s} className="rounded-full border border-on-dark/20 px-4 py-1.5 text-xs text-on-dark/80">
                <span className="mr-1.5 text-accent">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
      {CHAPTERS.map((c, i) => (
        <ChapterBand key={c.label} tone="olive" no={String(i + 1).padStart(2, "0")} reverse={i % 2 === 1} {...c} />
      ))}
    </div>
  );
}
