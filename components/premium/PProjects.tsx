"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

/** Horizontal scroll-driven work section (desktop) — cards slide sideways
 *  as the page scrolls vertically. Falls back to a vertical list on mobile. */
export default function PProjects() {
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
        <PSectionTitle num="03" label="Selected Work" />
      </div>

      <div ref={outerRef} className="relative">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col gap-16 px-6 will-change-transform lg:flex-row lg:gap-10 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-24"
          >
            {projects.map((project, i) => (
              <Reveal key={project.title} variant="up" delay={(i % 2) * 80} className="shrink-0">
                <article className="group relative w-full shrink-0 lg:w-[62vw] lg:max-w-[880px]">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    aria-label={`Visit ${project.title}`}
                    className="relative block overflow-hidden rounded-3xl border border-border"
                  >
                    <div className="img-zoom relative aspect-[16/10]">
                      <Image
                        src={project.image}
                        alt={`${project.title} mockup`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 62vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                    {/* Overlay copy */}
                    <div className="absolute inset-x-0 bottom-0 z-[2] p-6 sm:p-9">
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="min-w-0">
                          <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
                            {project.subtitle}
                          </p>
                          <h3 className="font-serif text-2xl font-semibold text-foreground sm:text-4xl">
                            {project.title}
                          </h3>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                            {project.result}
                          </p>
                        </div>
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/60 bg-background/50 text-accent backdrop-blur transition-all duration-300 group-hover:bg-accent group-hover:text-background">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <span className="p-outline pointer-events-none absolute right-6 top-4 z-[2] font-serif text-6xl font-semibold sm:text-7xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </a>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="rounded-full border border-border px-3.5 py-1 text-xs font-medium text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}

            {/* End card */}
            <div className="hidden shrink-0 items-center lg:flex lg:w-[26vw]">
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
