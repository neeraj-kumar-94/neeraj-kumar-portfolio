# Neeraj Kumar — Portfolio

**Live Site:** https://neeraj-kumar-portfolio-eight.vercel.app/
**Resume:** https://neeraj-kumar-portfolio-eight.vercel.app/resume

Frontend Developer portfolio — ink ground, bone type aur brass signal colour.
Display serif + mono meta layer, scroll-driven motion, aur ek studio-index Work section.

> Purana ivory/gold ("classic") design `classic` branch par safe rakha hai.
> `main` branch mein sirf current portfolio ka code hai.

---

## 1. Tech Stack

| Technology | Kaam |
|---|---|
| **Next.js 16** (App Router, Turbopack) | Framework — routing, image optimization, static build |
| **React 19** + **TypeScript** | UI components, type-safe code |
| **Tailwind CSS 4** | Saari styling (utility classes + theme tokens) |
| **Motion (Framer Motion)** | Saari animations — scroll reveals, spring physics, drag, shared layout |
| **Lenis** | Smooth scrolling |
| **simple-icons** | Skill logos (Expertise section) |
| **next/font** | Playfair Display (display) + Inter (body) + JetBrains Mono (meta layer) — self-hosted |
| **FormSubmit** | Contact form → mail seedha `neeraj74530@gmail.com` par |
| **Vercel** | Hosting — `main` par push hote hi auto-deploy |

Animations **Framer Motion** (`motion/react`) se bani hain. `globals.css` mein ab
sirf theme, surfaces aur print rules hain — motion components ke andar rehta hai.

---

## 2. Project Structure

```
app/
├── layout.tsx            → Fonts, SEO metadata, theme script, skip link
├── page.tsx              → Home page — saare sections yahan jude hain
├── globals.css           → Theme colours, surfaces aur print rules
├── icon.svg              → Favicon
├── template.tsx          → Har route ka entrance transition
├── work/[slug]/page.tsx  → Case study pages (3)
└── resume/
    ├── page.tsx          → /resume page (screen par site theme, print/PDF black & white)
    └── resume.css        → Resume ke print rules

components/
├── layout/
│   ├── Navbar.tsx        → Fixed navbar, scroll-spy, mobile menu
│   └── Loader.tsx        → Page load intro
├── sections/             → Page ke sections (upar se neeche isi order mein)
│   ├── Hero.tsx          → Naam, tagline, CTA, portrait, rotating badge
│   ├── About.tsx         → About text, career highlights, count-up stats
│   ├── Skills.tsx        → "Expertise" — 3 core stacks + proof (phone par accordion)
│   ├── Projects.tsx      → "Selected Work" — desktop: hover index + preview, mobile: swipe deck
│   ├── Experience.tsx    → "The Journey" — scroll-drawn timeline
│   ├── Mentors.tsx       → "What Mentors Say" — draggable card deck
│   ├── Contact.tsx       → Contact info + form
│   └── Footer.tsx        → Big CTA + links
├── ui/                   → Chhote reusable pieces
│   ├── SectionTitle.tsx  → Section heading (rule + mono tag/meta + serif title)
│   ├── PortraitFrame.tsx → Background-free portrait + floating Sticker badges
│   ├── Greeting.tsx      → Time-based greeting (Good morning/evening)
│   ├── LocalTime.tsx     → Header ki live Shamli clock
│   ├── ThemeToggle.tsx   → Dark ⇄ light switch (localStorage mein yaad rehta hai)
│   └── CountUp.tsx       → Number count-up (0 → 20+)
└── effects/              → Animation helpers (sab Framer Motion par)
    ├── Reveal.tsx        → Scroll par blur + glide entrance wrapper
    ├── TextReveal.tsx    → Heading ke words mask ke peeche se upar aate hain
    ├── SmoothScroll.tsx  → Lenis setup
    ├── ScrollProgress.tsx→ Top progress bar + back-to-top
    ├── CursorFx.tsx      → Custom cursor (sirf desktop)
    └── MagneticFx.tsx    → Magnetic buttons (spring)

lib/
└── data.ts               → ⭐ SAARA CONTENT YAHAN HAI

public/
├── profile/              → Portrait cutouts (hero + about)
├── projects/             → Project mockup images
├── mentors/              → Mentor photos
└── Neeraj-Kumar-Resume.pdf → Resume page ka "Download PDF"
```

---

## 3. Content Kaise Update Karein

Sab kuch **`lib/data.ts`** mein hai — components ko touch karne ki zaroorat nahi:

