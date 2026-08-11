const items = [
  "WordPress",
  "Shopify",
  "React.js",
  "Next.js",
  "eCommerce",
  "SEO Optimization",
  "UI / UX",
  "Performance",
  "Responsive Design",
  "Custom Themes",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-5">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap pr-10">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span key={item} className="flex items-center gap-10">
                <span className="font-serif text-lg font-medium text-muted transition-colors hover:text-accent">
                  {item}
                </span>
                <svg className="h-3 w-3 text-accent/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card to-transparent" />
    </div>
  );
}
