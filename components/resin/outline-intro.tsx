import { Reveal } from "@/components/ui/reveal";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";

export function ResinOutlineIntro() {
  return (
    <section className="relative overflow-hidden bg-sand px-6 py-28 sm:px-10 sm:py-40">
      <p
        aria-hidden
        className="text-outline pointer-events-none absolute -left-[2vw] top-6 select-none font-display text-[30vw] leading-none tracking-[-0.03em] sm:top-10"
      >
        RESIN
      </p>
      <div className="relative mx-auto grid max-w-6xl items-end gap-12 pt-[14vw] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-20">
        <Reveal>
          <PlaceholderFrame aspect="portrait" caption="모형 위에서 레진을 적층하는 원장의 손" />
        </Reveal>
        <Reveal delay={0.1} className="pb-4">
          <p className="text-xs tracking-[0.25em] text-accent">CHAIRSIDE · HAND</p>
          <h2 className="mt-6 font-display text-3xl leading-[1.45] text-ink sm:text-[44px]">
            진료실 안에서,
            <br />
            원장의 손으로 완성합니다.
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-ink-muted">
            심미레진은 기공소를 거치지 않고 진료실에서 직접 형태를 만드는
            치료입니다. 필요한 부위에만 재료를 더하기 때문에, 가능한 범위에서
            자연치를 최대한 보존할 수 있습니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
