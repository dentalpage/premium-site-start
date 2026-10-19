import { Reveal } from "@/components/ui/reveal";

const COLS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
} as const;

export function ProtocolList({
  items,
}: {
  items: { role: string; text: string }[];
}) {
  const cols = COLS[items.length as keyof typeof COLS] ?? COLS[3];

  return (
    <div className={`grid gap-10 ${cols}`}>
      {items.map((item, i) => (
        <Reveal key={item.role} delay={i * 0.1}>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-muted">
            {item.role}의 원칙
          </p>
          <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-ink">
            {item.text}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
