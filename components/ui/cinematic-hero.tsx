"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Backdrop, type BackdropMedia } from "@/components/ui/backdrop";
import { Button } from "@/components/ui/button";

const words = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const word = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function CinematicHero({
  eyebrow,
  title,
  subtitle,
  cta,
  media = {},
  size = "tall",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { href: string; label: string };
  media?: BackdropMedia;
  size?: "full" | "tall";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className={`relative flex items-center justify-center overflow-hidden bg-graphite px-6 text-on-dark ${
        size === "full" ? "h-[100svh] min-h-[620px]" : "h-[82svh] min-h-[560px]"
      }`}
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Backdrop {...media} placeholder="HERO FILM · 촬영 예정" />
      </motion.div>
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {eyebrow ? (
          <p className="mb-7 text-xs font-medium uppercase tracking-[0.35em] text-on-dark-muted">{eyebrow}</p>
        ) : null}
        <motion.h1
          variants={words}
          initial="hidden"
          animate="show"
          className={`font-display leading-[1.25] tracking-tight ${
            size === "full" ? "text-[44px] sm:text-7xl lg:text-[88px]" : "text-[40px] sm:text-6xl lg:text-[72px]"
          }`}
        >
          {title.split("\n").map((line) => (
            <span key={line} className="block">
              {line.split(" ").map((w, i) => (
                <motion.span key={i} variants={word} className="mr-[0.25em] inline-block last:mr-0">
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.9 }}
            className="mx-auto mt-8 max-w-md whitespace-pre-line text-base leading-relaxed text-on-dark/80 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        ) : null}
        {cta ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-10"
          >
            <Button href={cta.href} variant="light">{cta.label}</Button>
          </motion.div>
        ) : null}
      </div>

      <span aria-hidden className="absolute bottom-8 left-1/2 h-12 w-px -translate-x-1/2 bg-on-dark/30" />
    </section>
  );
}
