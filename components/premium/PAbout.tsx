import Image from "next/image";
import { profile } from "@/lib/data";
import CountUp from "../CountUp";
import Parallax from "../Parallax";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

export default function PAbout() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle num="01" label="About Me" />

        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          {/* Portrait */}
          <Reveal variant="left" className="mx-auto w-full max-w-xs lg:max-w-none">
            <Parallax speed={0.05}>
              <div className="group relative overflow-hidden rounded-3xl border border-border">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/profile/neeraj-smile.jpg"
                    alt="Neeraj Kumar"
                    fill
                    sizes="(max-width: 1024px) 320px, 420px"
                    className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </Parallax>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal variant="right">
              <p className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                {profile.about[0]}
              </p>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <p className="mt-6 leading-relaxed text-muted">{profile.about[1]}</p>
              <p className="mt-4 leading-relaxed text-muted">{profile.about[2]}</p>
            </Reveal>

            <Reveal variant="up" delay={200}>
              <div className="mt-12 grid grid-cols-3 divide-x divide-border border-y border-border">
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
