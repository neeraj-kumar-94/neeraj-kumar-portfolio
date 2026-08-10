import Image from "next/image";
import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading eyebrow="Portfolio" title="Featured Projects" />
        </Reveal>

        {/* Stacked sticky cards — each project pins below the navbar and the
            next one slides up over it as you scroll */}
        <div className="space-y-10 lg:space-y-24">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="lg:sticky"
              style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
            >
              <article className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-xl transition-shadow duration-300 hover:shadow-2xl lg:min-h-[420px] lg:grid-cols-[1.15fr_1fr]">
                {/* Image */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title} live site`}
                  className="relative block overflow-hidden bg-background max-lg:aspect-[16/10] lg:h-full"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="mb-4 font-serif text-5xl font-semibold text-border transition-colors duration-300 group-hover:text-accent/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mb-1 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                    {project.subtitle}
                  </p>
                  <h3 className="mb-4 font-serif text-3xl font-semibold transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-muted">{project.description}</p>

                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-background px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-xl"
                  >
                    Visit Live Site
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
