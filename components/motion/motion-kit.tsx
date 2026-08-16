"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Component-level entrance. Motion owns this layer.
 * Reveals run once, use transform and opacity only, and never gate content —
 * with reduced motion the final state renders immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.07,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        shown: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word headline reveal. Each word rises behind a clipping mask, which
 * reads as typographic rather than as a generic fade-in.
 */
export function SplitHeading({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate="shown"
        variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "108%" },
                shown: { y: "0%", transition: { duration: 0.95, ease: EASE } },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Slow vertical drift tied to scroll. Subtle enough to feel like depth. */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Pointer-follow lift. Fine pointers only — on touch it would fight the tap,
 * and it never moves more than a few pixels.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const finePointer = useFinePointer();
  const active = finePointer && !reduced;

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.35 }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || !active) return;
        const r = el.getBoundingClientRect();
        setOffset({
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
        });
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

/**
 * Subscribes to the pointer media query rather than setting state in an
 * effect, so the value is correct on first paint and stays correct if the
 * user switches input device.
 */
function useFinePointer(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}
