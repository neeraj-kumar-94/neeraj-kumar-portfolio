"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { profile, proofPoints } from "@/lib/data";
import Greeting from "@/components/ui/Greeting";
import PortraitFrame from "@/components/ui/PortraitFrame";
import TextReveal from "@/components/effects/TextReveal";

// The intro curtain lifts at ~1.5s; the hero starts moving just before it clears
const INTRO = 1.15;
const ease = [0.16, 1, 0.3, 1] as const;

const stack: Variants = {
  hidden: {},
  show: { transition: { delayChildren: INTRO, staggerChildren: 0.12 } },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease } },
};

export default function Hero() {
  const [first, last] = profile.name.split(" ");
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Portrait drifts up and settles back as the hero scrolls away
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -90]), {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
  });
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const copyFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Pointer tilt — the portrait leans a few degrees toward the cursor
  const tiltX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = portraitRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const py = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    tiltY.set(px * 10);
    tiltX.set(-py * 8);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden pt-24"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr]">
          {/* Left — editorial type */}
          <motion.div variants={stack} initial="hidden" animate="show" style={{ y: copyY, opacity: copyFade }}>
            <motion.p
              variants={riseIn}
              className="mb-8 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-border bg-card/70 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted backdrop-blur sm:gap-3 sm:px-5 sm:text-xs sm:tracking-[0.25em]"
            >
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-signal"
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              <Greeting /> · {profile.availability.status}
            </motion.p>

            <h1 className="font-serif font-medium leading-[1.02] tracking-tight">
              <TextReveal
                text={first}
                trigger="load"
                delay={INTRO + 0.1}
                weight={[300, 500]}
                className="block text-[clamp(3.2rem,9vw,8rem)] text-foreground"
              />

              {/* Role rule between the two name lines */}
              <motion.span variants={riseIn} className="my-3 flex items-center gap-4">
                <motion.span
                  className="h-px w-14 origin-left bg-accent/60 sm:w-24"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: INTRO + 0.5, ease }}
                />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-accent sm:text-xs">
                  {profile.role}
                </span>
              </motion.span>

              <TextReveal
                text={last}
                trigger="load"
                delay={INTRO + 0.28}
                weight={[300, 500]}
                className="block text-[clamp(3.2rem,9vw,8rem)] italic"
                wordClassName="p-gold pr-4"
              />
            </h1>

            <motion.p
              variants={riseIn}
              className="measure mt-7 text-lg leading-relaxed text-foreground sm:text-xl"
            >
              {profile.tagline}
            </motion.p>

            {/* The supporting line is detail, not the pitch — phones keep the hero short */}
            <motion.p
              variants={riseIn}
              className="measure mt-3 hidden text-[15px] leading-relaxed text-muted sm:block"
            >
              {profile.taglineSupport}
            </motion.p>

            {/* One primary action; the rest are quiet text links */}
            <motion.div variants={riseIn} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <motion.a
                href="#work"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="group magnetic inline-flex items-center gap-3 rounded-full bg-accent py-2.5 pl-7 pr-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-on-accent"
              >
                Selected Work
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/20 transition-transform duration-300 group-hover:translate-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </motion.a>
              <a
                href="#contact"
                className="link-underline text-sm font-semibold uppercase tracking-[0.15em] text-foreground"
              >
                Get in touch
              </a>
            </motion.div>

            <motion.p variants={riseIn} className="mt-6 text-[13px] text-muted">
              {profile.availability.detail}
            </motion.p>
          </motion.div>

          {/* Portrait — above the name on mobile, right column on desktop */}
          <motion.div
            ref={portraitRef}
            onPointerMove={onPointerMove}
            onPointerLeave={resetTilt}
            style={{ y: portraitY, perspective: 1200 }}
            initial={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: INTRO - 0.15, ease }}
            className="relative order-first mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-none lg:max-w-[440px]"
          >
            <motion.div
              className="relative"
              style={{ rotateX: tiltX, rotateY: tiltY, scale: portraitScale, transformStyle: "preserve-3d" }}
            >
              <PortraitFrame
                cutout="/profile/neeraj-cutout.png"
                alt="Neeraj Kumar"
                priority
                sizes="(max-width: 1024px) 360px, 440px"
              />

              {/* Rotating circular text */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: INTRO + 0.75, type: "spring", stiffness: 200, damping: 18 }}
                className="absolute bottom-4 -left-8 z-[3] hidden h-32 w-32 rounded-full bg-background/75 backdrop-blur-sm lg:block"
              >
                <motion.svg
                  viewBox="0 0 100 100"
                  className="h-full w-full"
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                >
                  <defs>
                    <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <text className="fill-accent" style={{ fontSize: "8.4px" }}>
                    <textPath href="#circlePath" textLength="236" lengthAdjust="spacingAndGlyphs">
                      FRONTEND DEVELOPER · WORDPRESS · SHOPIFY ·
                    </textPath>
                  </text>
                </motion.svg>
                <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-background/80 text-accent backdrop-blur">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                  </svg>
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Proof band — the numbers, each with the context that makes it mean something */}
      <motion.div
        className="border-t border-border/70"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: INTRO + 0.85, ease }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-border/70 px-6 max-lg:gap-y-5 max-lg:py-6 lg:grid-cols-4 lg:divide-x">
          {proofPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: INTRO + 0.95 + i * 0.08, ease }}
              className={`lg:py-6 ${i === 0 ? "lg:pr-8" : "lg:px-8"}`}
            >
              <p className="font-serif text-2xl font-medium italic text-foreground sm:text-3xl">
                {point.value}
              </p>
              <p className="mt-1.5 text-[11px] leading-snug text-muted sm:text-xs">{point.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
