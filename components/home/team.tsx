import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";

const ROLES = [
  {
    role: "원장",
    desc: "어디까지 치료할지, 어디에서 멈출지를 판단합니다.",
  },
  {
    role: "기공사",
    desc: "자연치의 색과 형태를 보철물에 구현합니다.",
  },
  {
    role: "치과위생사",
    desc: "치료 전 준비부터 치료 후 관리까지 함께합니다.",
  },
];

export function Team() {
  return (
    <section className="border-t border-line bg-surface px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Team</SectionLabel>
          <h2 className="mt-5 max-w-2xl font-display text-2xl leading-snug text-ink sm:text-4xl">
            예쁜 치아는 한 사람이 만드는 게 아닙니다.
            <br />
            BLOOM은 필요한 사람이 함께 만듭니다.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {ROLES.map((r, i) => (
            <Reveal key={r.role} delay={i * 0.1}>
              <PlaceholderFrame aspect="portrait" caption="사진 촬영 예정" />
              <p className="mt-5 font-display text-xl text-ink">{r.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {r.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-16 border-t border-line pt-8 text-sm leading-relaxed text-ink-muted">
            치료마다 필요한 사람이 다릅니다. 라미네이트는
            원장·기공사·치과위생사가,
            <br className="hidden sm:block" />
            심미레진과 미백은 원장과 치과위생사가 함께합니다.
            <br />
            <span className="text-ink">필요한 사람만, 필요한 만큼.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
