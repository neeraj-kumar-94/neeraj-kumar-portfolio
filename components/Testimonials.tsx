"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { mentors } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 60;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const pointerId = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + mentors.length) % mentors.length),
    []
  );

  useEffect(() => {
    if (paused || dragging) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, dragging, go]);

  const onPointerDown = (e: React.PointerEvent) => {
    // Let links and buttons work normally
    if ((e.target as HTMLElement).closest("a, button")) return;
    pointerId.current = e.pointerId;
    startX.current = e.clientX;
    setDragging(true);
    try {
      trackRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // pointer capture is a nice-to-have; ignore unsupported pointers
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || pointerId.current !== e.pointerId) return;
    setDragX(e.clientX - startX.current);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragging || pointerId.current !== e.pointerId) return;
    const moved = e.clientX - startX.current;
    setDragging(false);
    setDragX(0);
    pointerId.current = null;
    if (moved <= -SWIPE_THRESHOLD) go(1);
    else if (moved >= SWIPE_THRESHOLD) go(-1);
  };

  const width = trackRef.current?.offsetWidth || 1;
  const offsetPct = -index * 100 + (dragX / width) * 100;

  return (
    <section id="mentors" className="relative scroll-mt-20 overflow-hidden py-24">
      {/* Background accents */}
      <div
        className="animate-float pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal variant="zoom">
          <SectionHeading eyebrow="Testimonials" title="What Mentors Say" />
        </Reveal>

        <Reveal delay={100} variant="up">
          <div
            className="group/slider relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10 md:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Decorative big quote */}
            <svg
              className="pointer-events-none absolute -top-2 right-6 h-24 w-24 text-accent/10 sm:h-32 sm:w-32"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9.583 17.321C8.553 16.227 8 15 8 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm-8 0C.553 16.227 0 15 0 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>

            {/* Draggable track */}
            <div
              ref={trackRef}
              className={`touch-pan-y select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <div
                className="flex"
                style={{
                  transform: `translateX(${offsetPct}%)`,
                  transition: dragging
                    ? "none"
                    : "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {mentors.map((mentor, i) => {
                  const active = i === index;
                  return (
                    <figure
                      key={mentor.name}
                      className="grid w-full shrink-0 items-center gap-8 px-1 py-2 md:grid-cols-[minmax(0,280px)_1fr] md:gap-12"
                      style={{
                        opacity: dragging ? 1 : active ? 1 : 0.25,
                        transform: dragging ? "none" : active ? "scale(1)" : "scale(0.92)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                      }}
                    >
                      {/* Photo */}
                      <div className="relative mx-auto w-52 md:w-full md:max-w-[280px]">
                        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-accent/30 to-transparent" />
                        <div className="absolute inset-0 -translate-x-3 translate-y-3 rounded-2xl bg-accent/15" />
                        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border shadow-xl">
                          <Image
                            src={mentor.image}
                            alt={mentor.name}
                            fill
                            sizes="280px"
                            draggable={false}
                            className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                          />
                        </div>
                      </div>

                      {/* Quote */}
                      <div>
                        <blockquote className="mb-6 text-base leading-relaxed text-muted sm:text-lg">
                          {mentor.quote}
                        </blockquote>
                        <div className="flex items-center gap-4 border-t border-border pt-5">
                          <div>
                            <a
                              href={mentor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link inline-flex items-center gap-2"
                            >
                              <span className="font-serif text-xl font-semibold text-accent transition-colors group-hover/link:text-accent-dark">
                                {mentor.name}
                              </span>
                              <svg
                                className="h-4 w-4 text-muted transition-colors group-hover/link:text-accent"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                              </svg>
                            </a>
                            <p className="text-sm text-muted">{mentor.title}</p>
                          </div>
                          <span className="ml-auto hidden font-serif text-3xl font-semibold text-border sm:block">
                            {String(i + 1).padStart(2, "0")}
                            <span className="text-lg text-muted/50"> / {String(mentors.length).padStart(2, "0")}</span>
                          </span>
                        </div>
                      </div>
                    </figure>
                  );
                })}
              </div>
            </div>

            {/* Autoplay progress bar */}
            <span
              key={index}
              className={`absolute inset-x-0 bottom-0 h-1 origin-left bg-gradient-to-r from-accent to-accent/40 ${
                paused || dragging ? "hidden" : "slider-progress"
              }`}
            />
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>

            <div className="flex items-center gap-2.5">
              {mentors.map((mentor, i) => (
                <button
                  key={mentor.name}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-8 bg-accent" : "w-2 bg-border hover:bg-accent/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-muted/70 md:hidden">
            Swipe to see more
          </p>
        </Reveal>
      </div>
    </section>
  );
}
