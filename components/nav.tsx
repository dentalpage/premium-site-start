import { Timecode } from "@/components/ui/timecode";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-[0.2em] text-ink"
        >
          RUNOUT
        </a>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Timecode className="text-xs text-ink-muted" />
      </div>
    </header>
  );
}
