"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Journey" },
  { href: "#mentors", label: "Mentors" },
  { href: "#contact", label: "Contact" },
];

export default function PNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scroll spy — highlight the link of the section currently in view
  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="animate-nav-in fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-serif text-xl font-semibold tracking-tight text-foreground">
          {profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:text-accent ${
                  active === link.href ? "nav-link-active text-accent" : "text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="#contact"
            className="magnetic rounded-full border border-accent/50 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background"
          >
            Let&apos;s Talk
          </a>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-border bg-background/95 px-6 pb-6 pt-2 backdrop-blur-md lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                  active === link.href ? "text-accent" : "text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
