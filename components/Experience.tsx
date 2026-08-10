import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-card py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Career" title="Work Experience" />
        </Reveal>

        <div className="relative">
          {/* Vertical line — center on desktop, left on mobile */}
          <span className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-accent via-accent/40 to-border md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-20">
            {experience.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={`${job.role}-${job.company}`} delay={i * 100}>
                  <div className="relative md:grid md:grid-cols-2 md:gap-16">
                    {/* Dot */}
                    <span className="timeline-dot absolute left-0 top-2 h-4 w-4 rounded-full border-[3px] border-accent bg-card md:left-1/2 md:-translate-x-1/2" />

                    {/* Period label — opposite side on desktop */}
                    <div
                      className={`hidden md:flex md:items-start ${
                        left ? "md:order-2 md:justify-start" : "md:order-1 md:justify-end"
                      }`}
                    >
                      <span className="mt-1 rounded-full border border-accent/30 bg-background px-5 py-2 text-sm font-semibold tracking-wide text-accent">
                        {job.period}
                      </span>
                    </div>

                    {/* Card */}
                    <div className={`pl-10 md:pl-0 ${left ? "md:order-1" : "md:order-2"}`}>
                      <div className="rounded-2xl border border-border bg-background p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl">
                        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-accent md:hidden">
                          {job.period}
                        </p>
                        <h3 className="font-serif text-2xl font-semibold">{job.role}</h3>
                        <p className="mb-4 font-medium text-muted">
                          {job.company} · <span className="font-normal">{job.location}</span>
                        </p>
                        <ul className="space-y-2.5">
                          {job.points.map((point) => (
                            <li
                              key={point.slice(0, 32)}
                              className="flex gap-3 text-[15px] leading-relaxed text-muted"
                            >
                              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
