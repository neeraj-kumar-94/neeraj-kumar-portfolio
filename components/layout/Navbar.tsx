"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LocalTime from "@/components/ui/LocalTime";

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
  const pathname = usePathname();
  const onHome = pathname === "/";
  // Section links have to jump home first when you are reading a case study
  const to = (hash: string) => (onHome ? hash : `/${hash}`);

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
        <div className="flex items-center gap-4">
          <Link href={to("#top")} className="font-serif text-xl font-semibold tracking-tight text-foreground">
          {profile.name.split(" ")[0]}
          <span className="text-signal">.</span>
        </Link>
          <span className="hidden h-3 w-px bg-border sm:block" />
          <span className="hidden sm:block"><LocalTime /></span>
        </div>

        {/* Desktop links — the active pill glides between items */}
        <ul className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={to(link.href)}
                className={`meta meta-sm relative block rounded-full px-4 py-2 transition-colors ${
                  active === link.href ? "text-signal" : "text-muted hover:text-foreground"
                }`}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-signal/30 bg-signal/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Recruiters look for the resume in the header, not the footer */}
          <Link
            href="/resume"
            className="meta meta-sm hidden text-muted transition-colors hover:text-signal sm:block"
          >
            Resume
          </Link>

          <ThemeToggle />

          <motion.a
            href={to("#contact")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="magnetic meta meta-sm rounded-full border border-signal/50 px-5 py-2 text-signal transition-colors hover:bg-signal hover:text-background"
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
                    href={to(link.href)}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:text-signal ${
                      active === link.href ? "text-signal" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 + links.length * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium uppercase tracking-[0.15em] text-muted transition-colors hover:text-signal"
                >
                  Resume
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
