"use client";

import { useEffect } from "react";

/** Makes every element with the `magnetic` class gently pull toward the cursor. */
export default function MagneticFx() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const cleanups = els.map((el) => {
      const strength = 0.3;
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };
      el.classList.add("magnetic-ready");
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
