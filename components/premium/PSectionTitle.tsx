import Reveal from "../Reveal";

export default function PSectionTitle({ label }: { label: string }) {
  return (
    <Reveal variant="up">
      <div className="mb-14 sm:mb-20">
        <span className="mb-5 block h-px w-12 bg-accent" />
        <h2 className="font-serif text-4xl font-medium italic leading-tight text-foreground sm:text-6xl">
          {label}
        </h2>
      </div>
    </Reveal>
  );
}
