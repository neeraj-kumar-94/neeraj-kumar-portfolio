import Image from "next/image";
import { premiumCopy, profile } from "@/lib/data";
import CountUp from "../CountUp";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

export default function PAbout() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle num="01" label="About Me" />

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.35fr] lg:gap-20">
          {/* Left — clean sticky portrait */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <div className="group relative mx-auto max-w-xs overflow-hidden rounded-[2rem] lg:max-w-none">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/profile/neeraj-smile.jpg"
                    alt="Neeraj Kumar"
                    fill
                    sizes="(max-width: 1024px) 320px, 400px"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>

          {/* Right — editorial copy */}
          <div>
            <Reveal variant="right">
              <p className="font-serif text-2xl font-medium leading-snug text-foreground sm:text-[2.1rem]">
                {premiumCopy.about[0]}
              </p>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <div className="mt-8 space-y-5 border-l border-border pl-6 sm:pl-8">
                <p className="leading-relaxed text-muted">{premiumCopy.about[1]}</p>
                <p className="leading-relaxed text-muted">{premiumCopy.about[2]}</p>
              </div>
            </Reveal>

            {/* Stats strip */}
            <Reveal variant="up" delay={200}>
              <div className="mt-14 grid grid-cols-3 divide-x divide-border border-y border-border">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="px-3 py-8 text-center sm:px-6">
                    <p className="p-gold font-serif text-4xl font-semibold italic sm:text-6xl">
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
