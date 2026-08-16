"use client";

import { MotionConfig } from "motion/react";

/**
 * Motion honours the user's reduced-motion setting for us.
 *
 * This matters beyond preference: branching the rendered DOM on
 * `useReducedMotion()` produces a hydration mismatch, because the server has no
 * media query to read. With `reducedMotion="user"` the markup is identical on
 * both sides and Motion simply skips transform animations when asked to.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
