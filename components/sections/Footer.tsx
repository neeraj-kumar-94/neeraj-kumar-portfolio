import { profile } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border pb-10 pt-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <Reveal variant="zoom">
          <a
            href={`mailto:${profile.email}`}
            className="p-fill-text block font-serif text-[clamp(2.6rem,8.5vw,7.5rem)] font-semibold uppercase leading-[1.05] tracking-tight"
          >
            Let&apos;s Work
            <br />
            Together
          </a>
        </Reveal>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex items-center gap-7">
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              LinkedIn
            </a>
            <a href="/resume" className="transition-colors hover:text-accent">
              Resume
            </a>
          </div>
          <a href="#top" className="transition-colors hover:text-accent">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
