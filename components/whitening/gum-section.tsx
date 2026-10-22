import { Reveal } from "@/components/ui/reveal";
import { BaDisclaimer } from "@/components/ui/ba-disclaimer";
import { BaPair } from "@/components/whitening/ba-pair";

export function GumWhiteningSection() {
  return (
    <section id="gum" className="scroll-mt-20 bg-blush px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.13em] text-ink-muted">02 · Gum Whitening</p>
          <h2 className="mt-4 font-display text-3xl leading-[1.35] tracking-tight text-ink sm:text-4xl">
            치아만 밝아져도
            <br />
            인상이 완성되지는 않습니다.
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-ink-muted">
            잇몸 색이 짙어 보이는 경우에는 잇몸 상태와 원인을 먼저 확인하고, 치료가 적합한 경우
            잇몸 미백을 고려합니다.
          </p>
        </Reveal>
        <Reveal className="mt-10">
          <BaPair
            label="GUM WHITENING"
            before="/images/whitening/gum-before.webp"
            after="/images/whitening/gum-after.webp"
          />
        </Reveal>
        <BaDisclaimer sideEffects="일시적인 통증·부기, 색소 재침착" className="mt-12" />
      </div>
    </section>
  );
}
