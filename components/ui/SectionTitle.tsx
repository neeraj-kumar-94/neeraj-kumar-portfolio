"use client";

import { motion } from "motion/react";
import TextReveal from "@/components/effects/TextReveal";

/** Section heading: a rule draws itself out, then the words rise into place. */
export default function SectionTitle({ label }: { label: string }) {
  return (
    <div className="mb-10 sm:mb-20">
      <motion.span
        aria-hidden="true"
        className="mb-5 block h-px w-12 origin-left bg-accent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <h2 className="font-serif text-4xl font-medium italic leading-tight text-foreground sm:text-6xl">
        <TextReveal text={label} delay={0.12} stagger={0.07} />
      </h2>
    </div>
  );
}
