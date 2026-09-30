import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { VisitCta } from "@/components/home/visit-cta";

export const metadata: Metadata = {
  title: "ABOUT | BLOOM 심미치과",
  description: "THE BLOOM — 필로소피, 디렉터 소개, 팀 소개, ACADEMIC & CAREER.",
};

const DIRECTOR_PRINCIPLES = [
  { no: "01", title: "삭제량", text: "기본은 필요한 만큼만 다듬는 것입니다." },
  { no: "02", title: "재제작", text: "이미 치료받은 치아일수록 남아 있는 자연치를 더 조심스럽게 봅니다." },
  { no: "03", title: "Shade", text: "사진 한 장으로 색을 정하지 않습니다." },
];

const TEAM = [
  { role: "원장", desc: "어디까지 치료할지, 어디에서 멈출지를 판단합니다." },
  { role: "기공사", desc: "실제 치아의 색과 특징을 확인하고 원장과 조율한 결과를 보철물에 구현합니다." },
  { role: "치과위생사", desc: "치료 전 구강 상태를 확인하고, 치료가 안정적으로 진행될 수 있도록 준비하며, 치료 후 관리 방법을 안내합니다." },
];

const ACADEMIC = ["학력", "수련 및 경력", "학술활동", "학회", "논문", "교육", "자격 및 인증"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The BLOOM"
        title={"다시 하는 치료라면,\n조금 더 조심스러워야 하니까."}
      />

      <section id="philosophy" className="scroll-mt-20 border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel>Philosophy</SectionLabel>
            <p className="mt-6 whitespace-pre-line font-display text-2xl leading-[1.7] text-ink sm:text-3xl">
              처음 치료하는 치아와{"\n"}이미 한 번 치료받은 치아는 같은
              상태가 아닙니다.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
            <p>
              개원 후 기존 라미네이트나 심미보철을 다시 하고 싶다며 찾아오는
              환자들을 자주 만났습니다. 색이 지나치게 밝아 부자연스럽거나,
              형태가 마음에 들지 않거나, 시간이 지나며 잇몸과 보철의 경계가
              신경 쓰이는 경우도 있었습니다.
            </p>
            <p>
              재제작 상담을 하다 보면 하나의 사실이 더욱 분명해졌습니다.
              기존 보철물을 제거한 뒤 남아 있는 치아의 양은 사람마다 다르고,
              잇몸 상태 역시 함께 확인해야 한다는 것입니다. 한 번 삭제된
              치아는 다시 돌아오지 않습니다.
            </p>
            <p className="text-ink">
              그래서 BLOOM은 원칙을 정했습니다. 삭제는 꼭 필요한 만큼만.
              색은 직접 보고 확인할 것. 다시 하는 치료일수록 더 신중하게
              볼 것.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 border-t border-line pt-8">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-muted">
              재제작의 경우 더 꼼꼼히 확인합니다
            </p>
            <ul className="mt-4 grid gap-3 text-sm text-ink-muted sm:grid-cols-2">
              {["잇몸 상태", "기존 보철 상태", "남아 있는 치질", "추가 삭제 가능 범위"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="director" className="scroll-mt-20 border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <PlaceholderFrame aspect="portrait" caption="원장 사진 촬영 예정" />
            <p className="mt-4 text-sm text-ink-muted">
              원장 소개 · 실제 이력 입력 예정
            </p>
          </Reveal>
          <div>
            <Reveal>
              <SectionLabel>Director</SectionLabel>
            </Reveal>
            <div className="mt-8 space-y-8">
              {DIRECTOR_PRINCIPLES.map((p, i) => (
                <Reveal key={p.no} delay={i * 0.08} className="border-t border-line pt-5">
                  <span className="text-xs tracking-[0.15em] text-accent">{p.no}</span>
                  <p className="mt-2 font-display text-xl text-ink">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {p.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-20 border-b border-line bg-surface px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>Team</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-display text-2xl leading-snug text-ink sm:text-4xl">
              스펙보다, 실제로 하는 역할을 보여드립니다.
            </h2>
          </Reveal>

          <div className="mt-14 divide-y divide-line border-t border-line">
            {TEAM.map((member, i) => (
              <Reveal key={member.role} delay={i * 0.08}>
                <div className="grid gap-6 py-8 sm:grid-cols-[minmax(0,220px)_1fr] sm:items-center">
                  <PlaceholderFrame aspect="landscape" caption="사진 촬영 예정" />
                  <div>
                    <p className="font-display text-xl text-ink">
                      {member.role}
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="academic-career" className="scroll-mt-20 border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel>Academic &amp; Career</SectionLabel>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">
              학력, 수련 및 경력, 학술활동, 적법하게 표시 가능한 자격 및
              인증을 담백하게 정리해 안내드립니다.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 divide-y divide-line border-t border-line">
              {ACADEMIC.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between py-4 text-sm sm:text-base"
                >
                  <span className="text-ink">{item}</span>
                  <span className="text-ink-muted">입력 예정</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <VisitCta />
    </>
  );
}
