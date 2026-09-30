import { Reveal } from "@/components/ui/reveal";

export type Step = { no: string; title: string; desc: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal key={step.no} delay={(i % 3) * 0.08}>
          <li className="border-t border-accent/50 pt-5">
            <span className="text-xs tracking-[0.15em] text-accent">
              {step.no}
            </span>
            <p className="mt-3 font-display text-xl text-ink">{step.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {step.desc}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
