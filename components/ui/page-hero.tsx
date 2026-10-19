import { SectionLabel } from "@/components/ui/section-label";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-line px-6 pb-20 pt-[148px] sm:px-10 sm:pb-28 sm:pt-[180px]">
      <div className="mx-auto max-w-4xl">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-5 whitespace-pre-line font-display text-3xl leading-[1.35] text-ink sm:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-ink-muted sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
