import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";

export type ProtocolMember = { role: string; principle: string; text: string; photo: string };

/** Each role's principle with a working-hands photo slot, not a posed portrait. */
export function TeamProtocol({ heading, members }: { heading: string; members: ProtocolMember[] }) {
  const cols = members.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="bg-sand px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Signature Protocol</SectionLabel>
          <h2 className="mt-5 max-w-xl whitespace-pre-line font-display text-3xl leading-[1.4] text-ink sm:text-4xl">
            {heading}
          </h2>
        </Reveal>
        <div className={`mt-16 grid gap-12 ${cols}`}>
          {members.map((m, i) => (
            <Reveal key={m.role} delay={i * 0.1}>
              <PlaceholderFrame aspect="portrait" caption={m.photo} />
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {m.role}의 원칙
              </p>
              <p className="mt-3 font-display text-xl leading-snug text-ink sm:text-2xl">{m.principle}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
