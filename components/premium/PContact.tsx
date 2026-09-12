"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { profile } from "@/lib/data";
import Reveal from "../Reveal";
import PSectionTitle from "./PSectionTitle";

type Status = "idle" | "sending" | "sent" | "error";

const microLabel = "text-[11px] font-semibold uppercase tracking-[0.2em] text-muted";
const labelCls = `mb-2 block ${microLabel}`;
const fieldCls =
  "w-full rounded-xl border border-border bg-background/50 px-4 text-[15px] text-foreground outline-none transition placeholder:text-muted/50 focus:border-accent/60 focus:bg-background/80 focus:ring-4 focus:ring-accent/10";

const contacts: { label: string; value: string; href?: string; icon: ReactNode }[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    ),
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    ),
  },
  {
    label: "Location",
    value: profile.location,
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </>
    ),
  },
];

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
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <PSectionTitle label="Get In Touch" />

        <Reveal variant="up">
          <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur lg:grid-cols-[0.85fr_1.15fr]">
            {/* Info pane */}
            <div className="flex flex-col gap-10 border-b border-border p-8 sm:p-10 lg:border-b-0 lg:border-r">
              <div>
                <p className="font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                  Have a project in mind, or a role where I&apos;d fit?{" "}
                  <span className="p-gold italic">Let&apos;s talk.</span>
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  Fill in the form or reach out directly — I usually reply within 24 hours.
                </p>
              </div>

              <ul className="mt-auto space-y-6">
                {contacts.map((c) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-colors group-hover:border-accent">
                        <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                          {c.icon}
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className={`block ${microLabel}`}>{c.label}</span>
                        <span className="mt-0.5 block truncate text-foreground transition-colors group-hover:text-accent">
                          {c.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="group flex items-center gap-4">
                          {inner}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Form pane */}
            <form onSubmit={onSubmit} className="p-8 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="pc-name" className={labelCls}>
                    Name
                  </label>
                  <input
                    id="pc-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={`${fieldCls} h-12`}
                  />
                </div>
                <div>
                  <label htmlFor="pc-email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="pc-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`${fieldCls} h-12`}
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="pc-subject" className={labelCls}>
                  Subject
                </label>
                <input
                  id="pc-subject"
                  name="subject"
                  placeholder="Project inquiry / Job opportunity"
                  className={`${fieldCls} h-12`}
                />
              </div>
              <div className="mt-5">
                <label htmlFor="pc-message" className={labelCls}>
                  Message
                </label>
                <textarea
                  id="pc-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me a little about your project…"
                  className={`${fieldCls} resize-none py-3`}
                />
              </div>

              <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite" className="min-h-5 text-sm">
                  {status === "sent" && (
                    <span className="text-accent">Thanks — your message is on its way. I&apos;ll reply soon.</span>
                  )}
                  {status === "error" && (
                    <span className="text-red-400">Couldn&apos;t send. Please email me at {profile.email}.</span>
                  )}
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group magnetic inline-flex shrink-0 items-center justify-between gap-3 rounded-full bg-accent py-2.5 pl-7 pr-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-background disabled:cursor-not-allowed disabled:opacity-60 sm:justify-center"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/20 transition-transform duration-300 group-hover:translate-x-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
