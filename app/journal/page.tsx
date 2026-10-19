import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { JOURNAL_ARTICLES, readMinutes } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal | BLOOM 심미치과",
  description: "BLOOM의 원칙과 시선을 담은 아티클.",
};

export default function JournalIndexPage() {
  const [featured, ...rest] = JOURNAL_ARTICLES;

  return (
    <>
      <section className="overflow-hidden px-6 pb-16 pt-[140px] sm:px-10 sm:pt-[160px]">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>BLOOM Journal</SectionLabel>
          <h1 className="-ml-[0.04em] mt-4 font-display text-[24vw] leading-[0.9] tracking-[-0.04em] text-ink lg:text-[220px]">
            Journal
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row">
            <p>BLOOM의 원칙과 시선을 담은 기록.</p>
            <p>아티클 · 원장 인터뷰 · 소식</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10">
        <Reveal className="mx-auto max-w-7xl">
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end md:gap-14"
          >
            <PlaceholderFrame aspect="landscape" />
            <div className="pb-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Featured · {featured.category}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-[1.35] text-ink transition-colors duration-300 group-hover:text-accent sm:text-[40px]">
                {featured.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">{featured.excerpt}</p>
              <p className="mt-8 text-sm text-ink">
                {readMinutes(featured)}분 읽기
                <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </p>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="border-t border-line px-6 py-16 sm:px-10 sm:py-24">
        <ul className="mx-auto max-w-7xl border-t border-ink/70">
          {rest.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.08}>
              <li className="border-b border-line">
                <Link
                  href={`/journal/${article.slug}`}
                  className="group grid gap-3 py-10 sm:grid-cols-[80px_140px_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="font-display text-2xl text-ink-muted">{String(i + 2).padStart(2, "0")}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-accent">{article.category}</span>
                  <span>
                    <span className="block font-display text-2xl leading-snug text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl">
                      {article.title}
                    </span>
                    <span className="mt-2 block text-sm text-ink-muted">{article.excerpt}</span>
                  </span>
                  <span className="text-sm text-ink-muted transition-transform duration-300 group-hover:translate-x-1">
                    {readMinutes(article)}분 →
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
