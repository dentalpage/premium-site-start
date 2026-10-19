import { Hero } from "@/components/home/hero";
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
      <Hero />
      <BrandPrinciple />
      <TreatmentCategory />
      <Team />
      <BeforeAfterPreview />
      <JournalPreview />
      <GeneralCarePreview />
      <VisitCta />
    </>
  );
}
