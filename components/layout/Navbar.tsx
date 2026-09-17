"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Expertise" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Journey" },
  { href: "#mentors", label: "Mentors" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  // Slide the bar away when scrolling down, bring it back on the way up
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    if (open) return;
    setHidden(y > lastY.current && y > 260);
    lastY.current = y;
  });

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
    <motion.header
      initial={{ y: "-100%" }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: hidden ? 0 : 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled || open
          ? "border-border/60 bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-serif text-xl font-semibold tracking-tight text-foreground">
          {profile.name.split(" ")[0]}
          <span className="text-accent">.</span>
        </a>

        {/* Desktop links — the active pill glides between items */}
        <ul className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative block rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                  active === link.href ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-accent/30 bg-accent/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-5">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="magnetic rounded-full border border-accent/50 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background"
          >
            Let&apos;s Talk
          </motion.a>

          {/* Mobile toggle — the bars fold into a cross */}
          <button
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="flex flex-col items-center gap-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-foreground"
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-foreground"
                animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-foreground"
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
          >
            <ul className="px-6 pb-6 pt-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                      active === link.href ? "text-accent" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
