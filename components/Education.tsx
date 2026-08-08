import { education, highlights } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-20 bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Background" title="Education & Highlights" />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            {education.map((item, i) => (
              <Reveal key={item.degree} delay={i * 80}>
                <div className="rounded-2xl border border-border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <p className="mb-1 text-sm font-medium uppercase tracking-wider text-accent">
                    {item.period}
                  </p>
                  <h3 className="font-serif text-xl font-semibold">{item.degree}</h3>
                  <p className="mb-3 font-medium text-muted">{item.institution}</p>
                  <p className="text-sm leading-relaxed text-muted">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="h-full rounded-2xl border border-border bg-background p-8 shadow-sm">
              <h3 className="mb-6 font-serif text-xl font-semibold">
                <span className="mr-2 text-accent">—</span>
                Quick Highlights
              </h3>
              <ul className="space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-muted">
                    <svg
                      className="mt-1 h-5 w-5 shrink-0 text-accent"
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
