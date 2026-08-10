import { profile } from "@/lib/data";
import HeroIllustration from "./HeroIllustration";
import TypedRoles from "./TypedRoles";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div
        className="animate-float pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />
      <div
        className="animate-float-delayed pointer-events-none absolute -bottom-56 -left-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="max-w-3xl">
          <p className="animate-fade-up mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent">
            WordPress · Shopify · React.js · Next.js
          </p>
          <h1
            className="animate-fade-up font-serif text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "100ms" }}
          >
            Hello, I&apos;m
            <br />
            <span className="text-accent">{profile.name}</span>
          </h1>
          <p
            className="animate-fade-up mt-5 h-8 text-xl font-medium sm:text-2xl"
            style={{ animationDelay: "180ms" }}
          >
            <TypedRoles />
          </p>
          <p
            className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "260ms" }}
          >
            {profile.tagline}
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "340ms" }}
          >
            <a
              href="#projects"
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-xl"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-card px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
          <HeroIllustration />
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
        aria-label="Scroll to about section"
      >
        <svg className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
