import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

/** Dark full-width chapter: big English label, image half, text half; alternate with `reverse`. */
export function ChapterBand({
  no,
  label,
  ko,
  title,
  text,
  photoNote,
  reverse = false,
  overlay,
  tone = "graphite",
}: {
  no: string;
  label: string;
  ko: string;
  title: string;
  text: string;
  photoNote: string;
  reverse?: boolean;
  overlay?: ReactNode;
  tone?: "graphite" | "olive";
}) {
  return (
    <section className={`${tone === "olive" ? "bg-olive" : "bg-graphite"} px-6 py-20 text-on-dark sm:px-10 sm:py-28`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal className={`relative ${reverse ? "md:order-2" : ""}`}>
          <div className="photo-placeholder-dark relative aspect-[4/5] overflow-hidden rounded-sm">
            <span className="absolute bottom-5 left-5 max-w-[80%] text-[11px] leading-relaxed tracking-[0.1em] text-on-dark-muted/80">
              PHOTO · {photoNote}
            </span>
          </div>
          {overlay ? <div className="absolute -bottom-6 right-4 sm:-right-8">{overlay}</div> : null}
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs tracking-[0.3em] text-accent">CHAPTER {no}</p>
          <p className="mt-5 font-display text-5xl leading-none tracking-tight sm:text-7xl">
            {label}
          </p>
          <p className="mt-3 text-sm tracking-[0.2em] text-on-dark-muted">{ko}</p>
          <h3 className="mt-10 whitespace-pre-line font-display text-2xl leading-[1.5] sm:text-3xl">{title}</h3>
          <p className="mt-5 max-w-md text-base leading-relaxed text-on-dark/70">{text}</p>
        </Reveal>
      </div>
    </section>
  );
}
