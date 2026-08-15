"use client";

import { motion } from "motion/react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const LINE_ONE = ["Motion", "that", "earns"];
const LINE_TWO = ["the", "second", "look."];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const word = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg pt-24"
    >
      <div
        aria-hidden
        className="animate-drift absolute -inset-x-1/4 -top-1/3 h-[140%] opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 65%)," +
            "radial-gradient(closest-side at 70% 60%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Reel 004 — Selected work, 2021–2026
        </p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-ink sm:text-[9vw] lg:text-[6.4vw]"
        >
          <span className="block overflow-hidden">
            {LINE_ONE.map((w) => (
              <motion.span key={w} variants={word} className="inline-block">
                {w}&nbsp;
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden italic text-ink-muted">
            {LINE_TWO.map((w) => (
              <motion.span key={w} variants={word} className="inline-block">
                {w}&nbsp;
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1 }}
          className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
            Brand films, launch sites, and interactive specimens — directed
            and built end to end by one person, RUNOUT.
          </p>
          <MagneticButton href="#contact">Start a project</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
