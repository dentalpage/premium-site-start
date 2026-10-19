import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const CASES = [
  "앞니 사이의\n작은 공간",
  "일부 치아\n파절",
  "한두 개 치아의\n형태 차이",
  "큰 보철치료가\n부담스러운 경우",
  "자연치를 최대한\n보존하고 싶은 경우",
];

export function ResinCaseChips() {
  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <Reveal>
          <SectionLabel>When Resin</SectionLabel>
          <h2 className="mt-6 font-display text-3xl leading-[1.45] text-ink sm:text-[44px]">
            이런 경우 심미레진을 고려할 수 있습니다.
          </h2>
        </Reveal>
        <ul className="mt-16 flex flex-wrap justify-center gap-4 sm:gap-6">
          {CASES.map((c, i) => (
            <Reveal key={c} delay={i * 0.07}>
              <li className="flex aspect-square w-[150px] items-center justify-center rounded-full border border-accent/40 bg-accent-soft/40 p-4 transition-colors duration-300 hover:bg-accent hover:text-on-dark sm:w-[180px]">
                <span className="whitespace-pre-line text-sm leading-relaxed text-current sm:text-base">{c}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-12 max-w-md text-sm leading-relaxed text-ink-muted">
            변화 범위가 크거나 여러 치아의 색과 배열을 함께 정리해야 한다면,
            상담 시 라미네이트 등 다른 방법도 함께 비교해 드립니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
