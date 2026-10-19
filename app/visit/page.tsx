import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { SecondaryContacts } from "@/components/ui/secondary-contacts";
import { ReservationForm } from "@/components/visit/reservation-form";

export const metadata: Metadata = {
  title: "VISIT | BLOOM 심미치과",
  description: "비급여 진료비용 안내, 진료시간, 오시는 길, 온라인 예약.",
};

const COST_ITEMS = [
  { name: "라미네이트", unit: "1치아" },
  { name: "심미레진", unit: "1치아" },
  { name: "치아미백", unit: "1회" },
  { name: "잇몸미백", unit: "1회" },
];

const HOURS = [
  ["평일", "입력 예정"],
  ["야간진료", "입력 예정"],
  ["토요일", "입력 예정"],
  ["점심시간", "입력 예정"],
  ["일요일 · 공휴일", "휴진"],
];

const LOCATION = [
  ["주소", "입력 예정"],
  ["대중교통", "입력 예정"],
  ["주차", "입력 예정"],
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        title={"궁금한 게 있다면\n먼저 물어보셔도 됩니다."}
      />

      <section id="cost" className="scroll-mt-20 border-b border-line px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <SectionLabel>비급여 진료비용 안내</SectionLabel>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">
              치료 범위와 기존 보철물의 상태에 따라 비용은 달라질 수 있습니다.
              상담 후 예상 비용을 먼저 안내해 드립니다.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              아래 금액은 원내 게시 금액과 동일하며, 부가세(VAT) 포함
              금액입니다.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <table className="w-full border-t border-line text-sm sm:text-base">
              <thead>
                <tr className="text-left text-xs tracking-[0.15em] text-ink-muted">
                  <th className="py-3 font-medium">항목</th>
                  <th className="py-3 font-medium">기준</th>
                  <th className="py-3 text-right font-medium">금액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line border-y border-line">
                {COST_ITEMS.map((item) => (
                  <tr key={item.name}>
                    <td className="py-4 text-ink">{item.name}</td>
                    <td className="py-4 text-ink-muted">{item.unit}</td>
                    <td className="py-4 text-right text-ink-muted">입력 예정</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-surface px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <Reveal>
            <SectionLabel>진료시간</SectionLabel>
            <dl className="mt-6 divide-y divide-line border-t border-line text-sm sm:text-base">
              {HOURS.map(([day, time]) => (
                <div key={day} className="flex justify-between py-3.5">
                  <dt className="text-ink">{day}</dt>
                  <dd className="text-ink-muted">{time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} id="location" className="scroll-mt-24">
            <SectionLabel>오시는 길</SectionLabel>
            <div className="mt-6">
              <PlaceholderFrame aspect="wide" caption="지도 연동 예정" />
            </div>
            <dl className="mt-6 space-y-3 text-sm sm:text-base">
              {LOCATION.map(([k, v]) => (
                <div key={k} className="flex gap-6">
                  <dt className="w-16 shrink-0 text-ink">{k}</dt>
                  <dd className="text-ink-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="reservation" className="scroll-mt-20 px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal className="text-center">
            <SectionLabel>Reservation</SectionLabel>
            <p className="mt-5 font-display text-3xl leading-[1.5] text-ink sm:text-4xl">
              상담은 편하게.
              <br />
              시작은 신중하게.
            </p>
            <div className="mt-6 flex justify-center">
              <SecondaryContacts />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <ReservationForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
