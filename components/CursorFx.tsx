"use client";

import { useEffect, useRef, useState } from "react";

/** Custom cursor: gold dot + trailing ring. Grows on links/buttons,
 *  shows "View" over elements marked data-cursor="view". Desktop only. */
export default function CursorFx() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "hover" | "view">("default");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-fx");

    let tx = -100, ty = -100; // target
    let rx = -100, ry = -100; // ring (lerped)
    let frame: number;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor='view'], a, button");
      if (!el) setMode("default");
      else if (el.getAttribute("data-cursor") === "view") setMode("view");
      else setMode("hover");
    };

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("cursor-fx");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent transition-opacity duration-200 ${
          mode === "view" ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full transition-[width,height,margin,background-color,border-color] duration-300 ${
          mode === "view"
            ? "-ml-9 -mt-9 h-18 w-18 border border-accent bg-accent/90"
            : mode === "hover"
              ? "-ml-6 -mt-6 h-12 w-12 border border-accent/70 bg-accent/10"
              : "-ml-4 -mt-4 h-8 w-8 border border-accent/50 bg-transparent"
        }`}
      >
        <span
          className={`text-[11px] font-semibold uppercase tracking-widest text-white transition-opacity duration-200 ${
            mode === "view" ? "opacity-100" : "opacity-0"
          }`}
        >
          View
        </span>
      </div>
    </>
  );
}
