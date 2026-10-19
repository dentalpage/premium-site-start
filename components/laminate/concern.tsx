import { Reveal } from "@/components/ui/reveal";

const ITEMS = [
  "치아 색이 신경 쓰인다.",
  "배열을 조금 정리하고 싶다.",
  "교정까지는 부담스럽다.",
  "기존 라미네이트가 부자연스럽다.",
  "다시 치료해야 하는데 추가 삭제가 걱정된다.",
];

export function LaminateConcern() {
  return (
    <section className="bg-olive px-6 py-28 text-on-dark sm:px-10 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <p className="text-xs tracking-[0.3em] text-on-dark-muted">CONCERN</p>
          <h2 className="mt-6 font-display text-3xl leading-[1.5] sm:text-[44px]">
            이런 고민에서 시작합니다.
          </h2>
        </Reveal>
        <ul className="mt-16 border-t border-on-dark/15">
          {ITEMS.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <li className="flex items-baseline justify-between gap-6 border-b border-on-dark/15 py-7">
                <span className="font-display text-xl leading-snug sm:text-[28px]">{item}</span>
                <span className="shrink-0 text-xs tracking-[0.2em] text-on-dark-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
