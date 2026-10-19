export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base text-ink marker:content-none sm:text-lg">
            <span>{item.q}</span>
            <span className="shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
