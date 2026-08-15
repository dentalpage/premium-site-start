"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/** A quiet accent glow that trails the pointer — desktop only, never louder than the content. */
export default function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  useEffect(() => {
    const canHover = window.matchMedia(
      "(pointer: fine) and (hover: hover)"
    ).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!canHover || reduceMotion) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen motion-safe:pointer-fine:block"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 18%, transparent) 0%, transparent 70%)",
      }}
    />
  );
}