- `profile` → naam, positioning line (`tagline`), availability, email, phone, socials, about, stats
- `proofPoints` → hero ke neeche wali proof strip
- `coreSkills` → Expertise ke 3 core stacks (naam, summary, proof, tools)
- `alsoWorkWith` → baaki skills ki ek line
- `projects` → title, description, tech, live URL, image, result line
- `caseStudies` → 3 detailed case studies (`/work/[slug]` pages isi se bante hain)
- `experience` / `education` → Journey timeline (resume mein bhi yahi aata hai)
- `highlights` → About ke Career Highlights
- `mentors` → testimonials (naam, title, LinkedIn, photo, quote)
- `skillGroups` → sirf resume page ke Core Skills ke liye

**Naya project add karna ho:** image `public/projects/` mein daalo, phir `projects`
array mein ek entry add karo. Case study chahiye to `caseStudies` mein same slug ke
saath entry add karo — page apne aap ban jayega.

> **Case studies:** inme abhi qualitative outcomes likhe hain. Agar tumhare paas real
> numbers hain (conversion, load time, enquiries), unhe `outcome` line mein daal do —
> hiring managers ke liye wahi sabse strong proof hota hai.

---

## 4. Animations

| Animation | Kaise bani hai | File |
|---|---|---|
| Intro curtain | `AnimatePresence` + exit slide | `layout/Loader.tsx` |
| Hero load sequence | Parent `variants` + `staggerChildren` | `sections/Hero.tsx` |
| Heading word reveal | Mask + stagger (trigger wrapper par, word par nahi) | `effects/TextReveal.tsx` |
| Entrance reveals (blur + glide) | `whileInView` + `viewport.once` | `effects/Reveal.tsx` |
| Hero portrait | `useScroll` parallax + pointer tilt (spring) | `sections/Hero.tsx` |
| Swipe decks (projects mobile, mentors) | Motion `drag` + velocity-based flick | `sections/Projects.tsx`, `sections/Mentors.tsx` |
| Journey timeline draw | `useScroll` → `scaleY`, nodes `useInView` | `sections/Experience.tsx` |
| Work index preview | Hover state + CSS cross-fade (no mount/unmount) | `sections/Projects.tsx` |
| Live local clock | `useSyncExternalStore` on a one-minute tick | `ui/LocalTime.tsx` |
| Navbar | Scroll-direction hide/show + `layoutId` pill | `layout/Navbar.tsx` |
| Custom cursor / magnetic buttons | Motion values + springs | `effects/CursorFx.tsx`, `effects/MagneticFx.tsx` |
| Count-up stats | `useInView` + `animate()` | `ui/CountUp.tsx` |

`prefers-reduced-motion` on ho to animations skip ho jaati hain — har component
`useReducedMotion()` check karta hai.

---

## 5. Resume

- **`/resume`** — screen par site ki navy theme, print/PDF mein plain black & white A4.
- **PDF** — `public/Neeraj-Kumar-Resume.pdf`. Content change ke baad dev server chala kar
  dobara banao:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="public/Neeraj-Kumar-Resume.pdf" http://localhost:3000/resume
```

---

## 6. Commands & Deploy

```bash
npm install     # Pehli baar dependencies
npm run dev     # Local development
npm run build   # Production build check (push se pehle)
```

`main` par push → Vercel 2–3 minute mein live kar deta hai. Purana `/premium` link
ab `/` par redirect hota hai (`next.config.ts`).

---

## 7. Design Tokens

`app/globals.css` mein do sets hain: `:root` (dark) aur `:root[data-theme="light"]`.
Surfaces shadow se nahi, **luminance** se upar aati hain — dark mein jitna upar, utna
halka. `--signal` (brass) sirf interactive cheezon ke liye hai: hover, focus, active,
progress. Baaki sab platinum/neutral rehta hai.

| Variable | Dark | Light | Use |
|---|---|---|---|
| `--background` | `#0a111f` | `#f7f5f1` | Page |
| `--card` | `#101a2e` | `#ffffff` | Cards (level 1) |
| `--surface-2` | `#16233c` | `#fbf9f6` | Hover / raised (level 2) |
| `--surface-3` | `#1c2c49` | `#f0ece4` | Overlay (level 3) |
| `--foreground` | `#efeae1` | `#14181f` | Main text (warm bone on ink) |
| `--muted` | `#9e9b95` | `#5a6474` | Secondary text |
| `--accent` | `#cfc9bd` | `#2c3a58` | Bone-silver display accent |
| `--signal` | `#e3a857` | `#8a540f` | Brass — sirf interactive states |
| `--border` | `#202c47` | `#e3ded4` | Hairline borders |
| `--border-strong` | `#3a4a70` | `#bdb5a7` | Strong borders |

Har text/surface pair WCAG AA (4.5:1) se upar hai, dono themes mein. Theme toggle
navbar mein hai aur choice `localStorage` mein save hoti hai; `layout.tsx` ka inline
script paint se pehle apply kar deta hai, isliye flash nahi hota.
