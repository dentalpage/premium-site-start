const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Vimeo", href: "https://vimeo.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted sm:flex-row">
        <p>© 2026 RUNOUT — Runtime ∞</p>
        <nav className="flex gap-6">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-ink"
            >
              {social.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="transition-colors duration-200 hover:text-ink">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
