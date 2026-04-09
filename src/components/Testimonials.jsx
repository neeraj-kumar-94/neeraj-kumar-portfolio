import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionTitle from "./SectionTitle";

function Testimonials({ testimonials }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <section
      id="testimonials"
      className="nk-testimonials w-full min-w-0 bg-white transition-colors duration-300 dark:bg-nkBg"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <SectionTitle
        eyebrow="Testimonials"
        title="What clients and mentors say"
        subtitle="Feedback from collaborators I have worked with on design and frontend delivery."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="mb-6 flex items-center justify-end gap-3">
          <button
            ref={prevRef}
            type="button"
            className="nk-testimonial-prev grid h-11 w-11 place-content-center rounded-full border border-slate-300 bg-slate-50 text-slate-700 transition duration-300 hover:scale-105 hover:border-nkPrimary hover:text-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            ref={nextRef}
            type="button"
            className="nk-testimonial-next grid h-11 w-11 place-content-center rounded-full border border-slate-300 bg-slate-50 text-slate-700 transition duration-300 hover:scale-105 hover:border-nkPrimary hover:text-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300"
            aria-label="Next testimonial"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.params.pagination.el = paginationRef.current;
            swiper.params.pagination.clickable = true;
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          pagination={{ el: paginationRef.current, clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 900: { slidesPerView: 2 } }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <article className="nk-testimonial-card h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-nkCard">
                <Quote className="text-nkPrimary" size={24} />
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">{item.feedback}</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="h-12 w-12 rounded-full border border-slate-200 object-cover dark:border-slate-600"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div ref={paginationRef} className="nk-testimonials-pagination mt-6 flex justify-center" />
      </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
