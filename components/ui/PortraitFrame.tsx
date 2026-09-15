import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/** Background-free portrait: the cutout sits straight on the page in a 4:5 box,
 *  with its waist-cropped bottom edge dissolving into the background.
 *  Children render on top — use them for floating sticker badges. */
export default function PortraitFrame({
  cutout,
  alt,
  priority = false,
  sizes,
  className = "",
  children,
}: {
  cutout: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`group relative ${className}`}>
      <div className="relative aspect-[4/5]">
        <Image
          src={cutout}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="origin-bottom object-contain object-bottom transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
      {children}
    </div>
  );
}

/** Small floating badge: tilted, softly bobbing. */
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
