import { Reveal } from "@/components/ui/reveal";

export function BrandPrinciple() {
  return (
    <section className="border-t border-line px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-display text-2xl leading-[1.7] text-ink sm:text-3xl">
          처음 하시는 분에게는 신중하게.
          <br />
          다시 하시는 분에게는 조금 더 조심스럽게.
        </p>
        <p className="mt-8 text-base leading-relaxed text-ink-muted sm:text-lg">
          삭제는 필요한 만큼만 하고,
          <br />
          색은 직접 보고 확인합니다.
        </p>
      </Reveal>
    </section>
  );
}
