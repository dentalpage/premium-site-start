import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const ROWS = [
  ["방식", "진료실에서 재료를 직접 쌓아 형태를 만듭니다", "기공소에서 세라믹을 제작해 부착합니다"],
  ["삭제", "필요한 경우에 한해 최소한으로", "치아 표면을 얇게 다듬습니다"],
  ["기간", "대부분 진료실에서 바로 진행", "제작 기간 동안 임시치아 사용"],
  ["적합한 경우", "앞니 틈, 일부 파절 등 국소적인 변화", "여러 치아의 색과 배열을 함께 정리"],
  ["관리", "변색·부분 파절 시 부분 보수 가능", "파절·탈락 시 재제작이 필요할 수 있음"],
];

export function ResinCompare() {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel>Resin or Laminate</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
            심미레진과 라미네이트, 무엇이 다를까요.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[560px] border-t border-ink/70 text-left text-sm sm:text-base">
            <thead>
              <tr className="text-xs tracking-[0.2em] text-ink-muted">
                <th className="w-[18%] py-4 font-medium" />
                <th className="py-4 font-medium text-accent">심미레진</th>
                <th className="py-4 font-medium">라미네이트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line border-y border-line">
              {ROWS.map(([k, resin, lam]) => (
                <tr key={k}>
                  <th className="py-5 pr-4 align-top text-sm font-medium text-ink">{k}</th>
                  <td className="py-5 pr-6 align-top text-ink">{resin}</td>
                  <td className="py-5 align-top text-ink-muted">{lam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <p className="mt-6 text-xs text-ink-muted">어느 쪽이 더 적합한지는 치아 상태를 확인한 뒤 상담에서 함께 결정합니다.</p>
      </div>
    </section>
  );
}
