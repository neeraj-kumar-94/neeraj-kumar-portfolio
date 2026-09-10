import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <a
          href="/premium"
          className="font-medium text-accent transition-colors hover:text-accent-dark"
        >
          ✦ View Premium Version
        </a>
        <p>
          Designed & built with <span className="text-accent">Next.js</span>
        </p>
      </div>
    </footer>
  );
}
