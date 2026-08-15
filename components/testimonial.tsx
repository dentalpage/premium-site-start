import { Reveal } from "@/components/ui/reveal";

export function Testimonial() {
  return (
    <section className="border-t border-line px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-display text-2xl italic leading-snug text-ink sm:text-3xl">
          &ldquo;Mara storyboarded the launch film and the site in the same
          week, and it showed — the scroll felt like it was cut on the same
          timeline as the video.&rdquo;
        </p>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          Priya Ramanathan — Founder, Ridgeline Audio
        </p>
      </Reveal>
    </section>
  );
}
