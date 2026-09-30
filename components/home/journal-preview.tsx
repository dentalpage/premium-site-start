import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { JOURNAL_ARTICLES } from "@/lib/journal";

export function JournalPreview() {
  return (
    <section className="border-t border-line px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>Journal</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
              아티클 · 인터뷰 · 소식
            </h2>
          </div>
          <Link
            href="/journal"
            className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
          >
            전체 저널 보기 →
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {JOURNAL_ARTICLES.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.1}>
              <Link href={`/journal/${article.slug}`} className="group block">
                <PlaceholderFrame aspect="landscape" />
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  {article.category}
                </p>
                <p className="mt-2 font-display text-lg leading-snug text-ink transition-colors duration-200 group-hover:text-accent">
                  {article.title}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-10 text-sm text-ink-muted">
            Instagram ·{" "}
            <span className="text-ink">@bloom_dental (계정 연동 예정)</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
