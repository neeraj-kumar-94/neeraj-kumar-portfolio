import type { Metadata } from "next";
import Link from "next/link";
import {
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume — Neeraj Kumar | Frontend Developer",
  description:
    "Resume of Neeraj Kumar — Frontend Developer specializing in WordPress, Shopify, React.js, and Next.js.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background py-10 print:bg-white print:py-0">
      {/* Toolbar — hidden in print/PDF */}
      <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          ← Back to Portfolio
        </Link>
        <a
          href="/Neeraj-Kumar-Resume.pdf"
          download
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-dark"
        >
          Download PDF
        </a>
      </div>

      {/* A4 sheet */}
      <div className="resume-sheet mx-auto max-w-[820px] bg-white px-10 py-9 shadow-xl print:max-w-none print:shadow-none">
        {/* Header */}
        <header className="border-b-2 border-accent pb-5">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground">
            {profile.name}
          </h1>
          <p className="mt-1 text-[15px] font-medium text-accent">
            Frontend Developer · WordPress &amp; Shopify Specialist · React.js / Next.js
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12.5px] text-muted">
            <span>{profile.location}</span>
            <span>{profile.phone}</span>
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              {profile.email}
            </a>
            <a href={profile.socials.linkedin} className="hover:text-accent">
              linkedin.com/in/neerajkumar94
            </a>
            <a href={profile.socials.github} className="hover:text-accent">
              github.com/neeraj-kumar-94
            </a>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-[1fr_15rem] gap-8 print:grid-cols-[1fr_14rem]">
          {/* Main column */}
          <div className="space-y-6">
            <section>
              <h2 className="resume-heading">Professional Summary</h2>
              <p className="text-[13px] leading-relaxed text-foreground/80">
                Frontend Developer with 4+ years of experience designing and building
                responsive, performance-driven, and visually engaging websites. Specialized in
                WordPress and Shopify development with strong proficiency in HTML5, CSS3,
                JavaScript, PHP, and React.js/Next.js. Proven track record delivering
                eCommerce platforms, corporate websites, and CMS-driven solutions across
                legal, retail, education, and consultancy sectors — translating mockups into
                pixel-perfect interfaces, integrating third-party tools, and optimizing
                performance and SEO.
              </p>
            </section>

            <section>
              <h2 className="resume-heading">Experience</h2>
              <div className="space-y-5">
                {experience.map((job) => (
                  <div key={job.company}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[14.5px] font-semibold text-foreground">
                        {job.role}
                      </h3>
                      <span className="shrink-0 text-[12px] font-medium text-accent">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-[12.5px] font-medium text-muted">
                      {job.company} · {job.location}
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {job.points.map((point) => (
                        <li
                          key={point.slice(0, 32)}
                          className="flex gap-2 text-[12.5px] leading-relaxed text-foreground/80"
                        >
                          <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="resume-heading">Key Projects</h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.title}>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[13.5px] font-semibold text-foreground">
                        {project.title}
                        <span className="ml-2 font-normal text-muted">
                          — {project.subtitle}
                        </span>
                      </h3>
                      <a
                        href={project.liveUrl}
                        className="shrink-0 text-[11.5px] font-medium text-accent hover:underline"
                      >
                        {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                      </a>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-foreground/75">
                      {project.description.split(". ")[0].replace(/\.$/, "")}. Stack:{" "}
                      {project.tech.join(", ")}.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <section>
              <h2 className="resume-heading">Core Skills</h2>
              <div className="space-y-3.5">
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-foreground/70">
                      {group.title}
                    </h3>
                    <p className="text-[12px] leading-relaxed text-foreground/75">
                      {group.skills.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="resume-heading">Education</h2>
              <div className="space-y-3">
                {education.map((item) => (
                  <div key={item.degree}>
                    <h3 className="text-[13px] font-semibold text-foreground">
                      {item.degree}
                    </h3>
                    <p className="text-[12px] text-muted">{item.institution}</p>
                    <p className="text-[11.5px] font-medium text-accent">{item.period}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="resume-heading">Additional</h2>
              <ul className="space-y-1.5">
                {[
                  "Available for full-time & remote roles",
                  "Passionate about UI/UX design",
                  "Continuously exploring modern frontend frameworks",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-[12px] leading-relaxed text-foreground/75"
                  >
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-accent" />
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
