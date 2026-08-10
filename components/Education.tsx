import type { CSSProperties } from "react";
import { education, highlights } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-20 overflow-hidden bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal variant="zoom">
          <SectionHeading eyebrow="Background" title="Education & Highlights" />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Education cards — slide in from the left */}
          <div className="space-y-6">
            {education.map((item, i) => (
              <Reveal key={item.degree} delay={i * 140} variant="left">
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl">
                  <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-accent to-accent/30 transition-transform duration-500 group-hover:scale-y-100" />

                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="mb-1 text-sm font-medium uppercase tracking-wider text-accent">
                        {item.period}
                      </p>
                      <h3 className="font-serif text-xl font-semibold transition-colors group-hover:text-accent">
                        {item.degree}
                      </h3>
                      <p className="mb-3 font-medium text-muted">{item.institution}</p>
                      <p className="text-sm leading-relaxed text-muted">{item.detail}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Highlights — slides in from the right, items pop in staggered */}
          <Reveal delay={120} variant="right">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-xl">
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent/30 transition-transform duration-500 group-hover:scale-x-100" />

              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </span>
                <h3 className="font-serif text-xl font-semibold">Quick Highlights</h3>
              </div>

              <ul className="space-y-4">
                {highlights.map((item, i) => (
                  <li
                    key={item}
                    className="pop flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 leading-relaxed text-muted transition-all duration-300 hover:translate-x-1 hover:border-accent/40 hover:text-foreground"
                    style={{ "--pop-delay": `${0.25 + i * 0.12}s` } as CSSProperties}
                  >
                    <svg
                      className="h-5 w-5 shrink-0 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
