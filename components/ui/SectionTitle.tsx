"use client";

import { motion } from "motion/react";
import TextReveal from "@/components/effects/TextReveal";

/** Section heading in the studio-index pattern: a hairline rule draws across
 *  the column with mono meta sitting on it, then the title rises underneath. */
export default function SectionTitle({
  label,
  tag,
  meta,
}: {
  label: string;
  /** short mono label on the left of the rule */
  tag?: string;
  /** mono note on the right of the rule */
  meta?: string;
}) {
  return (
    <div className="mb-10 sm:mb-16">
      <motion.div
        className="mb-6 h-px w-full origin-left bg-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      {(tag || meta) && (
        <motion.div
          className="mb-6 flex items-baseline justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="meta text-signal">{tag}</span>
          {meta && <span className="meta text-muted">{meta}</span>}
        </motion.div>
      )}

      <h2 className="font-serif text-4xl font-medium italic leading-tight text-foreground sm:text-6xl">
        <TextReveal text={label} delay={0.12} stagger={0.07} />
      </h2>
    </div>
  );
}
