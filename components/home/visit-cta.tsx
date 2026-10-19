import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SecondaryContacts } from "@/components/ui/secondary-contacts";

export function VisitCta() {
  return (
    <section className="border-t border-line bg-surface px-6 py-28 sm:px-10">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
          궁금한 게 있다면
          <br />
          먼저 물어보셔도 됩니다.
        </h2>
        <p className="mt-5 text-sm text-ink-muted sm:text-base">
          상담은 편하게, 시작은 신중하게.
        </p>
        <div className="mt-10 flex flex-col items-center gap-5">
          <Button href="/visit#reservation">온라인 예약</Button>
          <SecondaryContacts />
        </div>
      </Reveal>
    </section>
  );
}
