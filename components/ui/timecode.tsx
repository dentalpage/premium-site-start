"use client";

import { useEffect, useState } from "react";

const FPS = 24;

function format(elapsedMs: number) {
  const totalFrames = Math.floor((elapsedMs / 1000) * FPS);
  const frames = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

/** Ticking reel counter — a running-timecode readout, styled after an editing deck. */
export function Timecode({ className }: { className?: string }) {
  const [display, setDisplay] = useState("00:00:00");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const start = performance.now();
    const id = setInterval(() => {
      setDisplay(format(performance.now() - start));
    }, 200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`font-mono tabular-nums ${className ?? ""}`}>
      {display}
    </span>
  );
}
