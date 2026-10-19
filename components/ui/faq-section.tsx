import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { FAQ } from "@/components/ui/faq";

export function FaqSection({
  title = "자주 묻는 질문",
  note = "장점만이 아니라 한계와 주의사항도 함께 안내해 드립니다.",
  items,
}: {
  title?: string;
  note?: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">{note}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <FAQ items={items} />
        </Reveal>
      </div>
    </section>
  );
}
