"use client";

import { animate } from "motion/react";
import { useEffect } from "react";

/** Every element with the `magnetic` class leans toward the cursor and springs
 *  back when it leaves. Pointer-driven, so desktop only. */
export default function MagneticFx() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));

    const cleanups = els.map((el) => {
      const strength = 0.32;

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
        animate(el, { x, y }, { type: "spring", stiffness: 220, damping: 18, mass: 0.4 });
      };

      const onLeave = () => {
        animate(el, { x: 0, y: 0 }, { type: "spring", stiffness: 180, damping: 14, mass: 0.6 });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
