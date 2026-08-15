import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line px-6 py-32 sm:px-10"
    >
      <div
        aria-hidden
        className="animate-drift absolute -inset-x-1/4 -bottom-1/2 h-[120%] opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 65%)",
        }}
      />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Currently booking Q1 2027
        </p>
        <h2 className="mt-6 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
          Got a launch that needs a soundtrack and a scroll?
        </h2>
        <div className="mt-10 flex justify-center">
          <MagneticButton href="mailto:hello@runout.studio">
            hello@runout.studio
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
