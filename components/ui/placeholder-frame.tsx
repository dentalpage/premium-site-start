const ASPECTS = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  cinema: "aspect-[4/3] sm:aspect-[21/9]",
} as const;

/** Stand-in for photography not yet delivered — deliberately abstract, never a stock photo. */
export function PlaceholderFrame({
  aspect = "landscape",
  caption,
  className,
}: {
  aspect?: keyof typeof ASPECTS;
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={`photo-placeholder relative overflow-hidden rounded-sm border border-line ${ASPECTS[aspect]} ${className ?? ""}`}
    >
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-ink/25" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-ink/25" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-ink/25" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-ink/25" />
      {caption ? (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] tracking-[0.1em] text-ink-muted">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
