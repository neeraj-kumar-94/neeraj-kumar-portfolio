"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { mentors } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

export default function PQuotes() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % mentors.length), 6000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section id="mentors" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36">
      <div className="p-glow pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] max-w-[100vw] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-5xl px-6">
        <PSectionTitle num="05" label="Kind Words" />

        <Reveal variant="zoom">
          <div
            className="relative min-h-[320px] text-center sm:min-h-[280px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {mentors.map((mentor, i) => (
              <figure
                key={mentor.name}
                className="absolute inset-0 flex flex-col items-center justify-start transition-all duration-700"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform: i === index ? "translateY(0)" : "translateY(24px)",
                  pointerEvents: i === index ? "auto" : "none",
                }}
              >
                <blockquote className="mx-auto max-w-3xl font-serif text-xl leading-relaxed text-foreground sm:text-2xl">
                  “{mentor.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full border border-accent/40">
                    <Image src={mentor.image} alt={mentor.name} fill sizes="48px" className="object-cover" />
                  </span>
                  <span className="text-left">
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-semibold text-accent hover:text-accent-dark"
                    >
                      {mentor.name}
                    </a>
                    <span className="text-xs text-muted">{mentor.title}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2.5">
            {mentors.map((mentor, i) => (
              <button
                key={mentor.name}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-10 bg-accent" : "w-4 bg-border hover:bg-accent/40"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
