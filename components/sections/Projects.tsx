"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { caseStudies, projects, slugify } from "@/lib/data";
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

const studySlugs = new Set(caseStudies.map((c) => c.slug));
/** Three projects have a written case study; the rest link straight to the live site. */
const studyFor = (title: string) => {
  const slug = slugify(title);
  return studySlugs.has(slug) ? slug : null;
};

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
        className="mx-auto max-w-md select-none rounded-[1.5rem] outline-none focus-visible:ring-2 focus-visible:ring-signal/40"
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
            <p className="mb-1.5 meta meta-sm text-accent">
              {active.subtitle}
            </p>
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">{active.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              <span className="meta meta-sm mr-2 text-muted/70">Outcome</span>
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
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
              {studyFor(active.title) && (
                <Link
                  href={`/work/${studyFor(active.title)}`}
                  className="group inline-flex items-center gap-2 meta text-signal"
                >
                  Read case study
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              )}
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline meta text-muted"
              >
                Visit live site
              </a>
            </div>
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-signal hover:bg-signal hover:text-background"
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

/** Work as a studio index (desktop): the projects read as a list of names and
 *  the preview on the right swaps to whichever one you are pointing at. It
 *  scans far faster than a row of cards, and it gives the section its own
 *  character. Phones keep the swipeable deck. */
export default function Projects() {
  const [hovered, setHovered] = useState(0);
  const active = projects[hovered];
  const activeSlug = studyFor(active.title);

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle label="Selected Work" tag="Index of projects" meta="Hover to preview · Click to open" />
      </div>

      {/* Phones & tablets: swipeable deck */}
      <Reveal variant="up" className="lg:hidden">
        <ProjectDeck />
      </Reveal>

      {/* Desktop: the index */}
      <div className="mx-auto hidden max-w-7xl px-6 lg:block">
        <div className="grid grid-cols-[1.05fr_0.95fr] gap-16">
          <ul onMouseLeave={() => setHovered(0)}>
            {projects.map((project, i) => {
              const slug = studyFor(project.title);
              const isOn = hovered === i;
              return (
                <motion.li
                  key={project.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease }}
                  onMouseEnter={() => setHovered(i)}
                  className="border-b border-border first:border-t"
                >
                  <a
                    href={slug ? `/work/${slug}` : project.liveUrl}
                    {...(slug ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    onFocus={() => setHovered(i)}
                    data-cursor="view"
                    className="group flex items-baseline gap-6 py-7"
                  >
                    <motion.span
                      animate={{ x: isOn ? 10 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      className="min-w-0 flex-1"
                    >
                      <span className="meta meta-sm block text-muted transition-colors group-hover:text-signal">
                        {project.subtitle}
                      </span>
                      <span
                        className={`mt-2 block font-serif text-3xl leading-tight transition-colors duration-300 xl:text-[2.6rem] ${
                          isOn ? "text-foreground" : "text-foreground/55"
                        }`}
                      >
                        {project.title}
                      </span>
                    </motion.span>

                    {slug && <span className="meta meta-sm shrink-0 text-signal">Case study</span>}

                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: isOn ? 1 : 0.25, x: isOn ? 0 : -6 }}
                      className="shrink-0 text-signal"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </motion.span>
                  </a>
                </motion.li>
              );
            })}
          </ul>

          {/* Preview — follows the pointer down the list */}
          <Reveal variant="right" amount={0.1}>
            <div className="sticky top-28">
              {/* Every preview is mounted and cross-faded with a plain CSS
                  transition. Swapping through mount/unmount would tie the
                  interaction to the animation frameloop, which stalls whenever
                  the tab is in the background. */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-border bg-card">
                {projects.map((project, i) => (
                  <div
                    key={project.title}
                    aria-hidden={i !== hovered}
                    className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                      i === hovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} mockup`}
                      fill
                      sizes="620px"
                      className="object-cover"
                    />
                  </div>
                ))}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
              </div>

              <div className="mt-6">
                  <p className="measure text-[15px] leading-relaxed text-muted">
                    <span className="meta meta-sm mr-3 text-muted/70">Outcome</span>
                    {active.result}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.tech.map((tech) => (
                      <span key={tech} className="meta meta-sm rounded-full border border-border px-3 py-1 text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                    {activeSlug && (
                      <Link href={`/work/${activeSlug}`} className="meta text-signal">
                        Read case study →
                      </Link>
                    )}
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline meta text-muted"
                    >
                      Visit live site
                    </a>
                  </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

