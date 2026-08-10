const services = [
  { label: "WordPress Development", note: "Elementor · Custom Themes" },
  { label: "Shopify eCommerce", note: "Liquid · Custom Storefronts" },
  { label: "React / Next.js Interfaces", note: "Modern, Component-driven UI" },
  { label: "SEO & Performance", note: "Fast, Search-ready Websites" },
];

export default function AboutIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-sm" aria-hidden="true">
      {/* Backdrop accents */}
      <div className="absolute -left-4 -top-4 h-20 w-20 rounded-2xl border-2 border-accent/30 sm:-left-6 sm:-top-6 sm:h-24 sm:w-24" />
      <div className="animate-float-delayed absolute -bottom-6 -right-4 h-28 w-28 rounded-full bg-accent/10 sm:-right-8 sm:-bottom-8 sm:h-32 sm:w-32" />

      {/* Browser window */}
      <div className="animate-float-gentle relative rounded-2xl border border-border bg-card shadow-2xl shadow-accent/10">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-[#f87171]" />
          <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
          <span className="h-3 w-3 rounded-full bg-[#34d399]" />
          <span className="ml-3 flex-1 rounded-full bg-background px-3 py-1 font-mono text-[10px] text-muted">
            neeraj.dev
          </span>
        </div>

        <div className="px-6 py-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 font-serif text-xl font-semibold text-accent">
              NK
            </div>
            <div>
              <p className="font-serif text-lg font-semibold leading-tight">Neeraj Kumar</p>
              <p className="text-xs font-medium text-accent">Frontend Developer</p>
            </div>
          </div>

          <ul className="space-y-4">
            {services.map((service, i) => (
              <li
                key={service.label}
                className="service-item flex items-start gap-3"
                style={{ animationDelay: `${0.25 + i * 0.18}s` }}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    className="h-3.5 w-3.5 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{service.label}</p>
                  <p className="text-xs text-muted">{service.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating chips */}
      <span className="animate-float absolute -right-2 top-14 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-accent shadow-lg sm:-right-6 sm:top-16">
        Pixel Perfect
      </span>
      <span className="animate-float-delayed absolute -left-3 bottom-14 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-accent shadow-lg sm:-left-8 sm:bottom-16">
        SEO Ready
      </span>
    </div>
  );
}
