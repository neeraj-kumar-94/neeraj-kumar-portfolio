"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { projects } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 60;

// Resting pose of each deck card by its distance behind the active one.
// Offsets stay small so the stack never pokes past a phone's edge.
const stackPose = [
  { x: 0, y: 0, r: 0, s: 1, o: 1 },
  { x: 14, y: 14, r: 3, s: 0.94, o: 0.6 },
  { x: 24, y: 26, r: 6, s: 0.88, o: 0.3 },
];
const hiddenPose = { x: 30, y: 34, r: 8, s: 0.84, o: 0 };

/** Swipeable project deck for phones and tablets — same interaction as the testimonials. */
function ProjectDeck() {
  const n = projects.length;
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const pointerId = useRef<number | null>(null);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = regionRef.current;
    if (!el) return;
    // Autoplay only while the deck is on screen (never on desktop, where it's hidden)
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Restarts on every slide change so the timer stays in sync with the progress bar
  useEffect(() => {
    if (!inView || dragging || reduced) return;
    const timer = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, inView, dragging, reduced, go]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    pointerId.current = e.pointerId;
    startX.current = e.clientX;
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // pointer capture is a nice-to-have; ignore unsupported pointers
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || pointerId.current !== e.pointerId) return;
    setDragX(e.clientX - startX.current);
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || pointerId.current !== e.pointerId) return;
    const moved = e.clientX - startX.current;
    pointerId.current = null;
    setDragging(false);
    setDragX(0);
    if (moved <= -SWIPE_THRESHOLD) go(1);
    else if (moved >= SWIPE_THRESHOLD) go(-1);
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`mx-auto max-w-md touch-pan-y select-none rounded-[1.5rem] outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="relative aspect-[4/3]">
          {projects.map((project, i) => {
            const offset = (i - index + n) % n;
            const pose = stackPose[offset] ?? hiddenPose;
            const isTop = offset === 0;
            const x = isTop ? dragX : pose.x;
            const rotate = isTop ? dragX * 0.04 : pose.r;
            return (
              <div
                key={project.title}
                aria-hidden={!isTop}
                className="absolute inset-0 overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]"
                style={{
                  zIndex: n - offset,
                  opacity: pose.o,
                  transform: `translate3d(${x}px, ${pose.y}px, 0) rotate(${rotate}deg) scale(${pose.s})`,
                  transition:
                    dragging && isTop
                      ? "none"
                      : "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease",
                }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} mockup`}
                  fill
                  draggable={false}
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Details of the card on top */}
      <div key={index} className="p-quote-in mx-auto mt-12 max-w-md" aria-live="polite">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
          {active.subtitle}
        </p>
        <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">{active.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-muted/70">Outcome</span>
          {active.result}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {active.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] font-medium tracking-wide text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={active.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-accent"
        >
          Visit Live Site
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
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
                  <span
                    key={index}
                    className={`absolute inset-0 origin-left bg-accent ${progressRunning ? "slider-progress" : ""}`}
                    style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-accent hover:bg-accent hover:text-background"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next project"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-all hover:border-accent hover:bg-accent hover:text-background"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/** Horizontal scroll-driven work section (desktop) — cards slide sideways
 *  as the page scrolls vertically. On smaller screens it becomes a swipeable
 *  card deck, like the testimonials. */
export default function Projects() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let active = false;

    const measure = () => {
      active = window.innerWidth >= 1024;
      if (active) {
        const travel = track.scrollWidth - window.innerWidth;
        outer.style.height = `${window.innerHeight + travel}px`;
      } else {
        outer.style.height = "";
        track.style.transform = "";
      }
    };

    const update = () => {
      if (!active) return;
      const rect = outer.getBoundingClientRect();
      const travel = track.scrollWidth - window.innerWidth;
      const total = outer.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / Math.max(total, 1), 0), 1);
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
      <div ref={outerRef} className="relative hidden lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-row gap-10 pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-24 will-change-transform"
          >
            {projects.map((project, i) => (
              <Reveal key={project.title} variant="up" delay={(i % 2) * 80} className="shrink-0">
                <article className="group relative w-[30vw] max-w-[440px] shrink-0">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    aria-label={`Visit ${project.title}`}
                    className="relative block overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_24px_80px_-35px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_32px_90px_-34px_rgba(198,205,218,0.22)]"
                  >
                    <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-background">
                      <Image
                        src={project.image}
                        alt={`${project.title} mockup`}
                        fill
                        sizes="440px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/10" />

                    <span className="absolute bottom-4 right-4 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-background/70 text-accent backdrop-blur-md transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-background">
                      <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </span>
                  </a>

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
                </article>
              </Reveal>
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
          </div>
        </div>
      </div>
    </section>
  );
}
