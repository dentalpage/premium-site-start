import { SplitFeature } from "@/components/ui/split-feature";
import { SectionLabel } from "@/components/ui/section-label";

export function BrandPrinciple() {
  return (
    <SplitFeature photoNote="기공사가 셰이드 탭을 실제 치아 색과 비교하는 손">
      <SectionLabel>Principle</SectionLabel>
      <p className="mt-6 font-display text-3xl leading-[1.55] text-ink sm:text-[40px]">
        처음 하시는 분에게는 신중하게.
        <br />
        다시 하시는 분에게는
        <br />
        조금 더 조심스럽게.
      </p>
      <p className="mt-8 text-base leading-relaxed text-ink-muted sm:text-lg">
        삭제는 필요한 만큼만 하고,
        <br />
        색은 직접 보고 확인합니다.
      </p>
    </SplitFeature>
  );
}
