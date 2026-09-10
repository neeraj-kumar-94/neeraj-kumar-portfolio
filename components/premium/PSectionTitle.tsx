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
      <div className="mb-14 flex items-end gap-6 sm:mb-20">
        <span className="p-outline font-serif text-6xl font-semibold leading-none sm:text-8xl">
          {num}
        </span>
        <div className="pb-1.5 sm:pb-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            — Section
          </p>
          <h2 className="p-gold font-serif text-3xl font-semibold leading-none sm:text-5xl">
            {label}
          </h2>
        </div>
        <span className="mb-2 hidden h-px flex-1 bg-gradient-to-r from-border to-transparent sm:mb-4 sm:block" />
      </div>
    </Reveal>
  );
}
