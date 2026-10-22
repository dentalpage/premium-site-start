"use client";

import Image from "next/image";
import { motion } from "motion/react";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" as const, delay },
});

/** Portrait | copy | portrait. Collapses to two portraits over copy, then one portrait on phones. */
export function HeroTriptych() {
  return (
    <section className="grid bg-mist pt-[68px] md:grid-cols-2 lg:min-h-[86vh] lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.82fr)_minmax(0,1fr)]">
      <div className="relative min-h-[58vh] overflow-hidden md:min-h-[52vh] lg:min-h-0">
        <Image
          src="/images/whitening/hero-female.webp"
          alt="밝고 자연스러운 미소의 여성"
          fill
          priority
          sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-16 text-center md:col-span-2 md:row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:px-8">
        <motion.p {...fade(0.1)} className="text-xs uppercase tracking-[0.3em] text-ink-muted">
          Whitening
        </motion.p>
        <motion.h1
          {...fade(0.25)}
          className="mt-6 font-display text-[40px] leading-[1.25] tracking-tight text-ink sm:text-5xl lg:text-[52px]"
        >
          본연의 가장
          <br />
          밝은 색을
          <br />
          되찾습니다.
        </motion.h1>
        <motion.p {...fade(0.45)} className="mt-7 text-base leading-relaxed text-ink-muted">
          색을 덮는 대신,
          <br />
          치아 본래의 밝기를 깨끗하게 회복합니다.
        </motion.p>
      </div>

      <div className="relative hidden min-h-[52vh] overflow-hidden md:block lg:min-h-0">
        <Image
          src="/images/whitening/hero-male.webp"
          alt="밝고 자연스러운 미소의 남성"
          fill
          priority
          sizes="(min-width: 1024px) 34vw, 50vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
