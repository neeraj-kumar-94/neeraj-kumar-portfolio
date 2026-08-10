import type { CSSProperties } from "react";
import { skillGroups } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const icons = [
  // Code brackets
  <path
    key="code"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
  />,
  // Layers
  <path
    key="layers"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
  />,
  // Wrench
  <path
    key="tools"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085"
  />,
  // Sparkles / design
  <path
    key="design"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
  />,
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 overflow-hidden bg-card py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal variant="zoom">
          <SectionHeading eyebrow="Expertise" title="Skills & Technologies" />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={(i % 2) * 120}
              variant={i % 2 === 0 ? "left" : "right"}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl">
                {/* Gradient accent line */}
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent/30 transition-transform duration-500 group-hover:scale-x-100" />

                <div className="mb-5 flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      {icons[i % icons.length]}
                    </svg>
                  </span>
                  <h3 className="font-serif text-xl font-semibold">{group.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, j) => (
                    <span
                      key={skill}
                      className="pop rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent"
                      style={{ "--pop-delay": `${0.15 + j * 0.07}s` } as CSSProperties}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
