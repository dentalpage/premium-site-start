import Link from "next/link";
import type { ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300";

const VARIANTS = {
  primary: "bg-ink text-bg hover:bg-accent",
  outline: "border border-ink/20 text-ink hover:border-accent hover:text-accent",
  light: "bg-on-dark text-ink hover:bg-accent hover:text-on-dark",
} as const;

export function Button({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${BASE} ${VARIANTS[variant]}`}>
      {children}
    </Link>
  );
}
