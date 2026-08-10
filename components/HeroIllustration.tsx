const codeLines = [
  { width: "55%", cls: "bg-accent/70", delay: "0s" },
  { width: "80%", cls: "bg-border", delay: "0.15s" },
  { width: "68%", cls: "bg-border", delay: "0.3s" },
  { width: "40%", cls: "bg-accent/40", delay: "0.45s" },
  { width: "74%", cls: "bg-border", delay: "0.6s" },
  { width: "58%", cls: "bg-border", delay: "0.75s" },
  { width: "32%", cls: "bg-accent/70", delay: "0.9s" },
];

const badges = [
  { label: "React.js", cls: "left-0 top-10 animate-float" },
  { label: "Next.js", cls: "-right-2 top-24 animate-float-delayed" },
  { label: "WordPress", cls: "-left-4 bottom-28 animate-float-delayed" },
  { label: "Shopify", cls: "right-2 -bottom-2 animate-float" },
];

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto hidden w-full max-w-md lg:block" aria-hidden="true">
      {/* Rotating dashed orbit */}
      <div className="animate-spin-slow absolute inset-0 m-auto h-[420px] w-[420px] rounded-full border-2 border-dashed border-accent/25" />
      <div className="absolute inset-0 m-auto h-[340px] w-[340px] rounded-full bg-accent/5" />

      {/* Code editor window */}
      <div className="animate-float-gentle relative mx-auto w-[330px] rounded-2xl border border-border bg-card shadow-2xl shadow-accent/10">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-[#f87171]" />
          <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
          <span className="h-3 w-3 rounded-full bg-[#34d399]" />
          <span className="ml-3 font-mono text-xs text-muted">portfolio.tsx</span>
        </div>
        <div className="space-y-3 px-5 py-6">
          {codeLines.map((line, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-4 font-mono text-[10px] text-muted/50">{i + 1}</span>
              <span
                className={`code-line h-2.5 rounded-full ${line.cls}`}
                style={{ width: line.width, animationDelay: line.delay }}
              />
            </div>
          ))}
          <div className="flex items-center gap-3 pt-1">
            <span className="w-4 font-mono text-[10px] text-muted/50">8</span>
            <span className="typing-caret !h-3" />
          </div>
        </div>
      </div>

      {/* Floating tech badges */}
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`absolute ${badge.cls} rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-accent shadow-lg`}
        >
          {badge.label}
        </span>
      ))}

      {/* Experience chip */}
      <div className="animate-float absolute -left-8 top-1/2 rounded-2xl border border-border bg-card px-5 py-3 shadow-xl">
        <p className="font-serif text-2xl font-semibold text-accent">4+</p>
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Years Exp.</p>
      </div>
    </div>
  );
}
