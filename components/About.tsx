import { profile } from "@/lib/data";
import AboutIllustration from "./AboutIllustration";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal variant="zoom">
          <SectionHeading eyebrow="Introduction" title="About Me" />
        </Reveal>

        <div className="grid items-center gap-12 lg:grid-cols-5">
          <Reveal variant="left" className="lg:col-span-2">
            <AboutIllustration />
          </Reveal>

          <Reveal delay={120} variant="right" className="lg:col-span-3">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {profile.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-2.5 sm:gap-6">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-card px-2 py-4 text-center shadow-sm sm:p-5"
                >
                  <p className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase leading-snug tracking-wide text-muted sm:text-xs sm:tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
