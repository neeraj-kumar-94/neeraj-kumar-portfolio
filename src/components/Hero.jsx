import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";

function Hero({ info }) {
  return (
    <section
      id="hero"
      className="nk-hero w-full min-w-0 bg-white transition-colors duration-300 dark:bg-nkBg"
    >
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-nkAccent">
            Hi, I am {info.name}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            {info.title}
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-slate-600 dark:text-slate-300">
            {info.summary}
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{info.location}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-nkPrimary px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-indigo-500"
            >
              Let&apos;s Talk <ArrowRight size={16} />
            </a>
            <a
              href={info.resumePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition duration-300 hover:scale-[1.02] hover:border-nkPrimary hover:text-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300"
            >
              Resume <Download size={16} />
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={info.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 transition duration-300 hover:scale-110 hover:border-nkPrimary hover:text-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={info.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 transition duration-300 hover:scale-110 hover:border-nkPrimary hover:text-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300"
            >
              <Github size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-nkPrimary/25 to-nkAccent/25 blur-xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-2 shadow-nkSoft dark:border-slate-700 dark:bg-nkCard">
            <img
              src="/img/main-image/dev.png"
              alt="Neeraj Kumar profile visual"
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

export default Hero;
