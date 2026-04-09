import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

function About({ info, experiences }) {
  return (
    <section
      id="about"
      className="nk-about w-full min-w-0 bg-slate-50 transition-colors duration-300 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <SectionTitle
        eyebrow="About Me"
        title="Building modern and business-focused websites"
        subtitle="I translate ideas and design mockups into conversion-oriented web experiences for real users."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-nkSoft transition-colors duration-300 dark:border-slate-700 dark:bg-nkCard"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Professional Summary</h3>
          <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{info.summary}</p>
          <div className="mt-6 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <span className="font-semibold text-slate-900 dark:text-white">Email:</span> {info.email}
            </p>
            <p>
              <span className="font-semibold text-slate-900 dark:text-white">Phone:</span> {info.phone}
            </p>
            <p>
              <span className="font-semibold text-slate-900 dark:text-white">Location:</span>{" "}
              {info.location}
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-nkCard"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-sm font-medium text-nkAccent">{exp.duration}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{exp.role}</h3>
              <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">{exp.company}</p>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {exp.points.map((point) => (
                  <li key={`${exp.id}-${point}`} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-nkPrimary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

export default About;
