import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const TREATMENTS = [
  {
    name: "LAMINATE",
    ko: "라미네이트",
    line: "깎는 대신, 필요한 만큼 다듬습니다.",
    href: "/laminate",
  },
  {
    name: "RESIN",
    ko: "심미레진",
    line: "자연치를 최대한 보존하며 형태를 더합니다.",
    href: "/resin",
  },
  {
    name: "WHITENING",
    ko: "미백",
    line: "색을 더하지 않고, 밝기를 되찾습니다.",
    href: "/whitening",
  },
];

export function TreatmentCategory() {
  return (
    <section className="border-t border-line px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Treatment</SectionLabel>
          <h2 className="mt-5 max-w-lg font-display text-3xl leading-tight text-ink sm:text-4xl">
            핵심 진료
          </h2>
        </Reveal>

        <div className="mt-16 grid border-t border-line sm:grid-cols-3">
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <Link
                href={t.href}
                className="group block border-b border-line px-1 py-10 transition-colors duration-300 sm:border-b-0 sm:border-r sm:px-8 sm:py-12 sm:first:pl-0 sm:last:border-r-0"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
                  {t.name}
                </p>
                <p className="mt-3 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-accent">
                  {t.ko}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {t.line}
                </p>
                <span className="mt-6 inline-block text-sm text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  자세히 보기 →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
