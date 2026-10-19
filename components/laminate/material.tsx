import { Reveal } from "@/components/ui/reveal";

export function LaminateMaterial() {
  return (
    <section className="grid bg-bone md:grid-cols-2">
      <Reveal className="flex items-center px-6 py-24 sm:px-14 lg:px-24">
        <div className="max-w-md">
          <p className="text-xs tracking-[0.25em] text-accent">WHAT IS PORCELAIN?</p>
          <h2 className="mt-6 font-display text-3xl leading-[1.45] text-ink sm:text-[44px]">
            자연을 닮은 재료,
            <br />
            포세린
          </h2>
          <p className="mt-8 text-base leading-relaxed text-ink-muted">
            포세린은 빛을 투과하고 반사하는 방식이 자연치의 법랑질과 비슷한
            세라믹 재료입니다. 층마다 색과 투명도를 조절할 수 있어, 주변
            치아와 어우러지는 결을 만들 수 있습니다.
          </p>
          <p className="mt-6 text-xs text-ink-muted/80">※ 실제 사용 재료 확인 후 문구 확정</p>
        </div>
      </Reveal>
      <div className="relative min-h-[420px] md:min-h-[680px]">
        <div className="photo-placeholder absolute inset-0">
          <span className="absolute bottom-5 left-5 text-[11px] tracking-[0.1em] text-ink-muted">
            PHOTO · 세라믹 오브제 / 포세린 블록 (자연광, 흰 배경)
          </span>
        </div>
      </div>
    </section>
  );
}
