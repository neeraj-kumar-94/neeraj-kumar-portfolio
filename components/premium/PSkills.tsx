"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { skillGroups } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

// Cursor-following preview image per row (classic agency-site pattern)
const previews = [
  "/projects/pride-justice.jpg",
  "/projects/brunswick.jpg",
  "/projects/bnps.jpg",
  "/projects/vvn.jpg",
];

export default function PSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, y = 0, frame: number;

    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const loop = () => {
      x += (target.current.x - x) * 0.12;
      y += (target.current.y - y) * 0.12;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${x + 30}px, ${y - 90}px, 0) rotate(3deg)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const el = containerRef.current;
    el?.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el?.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section id="skills" className="scroll-mt-24 py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle label="Expertise" />

        <div ref={containerRef} className="relative border-t border-border">
          {/* Floating preview (desktop only) */}
          <div
            ref={previewRef}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden w-72 overflow-hidden rounded-2xl border border-border shadow-2xl transition-opacity duration-300 lg:block"
            style={{ opacity: preview === null ? 0 : 1 }}
          >
            <div className="relative aspect-[16/11] bg-card">
              {previews.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  sizes="288px"
                  className="object-cover transition-opacity duration-300"
                  style={{ opacity: preview === i ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          {skillGroups.map((group, i) => (
            <Reveal key={group.title} variant="up" delay={i * 60}>
              <div
                onMouseEnter={() => setPreview(i)}
                onMouseLeave={() => setPreview(null)}
                className="p-row grid gap-4 border-b border-border py-9 transition-colors duration-300 sm:grid-cols-[minmax(0,320px)_1fr] sm:items-center sm:gap-10"
              >
                <div className="relative">
                  <h3 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                    {group.title}
                  </h3>
                </div>
                <div className="relative flex flex-wrap gap-2.5">
                  {group.skills.map((skill, j) => (
                    <span
                      key={skill}
                      className="pop rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                      style={{ "--pop-delay": `${0.08 + j * 0.04}s` } as CSSProperties}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
