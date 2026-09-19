"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export type RevealVariant = "up" | "left" | "right" | "zoom";

// Where the block starts before it settles into place
const from: Record<RevealVariant, Record<string, number>> = {
  up: { y: 56 },
  left: { x: -64 },
  right: { x: 64 },
  zoom: { scale: 0.9, y: 28 },
};

/** Reveals its children once, the first time they scroll into view:
 *  a soft de-blur and glide on a long decelerating curve.
 *
 *  The start and end states must be identical on the server and on every
 *  device. The server renders the start state as inline styles, and anything
 *  the target doesn't name is never animated back: a device-specific target
 *  once left phones stuck at `blur(8px)`. So the element and both states never
 *  change; reduced motion only changes the timing, making it instant. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  /** milliseconds */
  delay?: number;
  variant?: RevealVariant;
  /** how much of the block must be visible before it plays */
  amount?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(8px)", ...from[variant] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 1.1, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
