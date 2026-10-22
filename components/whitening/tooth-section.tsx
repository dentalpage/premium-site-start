import { Reveal } from "@/components/ui/reveal";
import { BaDisclaimer } from "@/components/ui/ba-disclaimer";
import { BaPair } from "@/components/whitening/ba-pair";

const EYEBROW = "text-xs uppercase tracking-[0.13em] text-ink-muted";

export function ToothWhitening() {
  return (
    <section id="teeth" className="scroll-mt-20 bg-mist px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-2xl">
          <p className={EYEBROW}>01 · Tooth Whitening</p>
          <h2 className="mt-4 font-display text-3xl leading-[1.35] tracking-tight text-ink sm:text-4xl">
            치아 상태에 맞게,
            <br />
            미백의 방향을 나눠 봅니다.
          </h2>
        </Reveal>

        <Reveal className="grid items-end gap-6 lg:grid-cols-[0.68fr_1.32fr] lg:gap-11">
          <div className="pt-2.5">
            <p className={EYEBROW}>Professional Whitening</p>
            <h3 className="mt-4 font-display text-xl leading-[1.45] text-ink sm:text-2xl">
              밝기는 올리고,
              <br />
              인상은 자연스럽게 남깁니다.
            </h3>
            <p className="mt-4 max-w-[340px] text-[15px] leading-[1.75] text-ink-muted">
              치아 상태를 확인한 뒤 전문 미백제를 사용해 밝기를 단계적으로 조절합니다. 현재 색과
              반응 정도를 보면서 자연스러운 범위 안에서 변화를 계획합니다.
            </p>
          </div>
          <BaPair label="PROFESSIONAL WHITENING" before="/images/whitening/tooth-before.webp" after="/images/whitening/tooth-after.webp" />
        </Reveal>

        <Reveal className="mt-11 grid items-start gap-6 lg:grid-cols-[1.32fr_0.68fr] lg:gap-11">
          <div className="order-2 lg:order-1">
            <BaPair label="NON-VITAL WHITENING" before="/images/whitening/nonvital-before.webp" after="/images/whitening/nonvital-after.webp" />
          </div>
          <div className="order-1 pt-2.5 lg:order-2 lg:justify-self-end">
            <p className={EYEBROW}>Non-Vital Whitening</p>
            <h3 className="mt-4 font-display text-xl leading-[1.45] text-ink sm:text-2xl">
              신경치료 후 어두워진 치아도
              <br />
              상태에 따라 미백을 고려합니다.
            </h3>
            <p className="mt-4 max-w-[340px] text-[15px] leading-[1.75] text-ink-muted">
              신경치료를 받은 뒤 한 치아만 어둡게 보이는 경우에는 치아 상태와 기존 치료 내용을
              확인한 뒤 실활치 미백 가능 여부를 판단합니다.
            </p>
          </div>
        </Reveal>

        <BaDisclaimer sideEffects="일시적인 시린 증상, 잇몸 자극, 색 차이" className="mt-14" />
      </div>
    </section>
  );
}
