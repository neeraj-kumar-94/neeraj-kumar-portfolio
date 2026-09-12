"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { skillGroups } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

const details: Record<string, { blurb: string; icon: ReactNode }> = {
  "Web Development": {
    blurb: "Semantic, accessible markup and clean, scalable styling.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    ),
  },
  "Frameworks & CMS": {
    blurb: "Custom WordPress themes, Shopify storefronts and modern React interfaces.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
      />
    ),
  },
  "Tools & Integrations": {
    blurb: "CRMs, payments and marketing tools wired in end to end.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085"
      />
    ),
  },
  "Design & Optimization": {
    blurb: "Pixel-perfect builds that load fast and rank well.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
      />
    ),
  },
};

// Bento rhythm: wide + narrow on the first row, narrow + wide on the second
const spans = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];
const variants = ["left", "right", "left", "right"] as const;

/** Moves the card's spotlight to follow the cursor (read via --x / --y in CSS). */
const trackSpotlight = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

export default function PSkills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle label="Expertise" />

        <div className="grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const detail = details[group.title];
            return (
              <Reveal
                key={group.title}
                variant={variants[i % variants.length]}
                delay={(i % 2) * 120}
                className={spans[i % spans.length]}
              >
                <div
                  onMouseMove={trackSpotlight}
                  className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/60 p-7 backdrop-blur transition-colors duration-500 hover:border-accent/40 sm:p-9"
                >
                  {/* Cursor spotlight */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(198,205,218,0.10), transparent 60%)",
                    }}
                  />

                  {/* Oversized watermark icon */}
                  {detail && (
                    <svg
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-accent/[0.05] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={0.8}
                    >
                      {detail.icon}
                    </svg>
                  )}

                  <div className="relative">
                    {detail && (
                      <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/60 text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-background">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                          {detail.icon}
                        </svg>
                      </span>
                    )}

                    <h3 className="font-serif text-2xl font-semibold text-foreground sm:text-[1.75rem]">
                      {group.title}
                    </h3>
                    {detail && (
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{detail.blurb}</p>
                    )}

                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {group.skills.map((skill, j) => (
                        <span
                          key={skill}
                          className="pop rounded-full border border-border bg-background/50 px-4 py-1.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
                          style={{ "--pop-delay": `${0.15 + j * 0.05}s` } as CSSProperties}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
