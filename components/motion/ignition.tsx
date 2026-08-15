"use client";

import { useEffect, useRef } from "react";

/**
 * The hero ignition sweep — one of exactly two GSAP moments on this site.
 *
 * A single light pass across the hero on first load, drawn from a headlamp
 * coming on. It runs once, never on scroll-back, and never gates content: the
 * heading and CTA are readable before, during and after.
 *
 * GSAP is imported dynamically so it is never in the critical path for LCP.
 */
export function Ignition({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let context: { revert: () => void } | null = null;
    let cancelled = false;

    void (async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !ref.current) return;

      context = gsap.context(() => {
        gsap.fromTo(
          element,
          { xPercent: -100, opacity: 0 },
          {
            xPercent: 220,
            opacity: 1,
            duration: 1.1,
            delay: 0.15,
            ease: "power2.inOut",
            onComplete: () => gsap.to(element, { opacity: 0, duration: 0.35 }),
          },
        );
      }, element);
    })();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      <span
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "35%",
          opacity: 0,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
        }}
      />
    </span>
  );
}
