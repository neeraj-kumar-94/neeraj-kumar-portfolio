"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type PanInfo,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { projects } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

const AUTOPLAY_MS = 6000;
const ease = [0.16, 1, 0.3, 1] as const;

// Resting pose of each deck card by its distance behind the active one.
// Offsets stay small so the stack never pokes past a phone's edge.
const stackPose = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 14, y: 14, rotate: 3, scale: 0.94, opacity: 0.6 },
  { x: 24, y: 26, rotate: 6, scale: 0.88, opacity: 0.3 },
];
const hiddenPose = { x: 30, y: 34, rotate: 8, scale: 0.84, opacity: 0 };

/** Swipeable project deck for phones and tablets — same interaction as the testimonials. */
function ProjectDeck() {
  const n = projects.length;
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  // Autoplay only while the deck is on screen (never on desktop, where it's hidden)
  const inView = useInView(regionRef, { amount: 0.4 });

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n]);

  useEffect(() => {
    if (!inView || dragging || reduced) return;
    const timer = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, inView, dragging, reduced, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    const throw_ = info.offset.x + info.velocity.x * 0.12;
    if (throw_ < -60) go(1);
    else if (throw_ > 60) go(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };

  const active = projects[index];
  const progressRunning = inView && !dragging && !reduced;

  return (
    <div className="px-6">
      <div
        ref={regionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mx-auto max-w-md select-none rounded-[1.5rem] outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <div className="relative aspect-[4/3]">
          {projects.map((project, i) => {
            const offset = (i - index + n) % n;
            const pose = stackPose[offset] ?? hiddenPose;
            const isTop = offset === 0;
            return (
              <motion.div
                key={project.title}
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
                className={`absolute inset-0 touch-pan-y overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] ${
                  isTop ? "cursor-grab" : ""
                }`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} mockup`}
                  fill
                  draggable={false}
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Details of the card on top */}
      <div className="mx-auto mt-12 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease }}
            aria-live="polite"
          >
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
              {active.subtitle}
            </p>
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">{active.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-muted/70">Outcome</span>
              {active.result}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {active.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease }}
                  className="rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] font-medium tracking-wide text-muted"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <a
              href={active.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent"
            >
              Visit Live Site
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mx-auto mt-10 flex max-w-md items-center gap-5">
        <div className="flex flex-1 items-center gap-1.5">
          {projects.map((project, i) => (
            <button
              key={project.title}
              onClick={() => setIndex(i)}
              aria-label={`Show ${project.title}`}
              className="group/bar flex-1 py-3"
            >
              <span className="relative block h-[3px] overflow-hidden rounded-full bg-border transition-colors group-hover/bar:bg-accent/30">
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-0 origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: progressRunning ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
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
              aria-label={dir === -1 ? "Previous project" : "Next project"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-background"
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
  );
}

/** Horizontal scroll-driven work section (desktop) — cards slide sideways as
 *  the page scrolls vertically. Smaller screens get the swipeable deck. */
export default function Projects() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const reduced = useReducedMotion();

  // The section is as tall as the sideways distance the track has to cover
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const wide = window.innerWidth >= 1024;
      setTravel(wide ? Math.max(track.scrollWidth - window.innerWidth, 0) : 0);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -travel]), {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle label="Selected Work" />
      </div>

      {/* Phones & tablets: swipeable deck */}
      <Reveal variant="up" className="lg:hidden">
        <ProjectDeck />
      </Reveal>

      {/* Desktop: horizontal scroll-driven track */}
      <div
        ref={outerRef}
        className="relative hidden lg:block"
        style={{ height: travel ? `calc(100vh + ${travel}px)` : undefined }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x: reduced ? 0 : x }}
            className="flex flex-row gap-10 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-24"
          >
            {projects.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: (i % 2) * 0.08, ease }}
                className="group relative w-[30vw] max-w-[440px] shrink-0"
              >
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  aria-label={`Visit ${project.title}`}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="relative block overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_24px_80px_-35px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-accent/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-background">
                    <motion.div
                      initial={{ scale: 1.25 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 1.5, ease }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} mockup`}
                        fill
                        sizes="440px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </motion.div>
                  </div>
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/10" />

                  <span className="absolute bottom-4 right-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-background/70 text-accent backdrop-blur-md transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-background">
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </motion.a>

                <div className="mt-5 px-1">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                    {project.subtitle}
                  </p>
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">
                    <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-muted/70">Outcome</span>
                    {project.result}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] font-medium tracking-wide text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}

            {/* End card */}
            <div className="flex w-[26vw] shrink-0 items-center">
              <a href="#contact" className="magnetic group/end block">
                <span className="p-outline font-serif text-5xl font-semibold leading-tight">
                  Your project
                  <br />
                  next?
                </span>
                <span className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-accent">
                  Let&apos;s talk →
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
