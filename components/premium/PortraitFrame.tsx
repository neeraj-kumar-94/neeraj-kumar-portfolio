import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/** Editorial portrait: the original studio photo in a tall frame, graded cool
 *  so its black backdrop melts into the navy page. Slow-drifting mist layers
 *  sit behind and around it, and the bottom dissolves into the page like fog.
 *  Children render on top — use them for floating sticker badges. */
export default function PortraitFrame({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`p-portrait group relative ${className}`}>
      {/* Drifting mist behind the frame */}
      <span className="p-mist p-mist-a pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full" />
      <span className="p-mist p-mist-b pointer-events-none absolute -right-20 bottom-16 h-80 w-80 rounded-full" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="p-portrait-img object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
        />

        {/* Cool grade — ties the photo's black backdrop to the navy page */}
        <span className="pointer-events-none absolute inset-0 bg-[#0a111f]/25 mix-blend-multiply" />

        {/* Fog: bottom dissolves into the page, left edge softens */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a111f] via-[#0a111f]/15 to-transparent" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a111f]/35 via-transparent to-transparent" />

        {/* Mist wisps inside the frame, drifting across the lower half */}
        <span className="p-mist p-mist-c pointer-events-none absolute -left-10 bottom-0 h-40 w-[140%] rounded-[50%]" />

        {/* Film grain */}
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <span className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.06]" />
      </div>

      {children}
    </div>
  );
}

/** Small floating badge, Framer-template style: tilted, softly bobbing. */
export function Sticker({
  children,
  className = "",
  rotate = -4,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  return (
    <span
      className={`p-sticker absolute z-[3] inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md ${className}`}
      style={{ "--r": `${rotate}deg`, animationDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </span>
  );
}
