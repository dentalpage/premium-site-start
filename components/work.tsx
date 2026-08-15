import { Reveal } from "@/components/ui/reveal";

const PROJECTS = [
  {
    timecode: "00:00",
    title: "Almanac Coffee",
    meta: "Brand film — Roastery launch — 2025",
    gradient: "conic-gradient(from 20deg, var(--color-accent), transparent 45%)",
  },
  {
    timecode: "01:42",
    title: "Ridgeline Audio",
    meta: "Product launch site — Interaction design — 2025",
    gradient:
      "radial-gradient(circle at 30% 30%, var(--color-accent), transparent 60%)",
  },
  {
    timecode: "03:15",
    title: "Verso Type Foundry",
    meta: "Interactive specimen — WebGL — 2024",
    gradient:
      "linear-gradient(135deg, var(--color-accent), transparent 55%)",
  },
  {
    timecode: "04:58",
    title: "Northbound Air",
    meta: "Safety film redesign — Direction & edit — 2023",
    gradient:
      "conic-gradient(from 200deg, var(--color-accent), transparent 40%)",
  },
];

export function Work() {
  return (
    <section id="work" className="border-t border-line px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Selected work
          </p>
          <h2 className="mt-5 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            Four projects, timestamped like the reel they came from.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-14 border-t border-line">
            {PROJECTS.map((project) => (
              <li
                key={project.title}
                className="group relative grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2 border-b border-line py-8 sm:grid-cols-[5rem_1fr_auto]"
              >
                <span className="font-mono text-xs text-ink-muted tabular-nums">
                  {project.timecode}
                </span>
                <div className="col-span-2 sm:col-span-1">
                  <h3 className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-ink-muted">
                    {project.meta}
                  </p>
                </div>
                <span className="hidden font-mono text-xs text-ink-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
                  View case study →
                </span>

                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-1/2 hidden h-28 w-44 -translate-x-3 -translate-y-1/2 scale-95 rounded-sm opacity-0 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:scale-100 group-hover:opacity-90 lg:block"
                  style={{ background: project.gradient }}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
