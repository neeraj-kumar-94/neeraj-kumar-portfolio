import Image from "next/image";

/** Editorial portrait: the original studio photo in a tall frame, graded
 *  cool so its black backdrop melts into the navy page, with soft edge
 *  fades and grain — no artificial staging. */
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
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="p-portrait-img object-cover object-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />

        {/* Cool grade — ties the photo's black backdrop to the navy page */}
        <span className="pointer-events-none absolute inset-0 bg-[#0a111f]/25 mix-blend-multiply" />

        {/* Edge fades: bottom melts into the page, top-left keeps the light on the face */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a111f] via-[#0a111f]/10 to-transparent" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a111f]/40 via-transparent to-transparent" />

        {/* Film grain */}
        <span
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Hairline inner edge */}
        <span className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.06]" />
      </div>
    </div>
  );
}
