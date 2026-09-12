import Image from "next/image";
import { premiumCopy, profile } from "@/lib/data";
import Parallax from "../Parallax";
import PGreeting from "./PGreeting";

const heroFacts = [
  { label: "Location", value: "Shamli, UP — India" },
  { label: "Experience", value: "4+ Years · 20+ Projects" },
  { label: "Speciality", value: "WordPress · Shopify · React" },
  { label: "Status", value: "Open to Work" },
];

export default function PHero() {
  const [first, last] = profile.name.split(" ");

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden pt-24">
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr]">
          {/* Left — editorial type */}
          <div>
            <p
              className="animate-fade-up mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-card/70 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-muted backdrop-blur"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <PGreeting /> · Available for Work
            </p>

            <h1 className="font-serif font-medium leading-[1.02] tracking-tight">
              <span className="word-mask block">
                <span
                  className="word-hero block text-[clamp(3.2rem,9vw,8rem)] text-foreground"
                  style={{ animationDelay: "0.25s" }}
                >
                  {first}
                </span>
              </span>

              {/* Role rule between the two name lines */}
              <span
                className="animate-fade-up my-3 flex items-center gap-4"
                style={{ animationDelay: "0.55s" }}
              >
                <span className="h-px w-14 bg-accent/60 sm:w-24" />
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-accent sm:text-xs">
                  {profile.role}
                </span>
              </span>

              <span className="word-mask block">
                <span
                  className="word-hero p-gold block pr-4 text-[clamp(3.2rem,9vw,8rem)] italic"
                  style={{ animationDelay: "0.42s" }}
                >
                  {last}
                </span>
              </span>
            </h1>

            <p
              className="animate-fade-up mt-7 max-w-md leading-relaxed text-muted"
              style={{ animationDelay: "0.68s" }}
            >
              {premiumCopy.tagline}
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center gap-5"
              style={{ animationDelay: "0.82s" }}
            >
              <a
                href="#work"
                className="group magnetic inline-flex items-center gap-3 rounded-full bg-accent py-2.5 pl-7 pr-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-background"
              >
                Selected Work
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/20 transition-transform duration-300 group-hover:translate-x-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
              <a
                href="#contact"
                className="magnetic rounded-full border border-border px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right — cutout portrait on a platinum spotlight + rotating badge */}
          <div
            className="animate-fade-up relative mx-auto hidden w-full max-w-[380px] lg:block"
            style={{ animationDelay: "0.5s" }}
          >
            <Parallax speed={0.06}>
              <div className="group relative">
                <div
                  className="pointer-events-none absolute -inset-x-10 bottom-[6%] h-1/2"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 100%, rgba(198,205,218,0.16) 0%, transparent 65%)",
                  }}
                />

                <div className="relative aspect-[879/1100]">
                  <Image
                    src="/profile/neeraj-cutout.png"
                    alt="Neeraj Kumar"
                    fill
                    priority
                    sizes="380px"
                    className="object-contain object-bottom"
                  />
                  {/* The photo is cropped at the waist — fade that edge into the page */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background via-background/70 to-transparent" />
                </div>

                {/* Rotating circular text */}
                <div className="absolute bottom-4 -left-8 h-32 w-32">
                  <svg viewBox="0 0 100 100" className="p-circle-badge h-full w-full">
                    <defs>
                      <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text className="fill-accent" style={{ fontSize: "8.4px" }}>
                      <textPath href="#circlePath" textLength="236" lengthAdjust="spacingAndGlyphs">
                        FRONTEND DEVELOPER · WORDPRESS · SHOPIFY ·
                      </textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-background/80 text-accent backdrop-blur">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                    </svg>
                  </span>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </div>

      {/* Bottom fact strip — replaces the marquee */}
      <div className="animate-fade-up border-t border-border/70" style={{ animationDelay: "1s" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-border/70 px-6 max-lg:gap-y-5 max-lg:py-6 lg:grid-cols-4 lg:divide-x">
          {heroFacts.map((fact, i) => (
            <div key={fact.label} className={`lg:py-6 ${i === 0 ? "lg:pr-8" : "lg:px-8"}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">
                {fact.label}
              </p>
              <p className="mt-1.5 font-serif text-sm italic text-foreground sm:text-base">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
