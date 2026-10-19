import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { JOURNAL_ARTICLES } from "@/lib/journal";

export function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const others = JOURNAL_ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, 2);

  return (
    <section className="border-t border-line bg-sand px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex items-end justify-between">
          <SectionLabel>More from Journal</SectionLabel>
          <Link href="/journal" className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent">
            전체 보기 →
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {others.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.1}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <PlaceholderFrame aspect="landscape" />
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-accent">{a.category}</p>
                <p className="mt-2 font-display text-2xl leading-snug text-ink transition-colors duration-300 group-hover:text-accent">
                  {a.title}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
