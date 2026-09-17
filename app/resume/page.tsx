import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { education, experience, profile, projects, skillGroups } from "@/lib/data";
import "./resume.css";

export const metadata: Metadata = {
  title: "Resume — Neeraj Kumar | Frontend Developer",
  description:
    "Resume of Neeraj Kumar — Frontend Developer specializing in WordPress, Shopify, React.js, and Next.js.",
};

const additional = [
  "Available for full-time & remote roles",
  "Passionate about UI/UX design",
  "Continuously exploring modern frontend frameworks",
];

const domain = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3.5 flex items-center gap-3 border-b border-border pb-2 font-serif text-[18px] font-medium italic text-foreground">
      <span className="h-px w-5 bg-accent" />
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const [first, last] = profile.name.split(" ");

  return (
    <div className="resume-page min-h-screen py-10 print:py-0">
      {/* Toolbar — hidden in print/PDF */}
      <div className="no-print mx-auto mb-6 flex max-w-[880px] items-center justify-between px-6">
        <Link href="/" className="text-sm font-medium text-muted transition-colors hover:text-signal">
          ← Back to Portfolio
        </Link>
        <a
          href="/Neeraj-Kumar-Resume.pdf"
          download
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent transition hover:brightness-110"
        >
          Download PDF
        </a>
      </div>

      {/* A4 sheet — navy card on screen, plain paper in print */}
      <div className="resume-sheet mx-auto max-w-[880px] border-border bg-card px-6 py-8 sm:rounded-[1.75rem] sm:border sm:px-11 sm:py-10 print:max-w-none print:rounded-none print:border-0">
        {/* Header */}
        <header className="border-b border-border pb-6">
          <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            {first} <span className="p-gold pr-2 italic">{last}</span>
          </h1>
          <p className="mt-2 text-[11.5px] font-semibold uppercase tracking-[0.26em] text-accent">
            Frontend Developer · WordPress · Shopify · React.js / Next.js
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-muted">
            <span>{profile.location}</span>
            <span>{profile.phone}</span>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-signal">
              {profile.email}
            </a>
            <a href={profile.socials.linkedin} className="transition-colors hover:text-signal">
              {domain(profile.socials.linkedin)}
            </a>
            <a href={profile.socials.github} className="transition-colors hover:text-signal">
              {domain(profile.socials.github)}
            </a>
          </div>
        </header>

        <div className="mt-7 grid grid-cols-1 gap-9 md:grid-cols-[1fr_15.5rem] print:grid-cols-[1fr_14.5rem]">
          {/* Main column */}
          <div className="space-y-7">
            <section>
              <Heading>Professional Summary</Heading>
              <p className="text-[14px] leading-relaxed text-foreground/90">
                Frontend Developer with 4+ years of experience designing and building
                responsive, performance-driven, and visually engaging websites. Specialized in
                WordPress and Shopify development with strong proficiency in HTML5, CSS3,
                JavaScript, PHP, and React.js/Next.js. Proven track record of delivering
                eCommerce platforms, corporate websites, and CMS-driven solutions across the
                legal, retail, education, and consultancy sectors — translating mockups into
                pixel-perfect interfaces, integrating third-party tools, and optimizing
                performance and SEO.
              </p>
            </section>

            <section>
              <Heading>Experience</Heading>
              <div className="space-y-5">
                {experience.map((job) => (
                  <div key={job.company}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      <h3 className="text-[15.5px] font-semibold text-foreground">{job.role}</h3>
                      <span className="shrink-0 text-[13px] font-medium text-accent">{job.period}</span>
                    </div>
                    <p className="text-[13.5px] text-muted">
                      {job.company} · {job.location}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {job.points.map((point) => (
                        <li
                          key={point.slice(0, 32)}
                          className="flex gap-2.5 text-[13.5px] leading-relaxed text-foreground/90"
                        >
                          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Heading>Key Projects</Heading>
              <div className="space-y-3.5">
                {projects.map((project) => (
                  <div key={project.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                      <h3 className="text-[14.5px] font-semibold text-foreground">
                        {project.title}
                        <span className="font-normal text-muted"> — {project.subtitle}</span>
                      </h3>
                      <a
                        href={project.liveUrl}
                        className="shrink-0 text-[12.5px] font-medium text-accent hover:underline"
                      >
                        {domain(project.liveUrl)}
                      </a>
                    </div>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-foreground/90">
                      {project.result}{" "}
                      <span className="text-muted">Stack: {project.tech.join(", ")}.</span>
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-7">
            <section>
              <Heading>Core Skills</Heading>
              <div className="space-y-3.5">
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="mb-1 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-foreground">
                      {group.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-foreground/90">{group.skills.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Heading>Education</Heading>
              <div className="space-y-3">
                {education.map((item) => (
                  <div key={item.degree}>
                    <h3 className="text-[14px] font-semibold text-foreground">{item.degree}</h3>
                    <p className="text-[13px] text-muted">{item.institution}</p>
                    <p className="text-[12.5px] font-medium text-accent">{item.period}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Heading>Additional</Heading>
              <ul className="space-y-1.5">
                {additional.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13px] leading-relaxed text-foreground/90">
                    <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
