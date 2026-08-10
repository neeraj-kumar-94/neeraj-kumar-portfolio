"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { mentors } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const AUTOPLAY_MS = 6000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + mentors.length) % mentors.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, go]);

  return (
    <section id="mentors" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="What Mentors Say" />
        </Reveal>

        <Reveal delay={80}>
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {mentors.map((mentor) => (
                <figure
                  key={mentor.name}
                  className="grid w-full shrink-0 items-center gap-10 px-2 py-4 md:grid-cols-[minmax(0,300px)_1fr] md:gap-14"
                >
                  {/* Photo */}
                  <div className="relative mx-auto w-56 md:w-full md:max-w-[300px]">
                    <div className="absolute inset-0 -translate-x-3 translate-y-3 rounded-2xl bg-accent/15" />
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-border shadow-xl">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        sizes="300px"
                        className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      />
                    </div>
                  </div>

                  {/* Quote */}
                  <div>
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2"
                    >
                      <span className="font-serif text-2xl font-semibold text-accent transition-colors group-hover:text-accent-dark">
                        {mentor.name}
                      </span>
                      <svg
                        className="h-4 w-4 text-muted transition-colors group-hover:text-accent"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                      </svg>
                    </a>
                    <p className="mb-6 mt-0.5 text-sm text-muted">{mentor.title}</p>
                    <blockquote className="text-lg leading-relaxed text-muted">
                      {mentor.quote}
                    </blockquote>
                  </div>
                </figure>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
