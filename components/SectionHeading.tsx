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
      <div className="heading-line mx-auto mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-accent/40 via-accent to-accent/40" />
    </div>
  );
}
