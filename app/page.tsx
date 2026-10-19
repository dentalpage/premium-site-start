import { CinematicHero } from "@/components/ui/cinematic-hero";
import { QuoteBand } from "@/components/ui/quote-band";
import { BrandPrinciple } from "@/components/home/brand-principle";
import { TreatmentCategory } from "@/components/home/treatment-category";
import { Team } from "@/components/home/team";
import { BeforeAfterPreview } from "@/components/home/before-after-preview";
import { JournalPreview } from "@/components/home/journal-preview";
import { GeneralCarePreview } from "@/components/home/general-care-preview";
import { VisitCta } from "@/components/home/visit-cta";

export default function Home() {
  return (
    <>
      <CinematicHero
        size="full"
        eyebrow="BLOOM 심미치과"
        title="다시, 피어나다."
        subtitle={"원래 가지고 있던 자연스러움.\nBLOOM은 그걸 되찾는 일을 합니다."}
        cta={{ href: "/visit#reservation", label: "온라인 예약" }}
      />
      <BrandPrinciple />
      <TreatmentCategory />
      <QuoteBand
        quote="Only as much as needed."
        ko={"삭제는 필요한 만큼만.\n색은 직접 보고 확인합니다."}
      />
      <Team />
      <BeforeAfterPreview />
      <JournalPreview />
      <GeneralCarePreview />
      <VisitCta />
    </>
  );
}
