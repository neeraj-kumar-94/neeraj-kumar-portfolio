import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionTitle from "./SectionTitle";

function Projects({ projects }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <section
      id="projects"
      className="nk-projects w-full min-w-0 bg-slate-50 transition-colors duration-300 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <SectionTitle
        eyebrow="Recent Work"
        title="Projects built for clients and product ideas"
        subtitle="A mix of WordPress, Shopify, and frontend projects focused on real user outcomes."
      />

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="mb-6 flex items-center justify-end gap-3">
          <button
            ref={prevRef}
            type="button"
            className="nk-projects-prev grid h-11 w-11 place-content-center rounded-full border border-slate-300 bg-white text-slate-700 transition duration-300 hover:scale-105 hover:border-nkPrimary hover:text-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300"
            aria-label="Previous project"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="nk-projects-next grid h-11 w-11 place-content-center rounded-full border border-slate-300 bg-white text-slate-700 transition duration-300 hover:scale-105 hover:border-nkPrimary hover:text-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300"
            aria-label="Next project"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.pagination.el = paginationRef.current;
            swiper.params.pagination.clickable = true;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: paginationRef.current,
            clickable: true,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <article className="nk-project-card group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-nkSoft dark:border-slate-700 dark:bg-nkCard">
                <div className="absolute inset-0 bg-gradient-to-tr from-nkPrimary/0 via-transparent to-nkAccent/0 opacity-0 transition group-hover:opacity-100 group-hover:from-nkPrimary/10 group-hover:to-nkAccent/10" />
                <h3 className="relative text-xl font-semibold text-slate-900 dark:text-white">
                  {project.name}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={`${project.id}-${item}`}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-nkPrimary transition duration-300 hover:scale-[1.02] group-hover:gap-3 group-hover:bg-nkPrimary group-hover:text-white dark:bg-slate-800"
                >
                  Visit Project <ExternalLink size={16} />
                </a>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div ref={paginationRef} className="nk-projects-pagination mt-6 flex justify-center" />
      </motion.div>
      </div>
    </section>
  );
}

export default Projects;
