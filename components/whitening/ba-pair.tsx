import Image from "next/image";

/** Labelled before/after pair. Images are AI samples until real consented cases replace them. */
export function BaPair({
  label,
  before,
  after,
  aspect = "aspect-video",
}: {
  label: string;
  before: string;
  after: string;
  aspect?: string;
}) {
  return (
    <div className="border-t border-line pt-4">
      <div className="mb-3.5 flex flex-col gap-1 text-[11px] tracking-[0.08em] text-ink-muted sm:flex-row sm:justify-between">
        <span>BEFORE &amp; AFTER</span>
        <span>{label}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { src: before, tag: "BEFORE" },
          { src: after, tag: "AFTER" },
        ].map((img) => (
          <figure key={img.tag} className={`relative overflow-hidden bg-surface ${aspect}`}>
            <Image src={img.src} alt={`${label} ${img.tag}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            <figcaption className="absolute left-3 top-3 bg-bg/85 px-2 py-1 text-[10px] tracking-[0.15em] text-ink">
              {img.tag}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-2.5 text-[11px] text-ink-muted">예시 이미지 · 실제 치료 사례가 아닙니다</p>
    </div>
  );
}
