import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const socials = [
  {
    label: "GitHub",
    href: profile.socials.github,
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
      />
    ),
  },
  {
    label: "LinkedIn",
    href: profile.socials.linkedin,
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    ),
  },
  {
    label: "Portfolio",
    href: profile.socials.portfolio,
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.25 12a15.6 15.6 0 01.337-3.25h6.826c.212 1.021.337 2.11.337 3.25s-.125 2.229-.337 3.25H8.587A15.6 15.6 0 018.25 12zm.72 4.75a14.1 14.1 0 001.087 2.756c.351.646.72 1.11.998 1.244.048.023.09.037.126.044a8.28 8.28 0 01-5.19-4.044h2.98zm-3.47-1.5h3.253a17.1 17.1 0 010-6.5H5.5A8.24 8.24 0 004.5 12c0 1.153.236 2.25.999 3.25h.001zm5.5-8h-2.03a14.1 14.1 0 011.087-2.756c.351-.646.72-1.11.998-1.244a.62.62 0 01.126-.044A8.28 8.28 0 006.02 7.25h4.98zm2.03 0h2.95a8.28 8.28 0 00-5.19-4.044c.036.007.078.021.126.044.278.134.647.598.998 1.244.44.808.813 1.749 1.116 2.756zm3.47 1.5h3.253c.34 1.021.526 2.11.526 3.25s-.186 2.229-.526 3.25H16.5a17.1 17.1 0 000-6.5zm-.354 8h2.98a8.28 8.28 0 01-5.19 4.044.62.62 0 00.126-.044c.278-.134.647-.598.998-1.244.44-.808.813-1.749 1.086-2.756z"
      />
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Let's Work Together" />
        </Reveal>

        <Reveal delay={80}>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m currently open to full-time and remote opportunities. Whether you have a
            project in mind or just want to say hello — my inbox is always open.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-block rounded-full bg-accent px-10 py-4 font-medium text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-xl"
            >
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="inline-block rounded-full border border-border bg-card px-10 py-4 font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              {profile.phone}
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-muted transition-all hover:-translate-y-1 hover:border-accent hover:text-accent"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted">
            Based in {profile.location} · Available for full-time & remote roles
          </p>
        </Reveal>
      </div>
    </section>
  );
}
