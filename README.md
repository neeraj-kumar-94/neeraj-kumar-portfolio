# Neeraj Kumar — Portfolio

**Live Site:** https://neeraj-kumar-portfolio-eight.vercel.app/
**Resume:** https://neeraj-kumar-portfolio-eight.vercel.app/resume

Frontend Developer portfolio — ink navy + platinum theme, editorial typography aur
smooth scroll-based animations.

> Purana ivory/gold ("classic") design `classic` branch par safe rakha hai.
> `main` branch mein sirf current portfolio ka code hai.

---

## 1. Tech Stack

| Technology | Kaam |
|---|---|
| **Next.js 16** (App Router, Turbopack) | Framework — routing, image optimization, static build |
| **React 19** + **TypeScript** | UI components, type-safe code |
| **Tailwind CSS 4** | Saari styling (utility classes + theme tokens) |
| **Lenis** | Smooth scrolling |
| **simple-icons** | Skill logos (Expertise section) |
| **next/font** | Playfair Display (headings) + Inter (body) — self-hosted |
| **FormSubmit** | Contact form → mail seedha `neeraj74530@gmail.com` par |
| **Vercel** | Hosting — `main` par push hote hi auto-deploy |

Koi heavy animation library (GSAP, Framer Motion) use nahi hui — saari animations
CSS + thoda vanilla JavaScript hain, isliye site fast hai.

---

## 2. Project Structure

```
app/
├── layout.tsx            → Fonts, SEO metadata
├── page.tsx              → Home page — saare sections yahan jude hain
├── globals.css           → Theme colours + saari animation CSS
├── icon.svg              → Favicon
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
│   ├── Skills.tsx        → "Expertise" — filter tabs + logo tiles
│   ├── Projects.tsx      → "Selected Work" — desktop: horizontal scroll, mobile: swipe deck
│   ├── Experience.tsx    → "The Journey" — scroll-drawn timeline
│   ├── Mentors.tsx       → "What Mentors Say" — draggable card deck
│   ├── Contact.tsx       → Contact info + form
│   └── Footer.tsx        → Big CTA + links
├── ui/                   → Chhote reusable pieces
│   ├── SectionTitle.tsx  → Section heading
│   ├── PortraitFrame.tsx → Background-free portrait + floating Sticker badges
│   ├── Greeting.tsx      → Time-based greeting (Good morning/evening)
│   └── CountUp.tsx       → Number count-up (0 → 20+)
└── effects/              → Animation helpers
    ├── Reveal.tsx        → Scroll par entrance animation wrapper
    ├── SmoothScroll.tsx  → Lenis setup
    ├── ScrollProgress.tsx→ Top progress bar + back-to-top
    ├── Parallax.tsx      → Scroll-based parallax
    ├── CursorFx.tsx      → Custom cursor (sirf desktop)
    └── MagneticFx.tsx    → Magnetic buttons

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

- `profile` → naam, tagline, email, phone, socials, about paragraphs, stats
- `skillGroups` → Expertise ke 4 groups
- `projects` → title, description, tech, live URL, image, result line
- `experience` / `education` → Journey timeline (resume mein bhi yahi aata hai)
- `highlights` → About ke Career Highlights
- `mentors` → testimonials (naam, title, LinkedIn, photo, quote)

**Naya project add karna ho:** image `public/projects/` mein daalo, phir `projects`
array mein ek entry add karo.

---

## 4. Animations

| Animation | Kaise bani hai | File |
|---|---|---|
| Smooth scroll | Lenis + requestAnimationFrame | `effects/SmoothScroll.tsx` |
| Entrance reveals (blur + slide) | IntersectionObserver + CSS transitions | `effects/Reveal.tsx`, `globals.css` |
| Hero word reveal | CSS mask + `translateY` keyframes | `sections/Hero.tsx` |
| Horizontal project track | Scroll position → `translateX` | `sections/Projects.tsx` |
| Swipe decks (projects mobile, mentors) | Pointer Events + autoplay progress bar | `sections/Projects.tsx`, `sections/Mentors.tsx` |
| Journey timeline draw | Scroll progress → line fill, nodes light up | `sections/Experience.tsx` |
| Skill tab indicator | Measured offsets + ResizeObserver | `sections/Skills.tsx` |
| Custom cursor / magnetic buttons | rAF lerp + mousemove | `effects/CursorFx.tsx`, `effects/MagneticFx.tsx` |
| Count-up stats | IntersectionObserver + rAF easing | `ui/CountUp.tsx` |

`prefers-reduced-motion` on ho to saari animations band ho jaati hain (`globals.css`
ke end mein).

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

`app/globals.css` ke `:root` mein:

| Variable | Value | Use |
|---|---|---|
| `--background` | `#0a111f` | Ink navy page |
| `--foreground` | `#f2f4f7` | Main text |
| `--muted` | `#8c94a6` | Secondary text |
| `--accent` | `#c6cdda` | Platinum — buttons, highlights |
| `--accent-dark` | `#9aa4b8` | Accent hover |
| `--card` | `#0f1830` | Cards |
| `--border` | `#202c47` | Borders |

Colour change karna ho to sirf ye variables badlo.
