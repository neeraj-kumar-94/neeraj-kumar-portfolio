"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  siBootstrap,
  siCss,
  siFigma,
  siGithub,
  siHtml5,
  siHubspot,
  siJavascript,
  siNextdotjs,
  siPhp,
  siReact,
  siSass,
  siShopify,
  siWordpress,
} from "simple-icons";
import { skillGroups } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

type Logo = { kind: "brand"; path: string } | { kind: "line"; node: ReactNode };

const brand = (icon: { path: string }): Logo => ({ kind: "brand", path: icon.path });
const line = (d: string): Logo => ({
  kind: "line",
  node: <path strokeLinecap="round" strokeLinejoin="round" d={d} />,
});

// Keyed by the skill's base name — the text before any "(…)" detail
const logos: Record<string, Logo> = {
  HTML5: brand(siHtml5),
  CSS3: brand(siCss),
  JavaScript: brand(siJavascript),
  PHP: brand(siPhp),
  Sass: brand(siSass),
  "React.js": brand(siReact),
  "Next.js": brand(siNextdotjs),
  WordPress: brand(siWordpress),
  Shopify: brand(siShopify),
  Bootstrap: brand(siBootstrap),
  "Git & GitHub": brand(siGithub),
  HubSpot: brand(siHubspot),
  Figma: brand(siFigma),
  LeadSquared: line(
    "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
  ),
  "Payment Gateways": line(
    "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
  ),
  "Adobe Photoshop": line(
    "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
  ),
  "SEO Optimization": line("M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"),
  "Performance Tuning": line("M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"),
  "Cross-Browser Compatibility": line(
    "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
  ),
};
const fallbackLogo = line("M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5");

const splitSkill = (skill: string) => {
  const match = skill.match(/^(.*?)\s*\((.+)\)$/);
  return match ? { name: match[1], note: match[2] } : { name: skill, note: "" };
};

const filters = ["All", ...skillGroups.map((g) => g.title)];

// Phones get one-word tab labels so every tab fits on a single row
const shortLabels: Record<string, string> = {
  "Web Development": "Web",
  "Frameworks & CMS": "Frameworks",
  "Tools & Integrations": "Tools",
  "Design & Optimization": "Design",
};
const allTiles = skillGroups.flatMap((g) => g.skills.map((skill) => ({ group: g.title, skill })));

export default function Skills() {
  const [active, setActive] = useState(0);

  // On phones, open on the first category instead of "All" so the section fits one screen
  useEffect(() => {
    if (window.innerWidth < 640) setActive(1);
  }, []);

  const visible = active === 0 ? allTiles : allTiles.filter((t) => t.group === filters[active]);

  return (
    <section id="skills" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle label="Expertise" />

        <Reveal variant="up">
          {/* Filter tabs — wrap onto extra rows on narrow screens so every tab stays visible */}
          <div
            role="tablist"
            aria-label="Skill categories"
            className="relative inline-flex max-w-full flex-wrap gap-0.5 rounded-[1.75rem] border border-border bg-card/60 p-1.5 backdrop-blur sm:gap-1"
          >
            {filters.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`relative whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-medium transition-colors duration-300 sm:px-4 sm:text-sm ${
                  active === i ? "text-background" : "text-muted hover:text-foreground"
                }`}
              >
                {/* The pill itself moves between tabs — no measuring needed */}
                {active === i && (
                  <motion.span
                    layoutId="skill-pill"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative sm:hidden">{shortLabels[label] ?? label}</span>
                <span className="relative hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Logo tiles — swap out and stagger back in on every filter change */}
          <motion.div
            layout
            role="tabpanel"
            className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((tile, k) => {
              const { name, note } = splitSkill(tile.skill);
              const logo = logos[name] ?? fallbackLogo;
              return (
                <motion.div
                  key={tile.skill}
                  layout
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: k * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="group flex min-h-[60px] items-center gap-2.5 rounded-2xl border border-border bg-card/60 px-3 py-2.5 transition-colors duration-300 hover:border-accent/40 hover:bg-card sm:min-h-[68px] sm:gap-3.5 sm:px-4 sm:py-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-muted transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent sm:h-10 sm:w-10">
                    {logo.kind === "brand" ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" fill="currentColor" aria-hidden="true">
                        <path d={logo.path} />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      >
                        {logo.node}
                      </svg>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium leading-snug text-foreground sm:text-sm">{name}</span>
                    {note && <span className="block truncate text-xs text-muted">{note}</span>}
                  </span>
                </motion.div>
              );
              })}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
