"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { siReact, siShopify, siWordpress } from "simple-icons";
import { alsoWorkWith, coreSkills } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

const ease = [0.16, 1, 0.3, 1] as const;

const logos: Record<string, string> = {
  Shopify: siShopify.path,
  WordPress: siWordpress.path,
  "React & Next.js": siReact.path,
};

type Skill = (typeof coreSkills)[number];

/** Card is fully open from tablet up. On phones the proof collapses so the
 *  whole section still fits roughly one screen. */
function SkillCard({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);

  const detail = (
    <>
      <p className="leading-relaxed text-muted">{skill.proof}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {skill.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] font-medium tracking-wide text-muted"
          >
            {tool}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
      }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-colors duration-500 hover:border-signal/40 hover:bg-surface-2/60 sm:p-8"
    >
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-accent transition-colors duration-500 group-hover:border-signal/50 group-hover:text-signal sm:h-12 sm:w-12">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d={logos[skill.name]} />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">{skill.name}</h3>
          <p className="mt-0.5 meta meta-sm text-signal">
            {skill.summary}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? `Hide ${skill.name} details` : `Show ${skill.name} details`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-signal transition-colors hover:border-signal md:hidden"
        >
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.35, ease }}
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </button>
      </div>

      {/* Tablet and up: always shown */}
      <div className="mt-6 hidden md:block">{detail}</div>

      {/* Phones: accordion */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden md:hidden"
          >
            <div className="pt-5">{detail}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle label="Expertise" tag="What I work in" meta="WordPress · Shopify · React" />

        <Reveal variant="up">
          <p className="measure-wide -mt-4 mb-8 leading-relaxed text-muted sm:mb-12 sm:text-lg">
            Three stacks I work in every day, and what I have shipped with each.
          </p>
        </Reveal>

        <motion.div
          className="grid gap-4 lg:grid-cols-3 lg:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {coreSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </motion.div>

        {/* Everything else stays a single quiet line rather than a logo wall */}
        <Reveal variant="up" delay={120}>
          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row sm:items-baseline sm:gap-8">
            <p className="shrink-0 meta meta-sm text-muted">
              Also work with
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/80">{alsoWorkWith.join(" · ")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
