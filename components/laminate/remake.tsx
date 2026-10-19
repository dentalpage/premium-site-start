import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const CHECKS = ["남아 있는 자연치", "기존 삭제량", "잇몸 상태", "보철물 주변 상태"];

export function LaminateRemake() {
  return (
    <section className="px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
        <Reveal>
          <SectionLabel>Remake</SectionLabel>
          <h2 className="mt-6 font-display text-3xl leading-[1.45] text-ink sm:text-[44px]">
            다시 하는 치료는
            <br />
            처음보다 조금 더
            <br />
            조심스럽습니다.
          </h2>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-ink-muted">
            다시 깎을 수 있는 치아의 양은 처음보다 적을 수 있으니까요.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs tracking-[0.15em] text-ink-muted">기존 보철물을 제거한 뒤 다시 확인합니다</p>
          <ol className="mt-5 grid grid-cols-2 gap-px border border-line bg-line">
            {CHECKS.map((c, i) => (
              <li key={c} className="bg-bg p-6 sm:p-8">
                <span className="text-xs tracking-[0.15em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 font-display text-lg text-ink sm:text-xl">{c}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 border-l-2 border-accent pl-5 font-display text-lg leading-[1.7] text-ink sm:text-xl">
            BLOOM은 재제작일수록 더 많이 하기보다,
            <br />
            어디까지 손대지 않아도 되는지를 먼저 봅니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
