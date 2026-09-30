import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "VISIT | BLOOM 심미치과",
  description: "비용안내, 오시는 길, 예약 상담.",
};

const COST_ITEMS = ["라미네이트", "심미레진", "전문가 미백", "잇몸미백"];

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        title={"궁금한 게 있다면\n먼저 물어보셔도 됩니다."}
      />

      <section id="cost" className="scroll-mt-20 border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel>비용안내</SectionLabel>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">
              치료 범위와 기존 보철물의 상태에 따라 비용은 달라질 수
              있습니다. 상담 후 예상 비용을 먼저 안내해드립니다. 실제 가격
              확정 시 부가세(VAT) 포함 여부도 명확히 표시합니다.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 divide-y divide-line border-t border-line">
              {COST_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between py-4 text-sm sm:text-base"
                >
                  <span className="text-ink">{item}</span>
                  <span className="text-ink-muted">상담 후 안내</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line px-6 py-20 sm:px-10">
        <Reveal className="mx-auto max-w-3xl">
          <SectionLabel>진료시간</SectionLabel>
          <ul className="mt-6 divide-y divide-line border-t border-line text-sm sm:text-base">
            {[
              ["평일", "입력 예정"],
              ["토요일", "입력 예정"],
              ["일요일 · 공휴일", "휴진"],
              ["점심시간", "입력 예정"],
            ].map(([day, time]) => (
              <li key={day} className="flex justify-between py-3.5">
                <span className="text-ink">{day}</span>
                <span className="text-ink-muted">{time}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="location" className="scroll-mt-20 border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>오시는 길</SectionLabel>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <PlaceholderFrame aspect="wide" caption="지도 연동 예정" />
            </Reveal>
            <Reveal delay={0.1} className="space-y-6 text-sm leading-relaxed sm:text-base">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-muted">
                  주소
                </p>
                <p className="mt-2 text-ink">입력 예정</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-muted">
                  대중교통
                </p>
                <p className="mt-2 text-ink-muted">입력 예정</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-ink-muted">
                  주차
                </p>
                <p className="mt-2 text-ink-muted">입력 예정</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 py-28 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-2xl leading-[1.6] text-ink sm:text-3xl">
            상담은 편하게.
            <br />
            시작은 신중하게.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#">카카오 상담</Button>
            <Button href="#" variant="outline">
              전화 상담
            </Button>
            <Button href="#" variant="outline">
              온라인 예약
            </Button>
          </div>
          <p className="mt-6 text-xs text-ink-muted">
            카카오톡 채널, 전화번호, 예약 페이지 연동 예정
          </p>
        </Reveal>
      </section>
    </>
  );
}
