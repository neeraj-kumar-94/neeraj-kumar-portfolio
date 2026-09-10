import Image from "next/image";
import { premiumCopy, profile } from "@/lib/data";
import CountUp from "../CountUp";
import Parallax from "../Parallax";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

export default function PAbout() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle num="01" label="About Me" />

        {/* Asymmetric: photo overlaps upward, copy offset right */}
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.4fr]">
          <Reveal variant="left" className="relative mx-auto w-full max-w-xs lg:max-w-none">
            <Parallax speed={0.07}>
              <div className="group relative rotate-[-2.5deg] transition-transform duration-500 hover:rotate-0 lg:-mt-24">
                <div className="absolute -inset-3 rounded-3xl border border-accent/20" />
                <div className="relative overflow-hidden rounded-3xl border border-border">
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
                <span className="absolute -bottom-4 -right-3 rounded-full border border-accent/40 bg-background px-5 py-2 font-serif text-sm italic text-accent shadow-xl">
                  Shamli, UP → The Internet
                </span>
              </div>
            </Parallax>
          </Reveal>

          <div className="lg:pl-8">
            <Reveal variant="right">
              <p className="relative font-serif text-2xl leading-snug text-foreground sm:text-[2rem]">
                <span className="pointer-events-none absolute -left-8 -top-8 hidden font-serif text-8xl text-accent/15 lg:block">
                  “
                </span>
                {premiumCopy.about[0]}
              </p>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <p className="mt-6 max-w-2xl leading-relaxed text-muted">{premiumCopy.about[1]}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{premiumCopy.about[2]}</p>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <div className="mt-12 grid max-w-2xl grid-cols-3 divide-x divide-border border-y border-border">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="px-3 py-7 text-center sm:px-6">
                    <p className="font-serif text-4xl font-semibold text-accent sm:text-5xl">
                      <CountUp value={stat.value} />
                    </p>
                    <p className="mt-2 text-[10px] font-medium uppercase leading-snug tracking-[0.2em] text-muted sm:text-xs">
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
