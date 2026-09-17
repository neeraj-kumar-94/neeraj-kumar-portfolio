"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useIsPhone } from "@/lib/useMediaQuery";

export type RevealVariant = "up" | "left" | "right" | "zoom";

// Where the block starts before it settles into place
const from: Record<RevealVariant, Record<string, number>> = {
  up: { y: 56 },
  left: { x: -64 },
  right: { x: 64 },
  zoom: { scale: 0.9, y: 28 },
};

/** Reveals its children once, the first time they scroll into view:
 *  a soft de-blur and glide on a long decelerating curve. */
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
  // Animated blur is the most expensive effect on phones, so they get the
  // movement without it.
  const phone = useIsPhone();

  if (reduced) return <div className={className}>{children}</div>;

  const blur = phone ? {} : { filter: "blur(10px)" };
  const clear = phone ? {} : { filter: "blur(0px)" };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...blur, ...from[variant] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, ...clear }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 1.1,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
