import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { FAQ } from "@/components/ui/faq";
import { WHITENING_FAQ } from "@/lib/faq";

export function WhiteningConsultFaq() {
  return (
    <section className="bg-bg px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[72px]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.13em] text-ink-muted">FAQ</p>
          <h2 className="mt-4 font-display text-3xl leading-[1.35] tracking-tight text-ink sm:text-4xl">
            미백 전,
            <br />
            많이 묻는 질문.
          </h2>
          <div className="mt-14 border-t border-line pt-10">
            <p className="text-xs uppercase tracking-[0.13em] text-ink-muted">Whitening Consultation</p>
            <h3 className="mt-4 font-display text-xl leading-[1.45] text-ink sm:text-2xl">
              조금 더 밝은 인상을 원한다면,
              <br />
              먼저 현재 색부터 확인해보세요.
            </h3>
            <Link
              href="/visit#reservation"
              className="mt-7 inline-block rounded-full border border-ink px-6 py-3.5 text-xs tracking-[0.07em] text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
            >
              WHITENING CONSULTATION
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <FAQ items={WHITENING_FAQ} />
        </Reveal>
      </div>
    </section>
  );
}
