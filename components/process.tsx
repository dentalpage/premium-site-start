import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    timecode: "00:00",
    title: "Discover",
    copy: "A week of working sessions to pin down the story, the audience, and the one thing the piece has to make someone feel.",
  },
  {
    timecode: "01:30",
    title: "Direct",
    copy: "Storyboards, motion tests, and a build in parallel — so the direction is proven on-screen before it's locked.",
  },
  {
    timecode: "03:00",
    title: "Deliver",
    copy: "Final grade, final code review, and a handoff doc so your team can keep the site running without me.",
  },
];

export function Process() {
  return (
    <section id="process" className="border-t border-line px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Process
          </p>
          <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            One runtime, three cuts.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="border-t border-accent/60 pt-5">
                <span className="font-mono text-xs tabular-nums text-accent">
                  {step.timecode}
                </span>
                <h3 className="mt-3 font-display text-2xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
