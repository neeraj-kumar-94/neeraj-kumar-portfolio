"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const ring = {
  default: { width: 32, height: 32, backgroundColor: "rgba(198,205,218,0)", borderColor: "rgba(198,205,218,0.5)" },
  hover: { width: 56, height: 56, backgroundColor: "rgba(198,205,218,0.12)", borderColor: "rgba(198,205,218,0.75)" },
  view: { width: 84, height: 84, backgroundColor: "rgba(198,205,218,0.92)", borderColor: "rgba(198,205,218,1)" },
};

/** Platinum dot with a ring that trails behind it on a spring. The ring swells
 *  over links and turns into a "View" pill over project cards. Desktop only. */
export default function CursorFx() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<keyof typeof ring>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-fx");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor='view'], a, button");
      if (!el) setMode("default");
      else if (el.getAttribute("data-cursor") === "view") setMode("view");
      else setMode("hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-fx");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        animate={{ opacity: mode === "view" ? 0 : 1, scale: mode === "hover" ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
      />

      {/* Outer node carries the position; the inner one carries the size, so the
          ring stays centred on the cursor while it grows and shrinks. */}
      <motion.div
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-0 w-0"
      >
        <motion.div
          animate={ring[mode]}
          initial={false}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        >
          <motion.span
            animate={{ opacity: mode === "view" ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] font-semibold uppercase tracking-widest text-background"
          >
            View
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
