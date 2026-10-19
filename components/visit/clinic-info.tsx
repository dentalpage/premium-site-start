import { SplitFeature } from "@/components/ui/split-feature";
import { SectionLabel } from "@/components/ui/section-label";

const HOURS = [
  ["평일", "입력 예정"],
  ["야간진료", "입력 예정"],
  ["토요일", "입력 예정"],
  ["점심시간", "입력 예정"],
  ["일요일 · 공휴일", "휴진"],
];

const LOCATION = [
  ["주소", "입력 예정"],
  ["대중교통", "입력 예정"],
  ["주차", "입력 예정"],
];

function InfoList({ rows }: { rows: string[][] }) {
  return (
    <dl className="mt-5 divide-y divide-ink/10 border-t border-ink/20 text-sm sm:text-base">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-6 py-3.5">
          <dt className="text-ink">{k}</dt>
          <dd className="text-right text-ink-muted">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ClinicInfo() {
  return (
    <div id="location" className="scroll-mt-20">
      <SplitFeature photoNote="병원 입구와 대기 공간 (자연광)">
        <SectionLabel>진료시간</SectionLabel>
        <InfoList rows={HOURS} />
        <div className="mt-14">
          <SectionLabel>오시는 길</SectionLabel>
          <InfoList rows={LOCATION} />
        </div>
      </SplitFeature>
    </div>
  );
}
