import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

/** Half full-bleed image, half text on sand; alternate with `reverse` to vary rhythm. */
export function SplitFeature({
  image,
  alt = "",
  photoNote,
  reverse = false,
  children,
}: {
  image?: string;
  alt?: string;
  photoNote: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="grid border-y border-line bg-sand md:grid-cols-2">
      <div className={`relative min-h-[360px] md:min-h-[640px] ${reverse ? "md:order-2" : ""}`}>
        {image ? (
          <Image src={image} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        ) : (
          <div className="photo-placeholder absolute inset-0">
            <span className="absolute bottom-5 left-5 max-w-[80%] text-[11px] leading-relaxed tracking-[0.1em] text-ink-muted">
              PHOTO · {photoNote}
            </span>
          </div>
        )}
      </div>
      <Reveal className="flex items-center px-6 py-20 sm:px-14 lg:px-20">
        <div className="w-full max-w-md">{children}</div>
      </Reveal>
    </section>
  );
}
