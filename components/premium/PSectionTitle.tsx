import Reveal from "../Reveal";

export default function PSectionTitle({
  num,
  label,
}: {
  num: string;
  label: string;
}) {
  return (
    <Reveal variant="up">
      <div className="relative mb-14 sm:mb-20">
        {/* Ghost number in the background */}
        <span className="p-outline pointer-events-none absolute -top-8 right-0 font-serif text-[7rem] font-semibold leading-none opacity-60 sm:text-[10rem]" aria-hidden="true">
          {num}
        </span>

        <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
          <span className="inline-block h-px w-10 bg-accent" />
          {num} — {label}
        </p>
        <h2 className="font-serif text-4xl font-medium italic leading-tight text-foreground sm:text-6xl">
          {label}
        </h2>
      </div>
    </Reveal>
  );
}
