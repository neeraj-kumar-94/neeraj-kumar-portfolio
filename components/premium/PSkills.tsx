import type { CSSProperties } from "react";
import { skillGroups } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

export default function PSkills() {
  return (
    <section id="skills" className="scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle num="02" label="Expertise" />

        <div className="border-t border-border">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} variant="up" delay={i * 80}>
              <div className="p-row grid gap-4 border-b border-border py-9 transition-colors duration-300 sm:grid-cols-[minmax(0,320px)_1fr] sm:items-center sm:gap-10">
                <div className="relative flex items-baseline gap-4">
                  <span className="p-outline font-serif text-2xl font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                    {group.title}
                  </h3>
                </div>
                <div className="relative flex flex-wrap gap-2.5">
                  {group.skills.map((skill, j) => (
                    <span
                      key={skill}
                      className="pop rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                      style={{ "--pop-delay": `${0.1 + j * 0.05}s` } as CSSProperties}
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
