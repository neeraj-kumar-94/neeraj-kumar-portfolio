import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 bg-card py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Career" title="Work Experience" />
        </Reveal>

        <div className="relative space-y-12 border-l-2 border-border pl-8 sm:pl-12">
          {experience.map((job, i) => (
            <Reveal key={`${job.role}-${job.company}`} delay={i * 100}>
              <div className="relative">
                <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-background sm:-left-[57px]" />
                <p className="mb-1 text-sm font-medium uppercase tracking-wider text-accent">
                  {job.period}
                </p>
                <h3 className="font-serif text-2xl font-semibold">{job.role}</h3>
                <p className="mb-4 font-medium text-muted">
                  {job.company} · <span className="font-normal">{job.location}</span>
                </p>
                <ul className="space-y-2.5">
                  {job.points.map((point) => (
                    <li key={point.slice(0, 32)} className="flex gap-3 leading-relaxed text-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
