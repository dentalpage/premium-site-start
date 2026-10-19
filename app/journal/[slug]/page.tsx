import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { SectionLabel } from "@/components/ui/section-label";
import { VisitCta } from "@/components/home/visit-cta";
import { RelatedArticles } from "@/components/journal/related-articles";
import { JOURNAL_ARTICLES, readMinutes } from "@/lib/journal";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | BLOOM Journal`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const [lead, ...body] = article.body;
  const quoteAt = Math.max(0, Math.min(1, body.length - 1));

  return (
    <>
      <article className="px-6 pb-24 pt-[140px] sm:px-10 sm:pt-[160px]">
        <header className="mx-auto max-w-3xl">
          <Link href="/journal" className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent">
            ← Journal
          </Link>
          <div className="mt-10">
            <SectionLabel>{article.category}</SectionLabel>
          </div>
          <h1 className="mt-5 font-display text-4xl leading-[1.3] tracking-tight text-ink sm:text-[56px]">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">{article.excerpt}</p>
          <p className="mt-8 border-t border-line pt-5 text-xs tracking-[0.15em] text-ink-muted">
            BLOOM JOURNAL · {readMinutes(article)}분 읽기
          </p>
        </header>

        <div className="mx-auto mt-14 max-w-5xl">
          <PlaceholderFrame aspect="wide" />
        </div>

        <div className="mx-auto mt-16 max-w-2xl text-base leading-[1.9] text-ink-muted sm:text-[17px]">
          <p className="font-display text-xl leading-[1.8] text-ink sm:text-2xl">{lead}</p>
          {body.map((para, i) => (
            <div key={i}>
              {i === quoteAt ? (
                <blockquote className="my-14 border-l-2 border-accent pl-6 font-display text-2xl leading-[1.6] text-ink sm:-ml-16 sm:text-3xl">
                  {article.pullQuote}
                </blockquote>
              ) : null}
              <p className="mt-6">{para}</p>
            </div>
          ))}
        </div>
      </article>

      <RelatedArticles currentSlug={article.slug} />
      <VisitCta />
    </>
  );
}
