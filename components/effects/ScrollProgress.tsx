"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";

/** Reading progress across the top, plus a back-to-top button that swings in
 *  once the hero is well behind you. */
export default function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > 700));

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent via-accent to-accent/60"
      />

      <AnimatePresence>
        {showTop && (
          <motion.a
            href="#top"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-card text-accent shadow-lg shadow-accent/10 backdrop-blur transition-colors hover:bg-accent hover:text-background"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
