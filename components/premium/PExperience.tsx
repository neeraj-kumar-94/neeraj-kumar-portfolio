"use client";

import { useEffect, useRef } from "react";
import { education, experience } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

/** Career timeline whose spine draws itself as you scroll (scroll-linked). */
export default function PExperience() {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (fillRef.current) fillRef.current.style.height = "100%";
      return;
    }
    let frame = 0;
    const update = () => {
      const list = listRef.current;
      const fill = fillRef.current;
      if (!list || !fill) return;
      const rect = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.65;
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      fill.style.height = `${(progress * 100).toFixed(2)}%`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const items = [
    ...experience.map((job) => ({
      type: "Work",
      title: job.role,
      org: `${job.company} · ${job.location}`,
      period: job.period,
      points: job.points.slice(0, 3),
    })),
    ...education.map((item) => ({
      type: "Education",
      title: item.degree,
      org: item.institution,
      period: item.period,
      points: [item.detail],
    })),
  ];

  return (
    <section id="experience" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <PSectionTitle num="04" label="The Journey" />

        <div ref={listRef} className="relative pl-10 sm:pl-16">
          {/* Spine — track + scroll-linked fill */}
          <span className="absolute left-[7px] top-0 h-full w-px bg-border sm:left-[11px]" />
          <span
            ref={fillRef}
            className="absolute left-[6.5px] top-0 w-[2px] bg-gradient-to-b from-accent via-accent to-accent/40 shadow-[0_0_12px_rgba(198,205,218,0.5)] sm:left-[10.5px]"
            style={{ height: "0%" }}
          />

          <div className="space-y-14 sm:space-y-20">
            {items.map((item, i) => (
              <Reveal key={item.title} variant={i % 2 === 0 ? "left" : "right"} delay={60}>
                <div className="relative">
                  <span className="absolute -left-10 top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background sm:-left-16 sm:h-4 sm:w-4" />
                  <p className="mb-1 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-accent/30 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                      {item.type}
                    </span>
                    <span className="text-sm font-medium text-muted">{item.period}</span>
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.org}</p>
                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li key={point.slice(0, 32)} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
