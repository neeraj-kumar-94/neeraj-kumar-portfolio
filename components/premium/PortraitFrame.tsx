import Image from "next/image";

/** Cutout portrait staged like a studio shot: soft backdrop panel, key light
 *  from above, floor bounce, rim light along the figure, and a vignette. */
export default function PortraitFrame({
  src,
  alt,
  priority = false,
  sizes,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`p-portrait group relative ${className}`}>
      {/* Studio backdrop panel — sits behind the figure, head rises above it */}
      <div className="absolute inset-x-0 bottom-0 top-[18%] overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(180deg,#16203a_0%,#0f1830_55%,#0a111f_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_30px_70px_-30px_rgba(0,0,0,0.85)]">
        {/* Key light cone from the top */}
        <span
          className="absolute inset-x-0 top-0 h-3/4"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 0%, rgba(198,205,218,0.16) 0%, rgba(198,205,218,0.04) 45%, transparent 75%)",
          }}
        />
        {/* Floor bounce */}
        <span
          className="absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background:
              "radial-gradient(70% 100% at 50% 100%, rgba(198,205,218,0.14) 0%, transparent 70%)",
          }}
        />
        {/* Vignette */}
        <span
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(5,9,18,0.55) 100%)",
          }}
        />
      </div>

      {/* Figure */}
      <div className="relative aspect-[879/1100]" style={{ clipPath: "inset(-20% 0 0 0 round 0 0 2rem 2rem)" }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="p-portrait-img origin-bottom object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {/* Waist crop fades into the panel */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a111f] via-[#0a111f]/70 to-transparent" />
      </div>

      {/* Contact shadow on the floor */}
      <span
        className="pointer-events-none absolute inset-x-[12%] bottom-[2%] h-6 rounded-[50%] blur-md"
        style={{ background: "rgba(0,0,0,0.55)" }}
      />
    </div>
  );
}
