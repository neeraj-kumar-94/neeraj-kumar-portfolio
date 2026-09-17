import { profile } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";
import TextReveal from "@/components/effects/TextReveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border pb-10 pt-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <a
          href={`mailto:${profile.email}`}
          className="p-fill-text block font-serif text-[clamp(2.6rem,8.5vw,7.5rem)] font-semibold uppercase leading-[1.05] tracking-tight"
        >
          <TextReveal text="Let's Work" className="block" stagger={0.1} />
          <TextReveal text="Together" className="block" delay={0.12} stagger={0.1} />
        </a>

        <Reveal variant="up" delay={120}>
          <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 text-sm text-muted sm:flex-row">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <div className="flex items-center gap-7">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-signal">
                GitHub
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-signal">
                LinkedIn
              </a>
              <a href="/resume" className="transition-colors hover:text-signal">
                Resume
              </a>
            </div>
            <a href="#top" className="transition-colors hover:text-signal">
              Back to Top ↑
            </a>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
