"use client";

import { AnimatePresence, motion, useInView, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { education, experience } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

const ease = [0.16, 1, 0.3, 1] as const;

const icons = {
  Work: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  ),
  Education: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
    />
  ),
};

type Item = {
  type: keyof typeof icons;
  title: string;
  org: string;
  location: string;
  period: string;
  points: string[];
};

/** One stop on the timeline: its node lights up as the drawn line reaches it. */
function TimelineItem({ item, index }: { item: Item; index: number }) {
  const left = index % 2 === 0;
  const [open, setOpen] = useState(false);
  const nodeRef = useRef<HTMLSpanElement>(null);
  // Fires as the node crosses the middle of the screen — the point the spine
  // has drawn down to. The band is deliberately a few percent tall: a margin of
  // exactly -50%/-50% collapses the observer root to a zero-height line, which
  // never reports an intersection.
  const reached = useInView(nodeRef, { margin: "-45% 0px -45% 0px" });

  return (
    <Reveal variant={left ? "left" : "right"} delay={60} amount={0.15}>
      <div className="relative md:grid md:grid-cols-2 md:gap-24">
        {/* Node on the spine */}
        {/* Colours come from theme tokens via classes, so the node follows the
            light/dark swap; motion only drives the scale. */}
        <motion.span
          ref={nodeRef}
          data-reached={reached}
          animate={{ scale: reached ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease }}
          className="absolute -left-[29px] top-5 z-[1] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors duration-500 data-[reached=true]:border-signal data-[reached=true]:bg-signal data-[reached=true]:text-background data-[reached=true]:shadow-[0_0_28px_color-mix(in_srgb,var(--signal)_45%,transparent)] sm:h-9 sm:w-9 md:left-1/2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            {icons[item.type]}
          </svg>
        </motion.span>

        {/* Card */}
        <div className={`md:row-start-1 ${left ? "md:col-start-1" : "md:col-start-2"}`}>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="group rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-colors duration-500 hover:border-signal/40 sm:p-8"
          >
            <div className="mb-2 flex items-center gap-3 sm:mb-4">
              {/* On phones the spine icon already says Work vs Education */}
              <span className="hidden rounded-full border border-accent/30 px-3 py-0.5 meta meta-sm text-accent sm:inline-block">
                {item.type}
              </span>
              <span className="text-[13px] font-medium text-muted sm:text-sm md:hidden">{item.period}</span>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? "Hide details" : "Show details"}
                className="-my-1 ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-colors hover:border-signal md:hidden"
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

            <h3 className="font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-signal sm:text-3xl">
              {item.title}
            </h3>
            <p className="mt-1 text-[13px] text-muted sm:text-sm">
              {item.org}
              {item.location && <span className="hidden sm:inline"> · {item.location}</span>}
            </p>

            {/* Always open from tablet up; a smooth accordion on phones */}
            <ul className="mt-4 hidden space-y-2.5 border-t border-border pt-4 sm:mt-5 sm:pt-5 md:block">
              {item.points.map((point) => (
                <Bullet key={point.slice(0, 32)}>{point}</Bullet>
              ))}
            </ul>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden md:hidden"
                >
                  <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                    {item.points.map((point, i) => (
                      <motion.li
                        key={point.slice(0, 32)}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease }}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Period on the opposite side of the spine (desktop) */}
        <div
          className={`hidden md:row-start-1 md:flex md:pt-5 ${
            left ? "md:col-start-2 md:justify-start" : "md:col-start-1 md:justify-end"
          }`}
        >
          <p className="font-serif text-3xl italic text-foreground/70">{item.period}</p>
        </div>
      </div>
    </Reveal>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-muted">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
      {children}
    </li>
  );
}

/** Career timeline whose spine draws itself as you scroll. */
export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 65%"],
  });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const items: Item[] = [
    ...experience.map((job) => ({
      type: "Work" as const,
      title: job.role,
      org: job.company,
      location: job.location,
      period: job.period,
      points: job.points.slice(0, 3),
    })),
    ...education.map((item) => ({
      type: "Education" as const,
      title: item.degree,
      org: item.institution,
      location: "",
      period: item.period,
      points: [item.detail],
    })),
  ];

  return (
    <section id="experience" className="scroll-mt-24 py-12 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle label="The Journey" tag="Where I have worked" meta="2020 — Present" />

        <div ref={listRef} className="relative pl-11 md:pl-0">
          {/* Spine — static track plus the scroll-drawn fill */}
          <span className="absolute left-[15px] top-0 h-full w-px -translate-x-1/2 bg-border md:left-1/2" />
          <motion.span
            style={{ scaleY }}
            className="absolute left-[15px] top-0 h-full w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-accent via-accent to-accent/40 shadow-[0_0_12px_rgba(198,205,218,0.5)] md:left-1/2"
          />

          <div className="space-y-5 md:space-y-24">
            {items.map((item, i) => (
              <TimelineItem key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
