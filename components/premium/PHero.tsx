import Image from "next/image";
import { premiumCopy, profile } from "@/lib/data";
import Parallax from "../Parallax";
import PGreeting from "./PGreeting";

const marqueeItems = [...profile.typedRoles, "Based in India", "Available Worldwide"];

export default function PHero() {
  const [first, last] = profile.name.split(" ");

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden pt-24">
      {/* Ambient glow */}
      <Parallax speed={0.2} className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
        <div className="p-glow h-[620px] w-[900px] max-w-[100vw]" />
      </Parallax>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
          {/* Left — giant type */}
          <div>
            <p
              className="animate-fade-up mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-muted"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <PGreeting /> · Available for Work
            </p>

            <h1 className="font-serif font-semibold uppercase leading-[0.95] tracking-tight">
              <span className="word-mask block">
                <span
                  className="word-hero block text-[clamp(3.5rem,10vw,9rem)] text-foreground"
                  style={{ animationDelay: "0.25s" }}
                >
                  {first}
                </span>
              </span>
              <span className="word-mask block">
                <span
                  className="word-hero p-outline block text-[clamp(3.5rem,10vw,9rem)]"
                  style={{ animationDelay: "0.4s" }}
                >
                  {last}
                </span>
              </span>
            </h1>

            <div
              className="animate-fade-up mt-8 flex max-w-xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
              style={{ animationDelay: "0.6s" }}
            >
              <p className="max-w-md leading-relaxed text-muted">{premiumCopy.tagline}</p>
            </div>

            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center gap-5"
              style={{ animationDelay: "0.75s" }}
            >
              <a
                href="#work"
                className="btn-shine magnetic rounded-full bg-accent px-9 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-background hover:bg-accent-dark"
              >
                Selected Work
              </a>
              <a
                href="#contact"
                className="magnetic rounded-full border border-border px-9 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:border-accent hover:text-accent"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right — portrait with hover swap */}
          <div className="animate-fade-up relative mx-auto hidden w-full max-w-sm lg:block" style={{ animationDelay: "0.5s" }}>
            <Parallax speed={0.06}>
              <div className="group relative">
                <div className="absolute -inset-3 rounded-3xl border border-accent/25" />
                <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-3xl bg-accent/10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
                  <Image
                    src="/profile/neeraj-arms-crossed.jpg"
                    alt="Neeraj Kumar"
                    fill
                    priority
                    sizes="384px"
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <Image
                    src="/profile/neeraj-smile.jpg"
                    alt="Neeraj Kumar smiling"
                    fill
                    sizes="384px"
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                </div>
                <span className="absolute bottom-5 left-5 z-[2] rounded-full border border-accent/40 bg-background/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
                  {profile.role}
                </span>
              </div>
            </Parallax>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative mt-16 border-t border-border/70 py-5">
        <div className="p-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <span key={item} className="flex items-center gap-8">
                  <span className="font-serif text-2xl font-medium uppercase tracking-wide text-muted/70">
                    {item}
                  </span>
                  <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="currentColor">
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
