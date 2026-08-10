const skills = [
  { label: "WordPress", width: "95%" },
  { label: "Shopify", width: "90%" },
  { label: "HTML · CSS · JS", width: "92%" },
  { label: "React / Next.js", width: "78%" },
];

export default function AboutIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-sm" aria-hidden="true">
      {/* Backdrop accents */}
      <div className="absolute -left-6 -top-6 h-24 w-24 rounded-2xl border-2 border-accent/30" />
      <div className="animate-float-delayed absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-accent/10" />

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
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 font-serif text-xl font-semibold text-accent">
              NK
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-32 rounded-full bg-foreground/20" />
              <div className="h-2 w-24 rounded-full bg-accent/50" />
            </div>
          </div>

          <div className="space-y-4">
            {skills.map((skill, i) => (
              <div key={skill.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted">{skill.label}</span>
                  <span className="text-[10px] font-semibold text-accent">{skill.width}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-background">
                  <div
                    className="skill-bar h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                    style={{ width: skill.width, animationDelay: `${0.2 + i * 0.15}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <span className="animate-float absolute -right-6 top-16 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-accent shadow-lg">
        Pixel Perfect
      </span>
      <span className="animate-float-delayed absolute -left-8 bottom-16 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-accent shadow-lg">
        SEO Ready
      </span>
    </div>
  );
}
