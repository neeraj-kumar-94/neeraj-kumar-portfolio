"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const NAME = "Neeraj Kumar";

/** One-time intro: the name types itself out of a mask, a hairline fills, then
 *  the curtain lifts off the hero. */
export default function Loader() {
  const reduced = useReducedMotion();
  // Shown once per session: returning visitors should land straight on the work
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
    } catch {
      // blocked storage just means the intro plays again
    }

    if (reduced || seen) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // ignore
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          aria-hidden="true"
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-7 bg-background"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="flex font-serif text-3xl font-semibold uppercase tracking-[0.2em] text-foreground sm:text-5xl">
            {NAME.split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05 + i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              </span>
            ))}
            <motion.span
              className="ml-2 text-signal"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, type: "spring", stiffness: 500, damping: 18 }}
            >
              .
            </motion.span>
          </p>

          <span className="h-px w-40 overflow-hidden bg-border">
            <motion.span
              className="block h-full origin-left bg-signal"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
