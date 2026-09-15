import { highlights, profile } from "@/lib/data";
import CountUp from "../CountUp";
import Reveal from "../Reveal";
import PortraitFrame, { Sticker } from "./PortraitFrame";
import PSectionTitle from "./PSectionTitle";

export default function PAbout() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle label="About Me" />

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.3fr] lg:items-start lg:gap-16">
          {/* Left — editorial portrait with floating badges */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <PortraitFrame
                src="/profile/neeraj-smile.jpg"
                alt="Neeraj Kumar"
                sizes="(max-width: 1024px) 340px, 480px"
                className="mx-auto max-w-[340px] lg:max-w-[480px]"
              >
                <Sticker className="-left-5 top-8" rotate={-5}>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {profile.role}
                </Sticker>
                <Sticker className="-right-4 bottom-12" rotate={4} delay={2}>
                  Shamli, Uttar Pradesh
                </Sticker>
              </PortraitFrame>
            </Reveal>
          </div>

          {/* Right — editorial copy, organized for scanning */}
          <div>
            <Reveal variant="right">
              <p className="max-w-2xl font-serif text-[1.65rem] font-medium leading-snug text-foreground sm:text-[1.9rem]">
                {profile.about[0]}
              </p>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <div className="mt-7 max-w-2xl space-y-4 border-l border-border pl-6 text-[15px] sm:pl-8">
                <p className="leading-relaxed text-muted">{profile.about[1]}</p>
                <p className="leading-relaxed text-muted">{profile.about[2]}</p>
              </div>
            </Reveal>

            {/* Career highlights — the key facts, easy to scan */}
            <Reveal variant="right" delay={180}>
              <div className="mt-10">
                <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                  <span className="h-px w-8 bg-accent" />
                  Career Highlights
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-2xl border border-border bg-card/60 p-4 text-sm leading-relaxed text-muted transition-colors duration-300 hover:border-accent/40 hover:text-foreground"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Stats strip */}
            <Reveal variant="up" delay={200}>
              <div className="mt-10 grid grid-cols-3 divide-x divide-border border-y border-border">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="px-3 py-6 text-center sm:px-6">
                    <p className="p-gold font-serif text-4xl font-semibold italic sm:text-5xl">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="mt-2.5 text-[10px] font-medium uppercase leading-snug tracking-[0.2em] text-muted sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
