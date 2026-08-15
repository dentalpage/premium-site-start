import { Reveal } from "@/components/ui/reveal";

const TOOLS = [
  "After Effects",
  "Cinema 4D",
  "Framer Motion",
  "WebGL",
  "Figma",
  "TouchDesigner",
];

export function About() {
  return (
    <section id="about" className="border-t border-line px-6 py-28 sm:px-10">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line bg-surface">
            <div
              aria-hidden
              className="animate-drift absolute -inset-10 opacity-80"
              style={{
                background:
                  "conic-gradient(from 120deg at 50% 40%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 35%, color-mix(in srgb, var(--color-accent) 14%, transparent) 70%, transparent)",
              }}
            />
            {/* viewfinder corner marks */}
            <span className="absolute left-4 top-4 h-5 w-5 border-l border-t border-ink/40" />
            <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-ink/40" />
            <span className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-ink/40" />
            <span className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-ink/40" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
              M.V. — Studio, 2026
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            About
          </p>
          <h2 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
            RUNOUT is the practice of Mara Voss — a motion and interactive
            designer working the space between a brand film and a browser
            tab.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            <p>
              Ten years split between edit bays and code editors taught me
              the same lesson twice: timing is the whole job. A cut held a
              frame too long reads as hesitation. A page transition that
              overshoots reads as noise.
            </p>
            <p>
              I take on a small number of projects a year, end to end —
              concept, direction, motion design, and the front-end build
              that ships it.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-ink-muted"
              >
                {tool}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
