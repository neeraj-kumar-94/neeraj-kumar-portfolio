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

const domain = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const featuredProjects = projects.filter((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

/** The terms a recruiter scans for. Marking them is what the reference resume
 *  does, and it is the whole reason that layout reads fast. Keep the list tight:
 *  highlighting everything is the same as highlighting nothing. */
const TERMS = [
  "WordPress",
  "Shopify",
  "React.js",
  "Next.js",
  "Liquid",
  "Elementor",
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "PHP",
  "Tailwind CSS",
  "headless",
  "subscription plans",
  "subscriptions",
  "custom theme",
  "custom themes",
  "payment gateways",
  "HubSpot",
  "LeadSquared",
  "CRM",
  "automated email workflows",
  "Core Web Vitals",
  "SEO",
  "performance",
  "server-rendered",
  "CMS-driven",
  "responsive",
  "cross-browser",
  "reusable UI components",
  "pixel-accurate",
  "eCommerce",
  "20+ production websites",
  "4+ years",
];

const PATTERN = new RegExp(
  `(${TERMS.sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "gi"
);

/** Splits a line and wraps the scannable terms in a highlight. */
function Marked({ children }: { children: string }) {
  const parts = children.split(PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        PATTERN.test(part) && i % 2 === 1 ? (
          <mark key={i} className="hl">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4 first:mt-0">
      <h2 className="resume-heading">{title}</h2>
      {children}
    </section>
  );
}

/** Two-line entry: bold title and right-aligned dates, then italic detail
 *  and right-aligned place. The layout the reference resume uses. */
function EntryHead({
  left,
  right,
  subLeft,
  subRight,
}: {
  left: ReactNode;
  right: ReactNode;
  subLeft?: ReactNode;
  subRight?: ReactNode;
}) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[14px] font-bold">{left}</h3>
        <span className="shrink-0 text-[13px] font-bold">{right}</span>
      </div>
      {(subLeft || subRight) && (
        <div className="flex items-baseline justify-between gap-4 italic">
          <p className="text-[13px]">{subLeft}</p>
          <span className="shrink-0 text-[12.5px]">{subRight}</span>
        </div>
      )}
    </>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 space-y-[3px] pl-[18px]">
      {items.map((point) => (
        <li key={point.slice(0, 36)} className="resume-bullet text-[12.8px] leading-[1.42]">
          <Marked>{point}</Marked>
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  const [first, last] = profile.name.split(" ");

  return (
    <div className="resume-page min-h-screen py-10 print:py-0">
      {/* Toolbar — hidden in print/PDF */}
      <div className="no-print mx-auto mb-6 flex max-w-[900px] items-center justify-between px-6">
        <Link href="/" className="meta meta-sm text-muted transition-colors hover:text-signal">
          ← Back to portfolio
        </Link>
        <a
          href="/Neeraj-Kumar-Resume.pdf"
          download
          className="meta meta-sm rounded-full bg-accent px-6 py-2.5 text-on-accent transition hover:brightness-110"
        >
          Download PDF
        </a>
      </div>

      {/* The sheet is always paper, whichever theme the site is in: a resume
          should read like a document, not like the website around it. */}
      <article className="resume-sheet mx-auto max-w-[900px] px-8 py-9 sm:px-12 sm:py-11 print:max-w-none">
        <header className="text-center">
          <h1 className="resume-name">
            {first} {last}
          </h1>
          <p className="mt-1 text-[13px]">{profile.location}</p>
          <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12.5px]">
            <span>{profile.phone}</span>
            <a className="resume-link" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="resume-link" href={profile.socials.linkedin}>
              LinkedIn
            </a>
            <a className="resume-link" href={profile.socials.github}>
              GitHub
            </a>
            <a className="resume-link" href="https://neeraj-kumar-portfolio-eight.vercel.app/">
              Portfolio
            </a>
          </p>
        </header>

        <Section title="Summary">
          <p className="text-[12.8px] leading-[1.45]">
            <Marked>
              Frontend Developer with 4+ years building responsive, performance-driven websites and eCommerce storefronts. Specialized in WordPress and Shopify, with production work in React.js and Next.js. Delivered 20+ production websites across retail, legal, education, consultancy and non-profit clients.
            </Marked>
          </p>
        </Section>

        <Section title="Experience">
          <div className="space-y-2.5">
            {experience.map((job) => (
              <div key={job.company}>
                <EntryHead
                  left={job.company}
                  right={job.period}
                  subLeft={job.role}
                  subRight={job.location}
                />
                {/* Four bullets per role keeps the page to one side of A4 */}
                <Bullets items={job.points.slice(0, 4)} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Projects">
          <div className="space-y-2.5">
            {featuredProjects.map((project) => (
              <div key={project.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[13.5px] font-bold">
                    {project.title}
                    <span className="font-normal italic"> | {project.tech.join(", ")}</span>
                  </h3>
                  <a href={project.liveUrl} className="resume-link shrink-0 text-[12.5px] font-bold">
                    Live Site
                  </a>
                </div>
                <Bullets items={project.bullets ?? []} />
              </div>
            ))}

            <p className="text-[12.8px] leading-[1.45]">
              <span className="font-bold">Also delivered: </span>
              {otherProjects.map((project, i) => (
                <span key={project.title}>
                  {i > 0 && " · "}
                  {project.title}
                  <span className="italic"> ({domain(project.liveUrl)})</span>
                </span>
              ))}
            </p>
          </div>
        </Section>

        <Section title="Technical Skills">
          <div className="space-y-[3px]">
            {skillGroups.map((group) => (
              <p key={group.title} className="text-[12.8px] leading-[1.45]">
                <span className="font-bold">{group.title}: </span>
                <Marked>{group.skills.join(", ")}</Marked>
              </p>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="space-y-1.5">
            {education.map((item) => (
              <EntryHead
                key={item.degree}
                left={item.institution}
                right={item.period}
                subLeft={item.degree}
                subRight={item.institution.includes("Meerut") ? "Meerut, India" : "Shamli, India"}
              />
            ))}
          </div>
        </Section>
      </article>
    </div>
  );
}
