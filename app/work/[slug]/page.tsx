import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, projects, slugify } from "@/lib/data";
import Reveal from "@/components/effects/Reveal";
import TextReveal from "@/components/effects/TextReveal";
import SmoothScroll from "@/components/effects/SmoothScroll";
import ScrollProgress from "@/components/effects/ScrollProgress";
import CursorFx from "@/components/effects/CursorFx";
import MagneticFx from "@/components/effects/MagneticFx";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

type Params = { params: Promise<{ slug: string }> };

const find = (slug: string) => {
  const study = caseStudies.find((c) => c.slug === slug);
  const project = projects.find((p) => slugify(p.title) === slug);
  return study && project ? { study, project } : null;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const found = find(slug);
  if (!found) return { title: "Case study — Neeraj Kumar" };

  return {
    title: `${found.project.title} — Case study | Neeraj Kumar`,
    description: found.study.context.slice(0, 155),
  };
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">{label}</p>
      <p className="mt-1.5 font-serif text-base italic text-foreground">{value}</p>
    </div>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const found = find(slug);
  if (!found) notFound();

  const { study, project } = found;
  const others = caseStudies.filter((c) => c.slug !== slug);

  return (
    <div className="p-grain min-h-screen">
      <SmoothScroll />
      <ScrollProgress />
      <CursorFx />
      <MagneticFx />
      <Navbar />

      <main id="main" className="pt-32">
        {/* Header */}
        <header className="mx-auto max-w-5xl px-6">
          <Link
            href="/#work"
            className="link-underline text-[11px] font-semibold uppercase tracking-[0.2em] text-muted"
          >
            ← All work
          </Link>

          <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">
            {project.subtitle}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-foreground">
            <TextReveal text={project.title} trigger="load" stagger={0.08} />
          </h1>

          <Reveal variant="up" delay={120}>
            <p className="measure-wide mt-7 text-lg leading-relaxed text-muted">{study.context}</p>
          </Reveal>

          <Reveal variant="up" delay={200}>
            <div className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-7 sm:grid-cols-4">
              <Meta label="Role" value={study.role} />
              <Meta label="Sector" value={study.sector} />
              <Meta label="Scope" value={study.duration} />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">Live</p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-1.5 inline-flex items-center gap-1.5 font-serif text-base italic text-foreground"
                >
                  Visit site
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </header>

        {/* Cover */}
        <Reveal variant="zoom" delay={120} className="mx-auto mt-16 max-w-6xl px-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-border bg-card">
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* The problem */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <Reveal variant="up">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">The problem</p>
            <p className="measure-wide mt-5 font-serif text-[1.6rem] font-medium leading-snug text-foreground sm:text-[2rem]">
              {study.challenge}
            </p>
          </Reveal>
        </section>

        {/* Decisions */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <Reveal variant="up">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">Decisions I made</p>
          </Reveal>

          <div className="mt-10 space-y-5">
            {study.decisions.map((decision, i) => (
              <Reveal key={decision.title} variant="up" delay={i * 90}>
                <article className="rounded-2xl border border-border bg-card/60 p-7 backdrop-blur transition-colors duration-500 hover:border-signal/40 sm:p-9">
                  <h2 className="font-serif text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                    {decision.title}
                  </h2>
                  <p className="measure mt-3 leading-relaxed text-muted">{decision.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* What I built + outcome */}
        <section className="mx-auto mt-24 max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal variant="left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">What I built</p>
              <ul className="mt-6 space-y-3">
                {study.build.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">What changed</p>
              <p className="mt-6 font-serif text-xl leading-relaxed text-foreground sm:text-2xl">{study.outcome}</p>

              <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] font-medium tracking-wide text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Next case studies */}
        <section className="mx-auto mt-28 max-w-5xl px-6">
          <Reveal variant="up">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted">More case studies</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((other) => {
                const otherProject = projects.find((p) => slugify(p.title) === other.slug);
                return (
                  <Link
                    key={other.slug}
                    href={`/work/${other.slug}`}
                    className="group rounded-2xl border border-border bg-card/60 p-7 transition-colors duration-500 hover:border-signal/40"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-signal">
                      {otherProject?.subtitle}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-foreground transition-colors group-hover:text-signal">
                      {otherProject?.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </section>
      </main>

      <div className="mt-28">
        <Footer />
      </div>
    </div>
  );
}
