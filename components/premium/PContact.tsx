"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-xl border border-border bg-card px-5 py-4 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent";

export default function PContact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `Portfolio Inquiry from ${data.name || "Visitor"}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle num="06" label="Get In Touch" />

        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          {/* Left — pitch + direct contacts */}
          <Reveal variant="left">
            <p className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
              Have a project in mind, or a role where I&apos;d fit?
              <span className="text-accent"> Let&apos;s talk.</span>
            </p>
            <p className="mt-5 leading-relaxed text-muted">
              Form bhariye ya seedha email/call kijiye — main 24 ghante ke andar
              reply karta hoon.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 text-foreground transition-colors hover:text-accent"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 text-foreground transition-colors hover:text-accent"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                {profile.phone}
              </a>
              <p className="flex items-center gap-4 text-muted">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                {profile.location}
              </p>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal variant="right" delay={100}>
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card/60 p-7 backdrop-blur sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="pc-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Name
                  </label>
                  <input id="pc-name" name="name" required placeholder="Your name" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="pc-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Email
                  </label>
                  <input id="pc-email" name="email" type="email" required placeholder="you@example.com" className={inputCls} />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="pc-subject" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Subject
                </label>
                <input id="pc-subject" name="subject" placeholder="Project inquiry / Job opportunity" className={inputCls} />
              </div>
              <div className="mt-5">
                <label htmlFor="pc-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Message
                </label>
                <textarea id="pc-message" name="message" required rows={5} placeholder="Tell me about your project..." className={`${inputCls} resize-none`} />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-shine magnetic mt-7 w-full rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <p className="mt-4 text-center text-sm font-medium text-accent">
                  ✓ Message sent! Main jald hi reply karunga.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-center text-sm text-red-400">
                  Kuch galat ho gaya — seedha email kar dijiye: {profile.email}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
