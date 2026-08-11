import type { CSSProperties } from "react";
import { education, highlights } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-20 overflow-hidden bg-card py-24">
      {/* Ambient background accents */}
      <div
        className="animate-float pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />
      <div
        className="animate-float-delayed pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal variant="zoom">
          <SectionHeading eyebrow="Background" title="Education & Highlights" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* ── Education timeline ─────────────────────────── */}
          <div>
            <Reveal variant="left">
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-background px-5 py-2">
                <svg
                  className="h-4.5 w-4.5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                <span className="text-sm font-semibold tracking-wide text-foreground">
                  Education
                </span>
              </div>
            </Reveal>

            <div className="relative space-y-8 pl-8">
              {/* Timeline line */}
              <span className="absolute left-[9px] top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-accent via-accent/40 to-transparent" />

              {education.map((item, i) => (
                <Reveal key={item.degree} delay={i * 140} variant="left">
                  <div className="relative">
                    {/* Timeline dot */}
                    <span className="timeline-dot absolute -left-[27px] top-7 h-3.5 w-3.5 rounded-full border-2 border-accent bg-card" />

                    {/* Gradient-border card */}
                    <div className="group rounded-2xl bg-gradient-to-br from-accent/40 via-border to-border p-px transition-all duration-300 hover:-translate-y-1 hover:from-accent hover:shadow-xl hover:shadow-accent/10">
                      <div className="rounded-[calc(1rem-1px)] bg-background p-7">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                            {item.period}
                          </span>
                          <span className="font-serif text-2xl font-semibold text-border transition-colors duration-300 group-hover:text-accent/40">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold transition-colors group-hover:text-accent">
                          {item.degree}
                        </h3>
                        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-muted">
                          <svg
                            className="h-4 w-4 shrink-0 text-accent/70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.6}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>
                          {item.institution}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── Career highlights ──────────────────────────── */}
          <div>
            <Reveal variant="right">
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-background px-5 py-2">
                <svg
                  className="h-4.5 w-4.5 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                  />
                </svg>
                <span className="text-sm font-semibold tracking-wide text-foreground">
                  Career Highlights
                </span>
              </div>
            </Reveal>

            <Reveal delay={120} variant="right">
              <div className="rounded-2xl bg-gradient-to-br from-accent/40 via-border to-border p-px">
                <div className="rounded-[calc(1rem-1px)] bg-background p-3 sm:p-4">
                  <ul className="divide-y divide-border">
                    {highlights.map((item, i) => (
                      <li
                        key={item}
                        className="pop group flex items-center gap-5 rounded-xl px-4 py-5 transition-all duration-300 hover:bg-accent/5 sm:px-5"
                        style={{ "--pop-delay": `${0.25 + i * 0.13}s` } as CSSProperties}
                      >
                        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                          <span className="absolute inset-0 rounded-xl bg-accent/10 transition-all duration-300 group-hover:rotate-6 group-hover:bg-accent" />
                          <span className="relative font-serif text-lg font-semibold text-accent transition-colors duration-300 group-hover:text-white">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </span>
                        <p className="text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
