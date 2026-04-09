import { motion } from "framer-motion";

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      className="nk-section-title mb-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <p className="nk-eyebrow text-sm font-semibold uppercase tracking-[0.2em] text-nkAccent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">{subtitle}</p>
      ) : null}
    </motion.div>
  );
}

export default SectionTitle;
