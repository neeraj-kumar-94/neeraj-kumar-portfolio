export default function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-16 bg-accent" />
    </div>
  );
}
