import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { JOURNAL_ARTICLES } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal | BLOOM 심미치과",
  description: "BLOOM의 원칙과 시선을 담은 아티클.",
};

export default function JournalIndexPage() {
  return (
    <>
      <PageHero eyebrow="Journal" title="아티클 · 인터뷰 · 소식" />
      <section className="px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNAL_ARTICLES.map((article, i) => (
            <Reveal key={article.slug} delay={(i % 3) * 0.08}>
              <Link href={`/journal/${article.slug}`} className="group block">
                <PlaceholderFrame aspect="landscape" />
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  {article.category}
                </p>
                <p className="mt-2 font-display text-xl leading-snug text-ink transition-colors duration-200 group-hover:text-accent">
                  {article.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {article.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
