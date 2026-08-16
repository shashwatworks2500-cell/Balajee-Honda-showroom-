"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Pointer-tracked lighting for a card.
 *
 * Writes the pointer position to CSS custom properties and lets a radial
 * highlight follow it, so a card lights where you are looking rather than
 * flipping a flat hover state. Values are written straight to style — no React
 * state — so it costs nothing per frame.
 *
 * Touch devices never fire pointermove before a tap, so they simply get the
 * static card, which is the correct outcome rather than a fallback.
 */
export function Spotlight({
  children,
  className,
  tint = "rgba(224,25,51,0.10)",
}: {
  children: React.ReactNode;
  className?: string;
  tint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--lit", "1");
      }}
      onPointerLeave={() => ref.current?.style.setProperty("--lit", "0")}
      className={cn("group/spot relative isolate", className)}
      style={{ ["--lit" as string]: "0" }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 motion-reduce:hidden"
        style={{
          opacity: "var(--lit)",
          background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${tint}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
