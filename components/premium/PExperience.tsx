import { education, experience } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

export default function PExperience() {
  return (
    <section id="experience" className="scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle num="04" label="Experience & Education" />

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal variant="left">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Work Experience
              </p>
            </Reveal>
            <div className="border-t border-border">
              {experience.map((job, i) => (
                <Reveal key={job.company} variant="left" delay={i * 100}>
                  <div className="p-row border-b border-border py-8">
                    <div className="relative">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-serif text-2xl font-semibold text-foreground">
                          {job.role}
                        </h3>
                        <span className="text-sm font-medium text-accent">{job.period}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted">
                        {job.company} · {job.location}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {job.points.slice(0, 3).map((point) => (
                          <li key={point.slice(0, 32)} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal variant="right">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Education
              </p>
            </Reveal>
            <div className="border-t border-border">
              {education.map((item, i) => (
                <Reveal key={item.degree} variant="right" delay={i * 100}>
                  <div className="p-row border-b border-border py-8">
                    <div className="relative">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-serif text-2xl font-semibold text-foreground">
                          {item.degree}
                        </h3>
                        <span className="text-sm font-medium text-accent">{item.period}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted">{item.institution}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
