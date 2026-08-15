"use client";

import { useEffect } from "react";

/**
 * Lenis owns scroll feel and nothing else — it never animates an element.
 *
 * Three conditions switch it off entirely, per Design System V0.2:
 *  - prefers-reduced-motion: reduced motion means native scroll, not slower
 *    smooth scroll, so the instance is destroyed rather than eased down.
 *  - touch devices: hijacking native momentum on a phone is worse than no
 *    smooth scroll, and phones are the majority of this audience.
 *  - coarse pointers generally, which covers tablets.
 *
 * Loaded dynamically so it never blocks the hero.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lenis?.destroy();
      lenis = null;
    };

    const start = async () => {
      if (reduceMotion.matches || coarsePointer.matches) return;

      const { default: Lenis } = await import("lenis");
      if (cancelled || reduceMotion.matches || coarsePointer.matches) return;

      const instance = new Lenis({
        lerp: 0.09,
        // Never take over touch scrolling.
        syncTouch: false,
        // Anchor links and programmatic scrolls stay native.
        anchors: false,
      });
      lenis = instance;

      const raf = (time: number) => {
        instance.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };

    const handleChange = () => {
      stop();
      void start();
    };

    void start();
    reduceMotion.addEventListener("change", handleChange);
    coarsePointer.addEventListener("change", handleChange);

    return () => {
      cancelled = true;
      reduceMotion.removeEventListener("change", handleChange);
      coarsePointer.removeEventListener("change", handleChange);
      stop();
    };
  }, []);

  return null;
}
