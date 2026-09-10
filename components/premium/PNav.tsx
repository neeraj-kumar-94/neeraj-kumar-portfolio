import Link from "next/link";
import { profile } from "@/lib/data";

export default function PNav() {
  return (
    <header className="animate-nav-in fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-serif text-xl font-semibold tracking-tight text-foreground">
          {profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
          >
            Classic ↗
          </Link>
          <a
            href="#contact"
            className="magnetic rounded-full border border-accent/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background"
          >
            Let&apos;s Talk
          </a>
        </div>
      </nav>
    </header>
  );
}
