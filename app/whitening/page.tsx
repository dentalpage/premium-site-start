import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";
import { HeroTriptych } from "@/components/whitening/hero-triptych";
import { ToothWhitening } from "@/components/whitening/tooth-section";
import { GumWhiteningSection } from "@/components/whitening/gum-section";
import { WhiteningConsultFaq } from "@/components/whitening/consult-faq";

export const metadata: Metadata = {
  title: "미백 | BLOOM 심미치과",
  description: "치아 상태에 맞게 방향을 나누는 치아미백, 실활치 미백, 그리고 잇몸미백.",
};

export default function WhiteningPage() {
  return (
    <>
      <HeroTriptych />

      <section className="bg-bg px-6 py-20 sm:px-10 sm:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <div className="max-w-2xl lg:ml-[7vw]">
            <p className="text-xs uppercase tracking-[0.13em] text-ink-muted">BLOOM Whitening</p>
            <h2 className="mt-4 font-display text-3xl leading-[1.35] tracking-tight text-ink sm:text-4xl">
              하얗게 만드는 것보다,
              <br />
              자연스럽게 밝아지는 게 중요합니다.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-ink-muted">
              현재 치아의 색과 상태를 먼저 확인하고, 과하게 밝히기보다 인상에 자연스럽게 어울리는
              변화를 봅니다.
            </p>
          </div>
        </Reveal>
      </section>

      <ToothWhitening />
      <GumWhiteningSection />
      <WhiteningConsultFaq />
    </>
  );
}
