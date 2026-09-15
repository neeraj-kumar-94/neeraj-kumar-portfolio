import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

export type PortraitVariant = "none" | "platinum" | "slate" | "mono" | "natural";

// Studio backdrops for the cutout variants
const backdrops: Partial<Record<PortraitVariant, string>> = {
  platinum: "radial-gradient(120% 85% at 50% 18%, #f3f5f8 0%, #cfd5df 52%, #98a2b4 100%)",
  slate: "radial-gradient(115% 80% at 50% 22%, #6f82a3 0%, #3f4f6e 52%, #243150 100%)",
};

/** Portrait in a 4:5 frame.
 *  - "none": the cutout straight on the page — no frame, no backdrop.
 *  - "platinum": the cutout on a light silver studio backdrop, so a dark
 *    outfit reads clearly against the navy page.
 *  - "slate": the cutout on a mid-tone slate-blue backdrop — made for light outfits.
 *  - "mono" / "natural": the original studio photo, black & white or as shot.
 *  crop "close" zooms in to a head-and-shoulders framing.
 *  Children render on top — use them for floating sticker badges. */
export default function PortraitFrame({
  photo,
  cutout,
  alt,
  priority = false,
  sizes,
  className = "",
  variant = "platinum",
  crop = "half",
  children,
}: {
  photo: string;
  cutout: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  variant?: PortraitVariant;
  crop?: "half" | "close";
  children?: ReactNode;
}) {
  const zoom =
    crop === "close"
      ? "origin-top scale-[1.55] group-hover:scale-[1.6]"
      : "origin-bottom group-hover:scale-[1.03]";

  if (variant === "none") {
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
          {/* The cutout is cropped at the waist — dissolve that edge into the page */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
        style={backdrops[variant] ? { background: backdrops[variant] } : undefined}
      >
        {backdrops[variant] ? (
          <>
            {/* Edge vignette on the backdrop only — sits behind the figure */}
            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(130% 100% at 50% 40%, transparent 55%, rgba(10,17,31,0.28) 100%)",
              }}
            />
            <Image
              src={cutout}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className={`object-contain object-bottom transition-transform duration-[1200ms] ease-out [filter:contrast(1.05)_drop-shadow(0_24px_28px_rgba(10,17,31,0.35))] ${zoom}`}
            />
          </>
        ) : (
          <Image
            src={photo}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={`object-cover object-top transition-transform duration-[1200ms] ease-out ${zoom} ${
              variant === "mono"
                ? "[filter:grayscale(1)_contrast(1.15)_brightness(1.1)]"
                : "[filter:brightness(1.08)_contrast(1.04)]"
            }`}
          />
        )}

        <span className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
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
