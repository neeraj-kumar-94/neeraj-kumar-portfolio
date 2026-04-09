import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Braces,
  FileCode2,
  Orbit,
  LayoutTemplate,
  ShoppingBag,
  PenTool,
  GitBranch,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

const iconMap = {
  Code2,
  Palette,
  Braces,
  FileCode2,
  Orbit,
  LayoutTemplate,
  ShoppingBag,
  PenTool,
  GitBranch,
};

function Skills({ skills }) {
  const marqueeSkills = [...skills, ...skills];

  return (
    <section
      id="skills"
      className="nk-skills w-full min-w-0 bg-white py-20 transition-colors duration-300 dark:bg-nkBg"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle
          eyebrow="Core Skills"
          title="Tools and technologies I use daily"
          subtitle="A balanced mix of frontend fundamentals, CMS expertise, and modern collaboration tools."
        />

        <div className="relative grid gap-4 md:grid-cols-3">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.icon] || Code2;
            return (
              <motion.div
                key={skill.id}
                className="nk-skill-card group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors duration-300 dark:border-slate-700 dark:bg-nkCard"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.03, rotateX: 4, rotateY: -4 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-nkPrimary/10 blur-xl transition group-hover:bg-nkAccent/20" />
                <div className="relative mb-3 inline-flex rounded-xl bg-slate-100 p-3 text-nkPrimary dark:bg-slate-800">
                  <Icon size={22} />
                </div>
                <p className="text-base font-semibold text-slate-900 dark:text-white">{skill.name}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Production-ready expertise with strong implementation quality.
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 py-4 dark:border-slate-700 dark:bg-nkCard/90">
          <div className="nk-marquee flex min-w-max gap-8 px-4">
            {marqueeSkills.map((skill, idx) => (
              <span
                key={`${skill.id}-${idx}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
