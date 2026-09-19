"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { mentors } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

const AUTOPLAY_MS = 7000;
const ease = [0.16, 1, 0.3, 1] as const;

// Resting pose of each card by its distance behind the active one
const stackPose = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 22, y: 16, rotate: 5, scale: 0.94, opacity: 0.55 },
  { x: 40, y: 30, rotate: 10, scale: 0.88, opacity: 0.25 },
];
const hiddenPose = { x: 50, y: 40, rotate: 12, scale: 0.84, opacity: 0 };

export default function Mentors() {
  const n = mentors.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  // The hint has done its job once someone drags; it fades out for good
  const [hasDragged, setHasDragged] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n]);

  // Restarts on every slide change so the timer stays in sync with the progress bar
  useEffect(() => {
    if (paused || dragging || reduced) return;
    const timer = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, dragging, reduced, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    setHasDragged(true);
    // A short flick counts as much as a long drag
    const throw_ = info.offset.x + info.velocity.x * 0.12;
    if (throw_ < -70) go(1);
    else if (throw_ > 70) go(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };

  const active = mentors[index];
  const progressRunning = !paused && !dragging && !reduced;

  return (
    <section id="mentors" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle label="What Mentors Say" />

        <Reveal variant="up">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="grid select-none grid-cols-1 items-center gap-6 rounded-[2rem] outline-none focus-visible:ring-2 focus-visible:ring-signal/40 sm:gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-stretch lg:gap-20"
          >
            {/* Photo deck */}
            <div className="group relative mx-auto w-full max-w-[300px] lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-12"
                style={{
                  background:
                    "radial-gradient(ellipse at 45% 50%, color-mix(in srgb, var(--accent) 10%, transparent) 0%, transparent 65%)",
                }}
              />
              <div className="relative aspect-[4/5]">
                {mentors.map((mentor, i) => {
                  const offset = (i - index + n) % n;
                  const pose = stackPose[offset] ?? hiddenPose;
                  const isTop = offset === 0;
                  return (
                    <motion.div
                      key={mentor.name}
                      aria-hidden={!isTop}
                      animate={pose}
                      initial={false}
                      transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
                      style={{ zIndex: n - offset }}
                      drag={isTop ? "x" : false}
                      dragSnapToOrigin
                      dragElastic={0.22}
                      dragMomentum={false}
                      onDragStart={() => setDragging(true)}
                      onDragEnd={onDragEnd}
                      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
                      className={`absolute inset-0 touch-pan-y overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] ${
                        isTop ? "cursor-grab" : ""
                      }`}
                    >
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        draggable={false}
                        sizes="(max-width: 1024px) 300px, 420px"
                        className={`object-cover object-top grayscale transition-[filter] duration-700 ${
                          isTop ? "group-hover:grayscale-0" : ""
                        }`}
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                    </motion.div>
                  );
                })}
              </div>
              <motion.p
                animate={{ opacity: hasDragged ? 0 : 1, y: hasDragged ? -6 : 0 }}
                transition={{ duration: 0.5, ease }}
                className="mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted sm:mt-10"
              >
                Drag or swipe to browse
              </motion.p>
            </div>

            {/* Quote */}
            <div className="flex min-w-0 flex-col lg:py-4">
              <svg className="mb-3 h-7 w-7 text-accent/30 sm:mb-6 sm:h-11 sm:w-11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9.583 17.321C8.553 16.227 8 15 8 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm-8 0C.553 16.227 0 15 0 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease }}
                  aria-live="polite"
                >
                  <blockquote className="font-serif text-xl leading-relaxed text-foreground sm:text-2xl lg:text-[1.65rem] lg:leading-[1.55]">
                    {active.quote}
                  </blockquote>
                  <motion.div
                    className="mt-8 flex items-center gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14, duration: 0.5, ease }}
                  >
                    <span className="h-px w-10 bg-accent" />
                    <div>
                      <a
                        href={active.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-foreground transition-colors hover:text-signal"
                      >
                        {active.name}
                        <svg className="h-3.5 w-3.5 text-muted" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                        </svg>
                      </a>
                      <p className="text-sm text-muted">{active.title}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="mt-12 flex items-center gap-6 lg:mt-auto lg:pt-10">
                <div className="flex flex-1 items-center gap-2">
                  {mentors.map((mentor, i) => (
                    <button
                      key={mentor.name}
                      onClick={() => setIndex(i)}
                      aria-label={`Show testimonial from ${mentor.name}`}
                      className="group/bar flex-1 py-3"
                    >
                      <span className="relative block h-[3px] overflow-hidden rounded-full bg-border transition-colors group-hover/bar:bg-accent/30">
                        {i === index && (
                          <motion.span
                            key={index}
                            className="absolute inset-0 origin-left bg-accent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: progressRunning ? AUTOPLAY_MS / 1000 : 0,
                              ease: "linear",
                            }}
                          />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  {[-1, 1].map((dir) => (
                    <motion.button
                      key={dir}
                      onClick={() => go(dir)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      aria-label={dir === -1 ? "Previous testimonial" : "Next testimonial"}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-signal hover:bg-signal hover:text-background"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={dir === -1 ? "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" : "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"}
                        />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
