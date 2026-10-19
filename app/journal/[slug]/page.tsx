import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { SectionLabel } from "@/components/ui/section-label";
import { VisitCta } from "@/components/home/visit-cta";
import { JOURNAL_ARTICLES } from "@/lib/journal";

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

  return (
    <article className="px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/journal"
          className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
        >
          ← Journal
        </Link>

        <SectionLabel>{article.category}</SectionLabel>
        <h1 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
          {article.title}
        </h1>

        <div className="mt-10">
          <PlaceholderFrame aspect="wide" />
        </div>

        <div className="mt-10 space-y-5 text-base leading-[1.9] text-ink-muted">
          {article.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <div className="mt-24">
        <VisitCta />
      </div>
    </article>
  );
}
