import type { Metadata } from "next";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { PlaceholderFrame } from "@/components/ui/placeholder-frame";
import { SecondaryContacts } from "@/components/ui/secondary-contacts";
import { CostTable } from "@/components/visit/cost-table";
import { ClinicInfo } from "@/components/visit/clinic-info";
import { ReservationForm } from "@/components/visit/reservation-form";

export const metadata: Metadata = {
  title: "VISIT | BLOOM 심미치과",
  description: "비급여 진료비용 안내, 진료시간, 오시는 길, 온라인 예약.",
};

export default function VisitPage() {
  return (
    <>
      <CinematicHero
        eyebrow="Visit"
        title={"궁금한 게 있다면\n먼저 물어보셔도 됩니다."}
        cta={{ href: "#reservation", label: "온라인 예약" }}
      />

      <CostTable />
      <ClinicInfo />

      <section className="px-6 pt-24 sm:px-10">
        <Reveal className="mx-auto max-w-6xl">
          <PlaceholderFrame aspect="cinema" caption="지도 연동 예정" />
        </Reveal>
      </section>

      <section id="reservation" className="scroll-mt-20 px-6 py-28 sm:px-10 sm:py-36">
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
