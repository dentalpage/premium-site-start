import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

const ITEMS = [
  { name: "신경치료", desc: "가능한 경우 자연치를 오래 보존하는 방향을 먼저 고민합니다." },
  { name: "잇몸치료", desc: "보철을 시작하기 전에 잇몸 상태부터 확인합니다." },
  { name: "충치치료", desc: "다시 문제가 생길 위험을 줄이도록 접착과 마무리까지 꼼꼼히 봅니다." },
];

export function GeneralCarePreview() {
  return (
    <section className="border-t border-line px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-md">
            <SectionLabel>일반진료</SectionLabel>
            <p className="mt-3 text-lg leading-relaxed text-ink sm:text-xl">
              심미는 기본 위에 올라갑니다.
            </p>
          </div>
          <ul className="flex flex-col gap-3 text-sm text-ink-muted sm:flex-row sm:gap-8">
            {ITEMS.map((item) => (
              <li key={item.name}>
                <span className="text-ink">{item.name}</span>
                <span className="mx-2 hidden sm:inline">·</span>
                <span className="hidden sm:inline">{item.desc}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/general-care"
            className="mt-6 inline-block text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
          >
            일반진료 자세히 보기 →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
