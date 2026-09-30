"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const line = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 sm:px-10">
      <div
        aria-hidden
        className="animate-drift absolute -inset-x-1/3 -top-1/4 h-[130%] opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent-soft), transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-accent">
          BLOOM 심미치과
        </p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-[13vw] leading-[1.1] tracking-tight text-ink sm:text-[7vw] lg:text-[5.2vw]"
        >
          <motion.span variants={line} className="block">
            다시, 피어나다.
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
          className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-sm text-base leading-relaxed text-ink-muted sm:text-lg">
            원래 가지고 있던 자연스러움.
            <br />
            BLOOM은 그걸 되찾는 일을 합니다.
          </p>
          <Button href="/visit#location">예약 상담하기</Button>
        </motion.div>
      </div>
    </section>
  );
}
