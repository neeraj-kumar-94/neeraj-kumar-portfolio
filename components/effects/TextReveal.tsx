"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Display type that rises word by word from behind a mask.
 *  `trigger="load"` plays on mount (hero, intro), `"view"` on scroll.
 *
 *  The in-view trigger lives on the wrapper, never on the words themselves:
 *  each word starts translated fully outside its own `overflow:hidden` mask,
 *  so an observer on the word would measure zero intersection and never fire.
 */
export default function TextReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.09,
  duration = 1.15,
  trigger = "view",
  weight,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  /** seconds */
  delay?: number;
  stagger?: number;
  duration?: number;
  trigger?: "load" | "view";
  /** Variable-font weight to settle from and to, e.g. [300, 500] */
  weight?: [number, number];
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  const container: Variants = {
    hidden: {},
    show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  };

  // Playfair is loaded as a variable font, so the weight can settle along with
  // the rise — the type itself gains presence as it lands.
  const word: Variants = {
    hidden: { y: "115%", ...(weight ? { fontWeight: weight[0] } : {}) },
    show: {
      y: "0%",
      ...(weight ? { fontWeight: weight[1] } : {}),
      transition: { duration, ease },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      {...(trigger === "load"
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: 0.4 } })}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          // The mask: a touch of vertical padding keeps descenders from clipping
          className="inline-block overflow-hidden pb-[0.08em] align-bottom [margin-bottom:-0.08em]"
        >
          <motion.span variants={word} className={`inline-block ${wordClassName}`}>
            {w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
