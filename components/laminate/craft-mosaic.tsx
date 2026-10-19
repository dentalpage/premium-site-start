import { Reveal } from "@/components/ui/reveal";

const TILES = [
  { note: "핀셋 끝의 얇은 세라믹", span: "md:col-span-2 md:row-span-2" },
  { note: "셰이드 탭을 비교하는 손", span: "" },
  { note: "모형 위의 라미네이트", span: "" },
  { note: "세라믹을 연마하는 기공사의 손", span: "" },
  { note: "케이스를 함께 보는 원장과 기공사", span: "md:col-span-3" },
];

function Tile({ note, className = "" }: { note: string; className?: string }) {
  return (
    <div className={`photo-placeholder-dark relative min-h-[220px] overflow-hidden ${className}`}>
      <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.1em] text-on-dark-muted/70">
        PHOTO · {note}
      </span>
    </div>
  );
}

export function CraftMosaic() {
  return (
    <section className="bg-olive px-6 pb-28 sm:px-10 sm:pb-36">
      <div className="mx-auto max-w-7xl">
        <Reveal className="grid auto-rows-[minmax(220px,auto)] gap-2 md:grid-cols-4">
          {TILES.slice(0, 3).map((t) => (
            <Tile key={t.note} note={t.note} className={t.span} />
          ))}
          <div className="flex flex-col justify-end bg-bone p-8 md:col-span-2 md:row-span-1">
            <p className="text-xs tracking-[0.25em] text-accent">CRAFT</p>
            <p className="mt-4 font-display text-2xl leading-[1.45] text-ink sm:text-3xl">
              색과 형태는,
              <br />
              손끝에서 완성됩니다.
            </p>
          </div>
          {TILES.slice(3).map((t) => (
            <Tile key={t.note} note={t.note} className={t.span} />
          ))}
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-16 max-w-2xl text-center text-on-dark/75">
          <p className="text-base leading-relaxed sm:text-lg">
            라미네이트는 원장의 설계, 기공사의 손, 치과위생사의 준비가 함께
            만드는 결과입니다. 사진만 보고 색을 정하지 않고, 필요한 경우 실제
            치아를 함께 확인하며 조율합니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
