"use client";

import { useEffect, useState } from "react";

/** One-time intro: name reveals letter by letter, then the curtain lifts. */
export default function Loader() {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    const t1 = setTimeout(() => setPhase("exit"), 1500);
    const t2 = setTimeout(() => setPhase("done"), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-background transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: phase === "exit" ? "translateY(-100%)" : "translateY(0)" }}
      aria-hidden="true"
    >
      <p className="font-serif text-3xl font-semibold uppercase tracking-[0.2em] text-foreground sm:text-5xl">
        {"Neeraj Kumar".split("").map((ch, i) => (
          <span key={i} className="word-mask">
            <span
              className="word-hero"
              style={{ animationDelay: `${0.05 + i * 0.045}s`, animationDuration: "0.6s" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          </span>
        ))}
        <span className="ml-2 text-accent">.</span>
      </p>
    </div>
  );
}
