import Image from "next/image";
import { projects } from "@/lib/data";
import Parallax from "../Parallax";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

export default function PProjects() {
  return (
    <section id="work" className="scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle num="03" label="Selected Work" />

        <div className="space-y-24 sm:space-y-36">
          {projects.map((project, i) => {
            const even = i % 2 === 0;
            return (
              <Reveal key={project.title} variant="up">
                <article className={`group relative grid items-center gap-8 lg:gap-14 ${even ? "lg:grid-cols-[1.35fr_1fr]" : "lg:grid-cols-[1fr_1.35fr]"}`}>
                  {/* Image */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    aria-label={`Visit ${project.title}`}
                    className={`relative block overflow-hidden rounded-3xl border border-border ${even ? "" : "lg:order-2"}`}
                  >
                    <div className="img-zoom relative aspect-[16/11]">
                      <Image
                        src={project.image}
                        alt={`${project.title} mockup`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 760px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-60" />
                  </a>

                  {/* Copy */}
                  <div className={even ? "" : "lg:order-1"}>
                    <Parallax speed={-0.03}>
                      <span className="p-outline font-serif text-7xl font-semibold leading-none sm:text-8xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mb-2 mt-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
                        {project.subtitle}
                      </p>
                      <h3 className="font-serif text-3xl font-semibold text-foreground transition-colors group-hover:text-accent sm:text-4xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border px-3.5 py-1 text-xs font-medium text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic mt-8 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent"
                      >
                        Visit Live Site
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 transition-all duration-300 group-hover:bg-accent group-hover:text-background">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </span>
                      </a>
                    </Parallax>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
