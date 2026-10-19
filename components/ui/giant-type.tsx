"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** Oversized display lines drifting in opposite directions around a centered portrait. */
export function GiantType({ lines, children }: { lines: [string, string]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const type = "whitespace-nowrap font-display text-[13vw] leading-[0.95] tracking-[-0.03em] text-accent lg:text-[12vw]";

  return (
    <div ref={ref} className="relative overflow-hidden py-10" aria-label={lines.join(" ")}>
      <motion.p aria-hidden style={{ x: left }} className={`relative z-0 ${type}`}>
        {lines[0]}
      </motion.p>
      <div className="relative z-10 mx-auto -my-[9vw] w-[46vw] max-w-[340px] sm:w-[30vw] lg:-my-[6.5vw]">
        {children}
      </div>
      <motion.p aria-hidden style={{ x: right }} className={`relative z-20 text-right ${type}`}>
        {lines[1]}
      </motion.p>
    </div>
  );
}
