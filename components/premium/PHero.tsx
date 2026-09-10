import Image from "next/image";
import { premiumCopy, profile } from "@/lib/data";
import Parallax from "../Parallax";
import PGreeting from "./PGreeting";

const marqueeItems = [...profile.typedRoles, "Based in India", "Available Worldwide"];

export default function PHero() {
  const [first, last] = profile.name.split(" ");

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden pt-24">
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr]">
          {/* Left — elegant editorial type */}
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
              style={{ animationDelay: "0.65s" }}
            >
              {premiumCopy.tagline}
            </p>

            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center gap-5"
              style={{ animationDelay: "0.8s" }}
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

          {/* Right — arch portrait + rotating badge */}
          <div
            className="animate-fade-up relative mx-auto hidden w-full max-w-[340px] lg:block"
            style={{ animationDelay: "0.5s" }}
          >
            <Parallax speed={0.06}>
              <div className="group relative">
                <div className="p-arch absolute -inset-2.5 border border-accent/25" />
                <div className="p-arch relative aspect-[3/4] overflow-hidden border border-border">
                  <Image
                    src="/profile/neeraj-arms-crossed.jpg"
                    alt="Neeraj Kumar"
                    fill
                    priority
                    sizes="340px"
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <Image
                    src="/profile/neeraj-smile.jpg"
                    alt="Neeraj Kumar smiling"
                    fill
                    sizes="340px"
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>

                {/* Rotating circular text */}
                <div className="absolute -bottom-8 -left-10 h-32 w-32">
                  <svg viewBox="0 0 100 100" className="p-circle-badge h-full w-full">
                    <defs>
                      <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                    </defs>
                    <text className="fill-accent" style={{ fontSize: "8.4px", letterSpacing: "2.1px" }}>
                      <textPath href="#circlePath">
                        FRONTEND DEVELOPER · WORDPRESS · SHOPIFY ·
                      </textPath>
                    </text>
                  </svg>
                  <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-background/80 font-serif text-lg italic text-accent backdrop-blur">
                    NK
                  </span>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </div>

      {/* Bottom marquee — refined */}
      <div className="relative border-t border-border/70 py-4">
        <div className="p-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <span key={item} className="flex items-center gap-10">
                  <span className="text-xs font-medium uppercase tracking-[0.35em] text-muted/80">
                    {item}
                  </span>
                  <svg className="h-2.5 w-2.5 text-accent/70" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
