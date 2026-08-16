"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Custom cursor — a lamp, borrowed from the hero.
 *
 * A hard dot tracks the pointer exactly so precision is never lost, and a soft
 * ring trails behind it. Over anything interactive the ring opens up and the
 * dot contracts, so the affordance reads before you land on it.
 *
 * Only mounts for fine pointers, and only then does it hide the native cursor —
 * if this component never runs, the ordinary cursor is untouched. It is skipped
 * entirely under reduced motion, where a trailing element is the wrong idea.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const enabled = useCursorSupported();

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let frame = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      if (!visible) {
        visible = true;
        dotEl.style.opacity = "1";
        ringEl.style.opacity = "1";
      }

      const el = e.target as Element | null;
      const interactive = el?.closest("a, button, [role='tab'], input, select, textarea");
      targetScale = interactive ? 2.1 : 1;
      ringEl.dataset.active = interactive ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
    };

    const tick = () => {
      /* The ring lags; the dot does not. */
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      scale += (targetScale - scale) * 0.16;

      dotEl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ringEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={ring}
        className="absolute left-0 top-0 size-9 rounded-full border border-lamp/50 opacity-0 transition-[opacity,background-color,border-color] duration-300 data-[active=true]:border-lamp/80 data-[active=true]:bg-lamp/[0.07]"
        style={{ boxShadow: "0 0 24px rgba(207,230,255,0.16)" }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-lamp opacity-0 transition-opacity duration-200"
        style={{ boxShadow: "0 0 12px rgba(207,230,255,0.8)" }}
      />
    </div>
  );
}

/**
 * True only for a fine pointer with motion allowed. Read through an external
 * store so the answer exists at render time and the server renders nothing,
 * which keeps hydration honest.
 */
function useCursorSupported(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const queries = [
        window.matchMedia("(pointer: fine)"),
        window.matchMedia("(prefers-reduced-motion: reduce)"),
      ];
      queries.forEach((q) => q.addEventListener("change", onChange));
      return () => queries.forEach((q) => q.removeEventListener("change", onChange));
    },
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
