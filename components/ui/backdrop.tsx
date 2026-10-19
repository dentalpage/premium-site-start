import Image from "next/image";

export type BackdropMedia = { image?: string; video?: string; alt?: string };

/** Full-bleed photo/video layer; falls back to a graded gradient until real footage exists. */
export function Backdrop({ image, video, alt = "", placeholder }: BackdropMedia & { placeholder?: string }) {
  if (video) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={image}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }

  if (image) {
    return <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />;
  }

  return (
    <div className="cinematic-fallback grain absolute inset-0">
      <div className="animate-drift absolute inset-0 bg-[radial-gradient(40%_35%_at_50%_45%,rgb(245_242_236/0.08),transparent_70%)]" />
      {placeholder ? (
        <span className="absolute bottom-6 left-6 text-[10px] tracking-[0.25em] text-on-dark-muted/70">
          {placeholder}
        </span>
      ) : null}
    </div>
  );
}
