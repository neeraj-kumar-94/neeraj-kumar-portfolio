import Image from "next/image";
import { premiumCopy, profile } from "@/lib/data";
import CountUp from "../CountUp";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

export default function PAbout() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle label="About Me" />

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.35fr] lg:gap-20">
          {/* Left — cutout portrait breaking out of its card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="left">
              <div className="group relative mx-auto max-w-xs pt-12 lg:max-w-none">
                <div className="absolute inset-x-0 bottom-0 top-24 rounded-[2rem] border border-border bg-gradient-to-b from-card to-background shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_-24px_rgba(0,0,0,0.7)]" />
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3 rounded-b-[2rem]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 100%, rgba(198,205,218,0.14) 0%, transparent 70%)",
                  }}
                />
                {/* Negative top inset lets the head rise above the card while the bottom corners stay rounded */}
                <div
                  className="relative aspect-[879/1100]"
                  style={{ clipPath: "inset(-20% 0 0 0 round 0 0 2rem 2rem)" }}
                >
                  <Image
                    src="/profile/neeraj-cutout-smile.png"
                    alt="Neeraj Kumar"
                    fill
                    sizes="(max-width: 1024px) 320px, 480px"
                    className="origin-bottom object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
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
