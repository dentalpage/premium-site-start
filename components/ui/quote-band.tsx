import { Backdrop, type BackdropMedia } from "@/components/ui/backdrop";
import { Reveal } from "@/components/ui/reveal";

export function QuoteBand({
  quote,
  ko,
  source = "BLOOM Principle",
  media = {},
}: {
  quote: string;
  ko: string;
  source?: string;
  media?: BackdropMedia;
}) {
  return (
    <section className="relative overflow-hidden bg-graphite px-6 py-36 text-on-dark sm:px-10 sm:py-48">
      <Backdrop {...media} />
      <div className="absolute inset-0 bg-black/30" />
      <Reveal className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="font-display text-3xl leading-[1.35] tracking-tight sm:text-5xl">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="mx-auto mt-8 max-w-xl whitespace-pre-line text-base leading-relaxed text-on-dark/80 sm:text-lg">
          {ko}
        </p>
        <p className="mt-10 text-[11px] uppercase tracking-[0.3em] text-on-dark-muted">{source}</p>
      </Reveal>
    </section>
  );
}
