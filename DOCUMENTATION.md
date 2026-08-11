# Neeraj Kumar — Portfolio Documentation

**Live Site:** https://neeraj-kumar-portfolio-eight.vercel.app/
**GitHub Repo:** https://github.com/neeraj-kumar-94/neeraj-kumar-portfolio
**Local Dev:** `npm run dev` → http://localhost:3000

---

## 1. Tech Stack (Kya-kya use hua hai)

| Technology | Version | Kaam kya hai |
|---|---|---|
| **Next.js** | 16.x (App Router) | Main framework — pages, routing, image optimization, static build |
| **React** | 19.x | UI components aur interactivity |
| **TypeScript** | 5.x | Type-safe code |
| **Tailwind CSS** | 4.x | Saari styling (utility classes) |
| **Lenis** | 1.x | Buttery smooth scrolling |
| **next/font** | built-in | Google Fonts (Playfair Display + Inter) — self-hosted, fast |
| **next/image** | built-in | Images ka automatic optimization + lazy loading |
| **Vercel** | — | Hosting + auto-deploy (GitHub push par) |

> **Note:** Koi heavy animation library (GSAP, Framer Motion) use NAHI hui.
> Saari animations pure CSS + thoda vanilla JavaScript se bani hain —
> isliye site fast hai aur bundle chhota hai.

---

## 2. Project Structure (File kahan hai, kya karti hai)

```
app/
├── layout.tsx        → Fonts, metadata (SEO title/description)
├── page.tsx          → Home page — saare sections yahan jude hain
├── globals.css       → Theme colors + SAARI animation CSS yahan hai
├── icon.svg          → Favicon (gold "N" monogram)
└── resume/page.tsx   → /resume page (print-ready resume)

components/
├── Navbar.tsx            → Fixed navbar + scroll-spy + mobile menu
├── Hero.tsx              → Hero section (word reveal, typing, parallax)
├── HeroIllustration.tsx  → Animated code-editor illustration
├── About.tsx             → About section + count-up stats
├── AboutIllustration.tsx → Animated browser-window illustration
├── Skills.tsx            → Skill cards (icons + chip pop-in)
├── Projects.tsx          → Stacked sticky project cards
├── Experience.tsx        → Timeline (alternating left/right)
├── Testimonials.tsx      → Draggable mentor slider
├── Education.tsx         → Education timeline + career highlights
├── Contact.tsx           → Contact CTAs + socials
├── Footer.tsx            → Footer
│
│  (Animation helper components)
├── Reveal.tsx            → Scroll-par entrance animation wrapper
├── TypedRoles.tsx        → Hero ka typing effect
├── SmoothScroll.tsx      → Lenis smooth scroll setup
├── ScrollProgress.tsx    → Top progress bar + back-to-top button
├── Parallax.tsx          → Parallax wrapper (scroll-based movement)
├── CountUp.tsx           → Number count-up (0 → 20+)
├── CursorFx.tsx          → Custom gold cursor (dot + ring + "VIEW")
├── MagneticFx.tsx        → Magnetic button effect
└── SectionHeading.tsx    → Section headings (word reveal + line draw)

lib/
└── data.ts           → ⭐ SAARA CONTENT YAHAN HAI — naam, bio, skills,
                        projects, experience, education, mentors.
                        Kuch bhi change karna ho to bas ye file edit karo.

public/
├── projects/         → Project mockup images (5 devices mockups)
├── mentors/          → Mentor photos (shakti, tanmay, manish)
└── Neeraj-Kumar-Resume.pdf → Downloadable resume PDF
```

---

## 3. Animations — Kaunsi Animation, Kaunsi Technology

### A. Scroll-based Animations

| Animation | Technology | File |
|---|---|---|
| **Smooth scrolling** (buttery feel) | Lenis library + requestAnimationFrame | `SmoothScroll.tsx` |
| **Entrance reveals** (sections slide/zoom in) | IntersectionObserver (JS) + CSS transitions | `Reveal.tsx` + `globals.css` |
| **Word-by-word heading reveal** | CSS `overflow: hidden` mask + `translateY` transition | `SectionHeading.tsx`, `Hero.tsx` |
| **Scroll progress bar** (top gold line) | JS scroll listener + CSS `scaleX` | `ScrollProgress.tsx` |
| **Parallax** (hero orbs alag speed par move) | rAF + `getBoundingClientRect` + `translate3d` | `Parallax.tsx` |
| **Stacked project cards** (ek ke upar ek) | Pure CSS `position: sticky` + increasing `top` offset | `Projects.tsx` |
| **Image zoom-out reveal** (1.2x → 1x) | CSS transition triggered by `.visible` class | `globals.css` (`.img-zoom`) |
| **Navbar scroll-spy** (active section highlight) | IntersectionObserver | `Navbar.tsx` |
| **Count-up stats** (0 → 4+, 20+, 5+) | IntersectionObserver + rAF + easing function | `CountUp.tsx` |
| **Back-to-top button** (fade-in after 700px) | JS scroll listener + CSS transition | `ScrollProgress.tsx` |

### B. Interactive Animations (Mouse/Touch)

| Animation | Technology | File |
|---|---|---|
| **Custom cursor** (gold dot + lerp ring + "VIEW") | rAF lerp + `mousemove`/`mouseover` events | `CursorFx.tsx` |
| **Magnetic buttons** (cursor ki taraf pull) | `mousemove` + transform, `.magnetic` class | `MagneticFx.tsx` |
| **Draggable slider** (mentors swipe) | Pointer Events API (`pointerdown/move/up`) + React state | `Testimonials.tsx` |
| **Card hover lift + glow** | CSS `:hover` + `translate` + `box-shadow` | Tailwind classes |
| **Button shine sweep** | CSS `::after` gradient + keyframe | `globals.css` (`.btn-shine`) |
| **Skill chips hover** | CSS transitions | `Skills.tsx` |

### C. Ambient/Loop Animations (Khud chalti rehti hain)

| Animation | Technology | File |
|---|---|---|
| **Typing effect** (roles type/delete hote) | React `useState` + `setTimeout` loop | `TypedRoles.tsx` |
| **Floating gradient orbs** | CSS `@keyframes float` | `globals.css` |
| **Rotating dashed orbit** (hero) | CSS `@keyframes spin-slow` (30s) | `globals.css` |
| **Code-editor lines + blinking caret** | CSS keyframes (`code-line-in`, `blink`) | `HeroIllustration.tsx` |
| **Pulse ring** (email button dhadakta glow) | CSS `@keyframes pulse-ring` (box-shadow) | `globals.css` |
| **Timeline dot ping** | CSS `::after` + `@keyframes dot-ping` | `globals.css` |
| **Slider autoplay + progress bar** | React `setInterval` (6s) + CSS `scaleX` keyframe | `Testimonials.tsx` |
| **Staggered pop-in** (chips, socials, highlights) | CSS `animation-delay` via `--pop-delay` variable | `globals.css` (`.pop`) |
| **Heading underline draw** | CSS `@keyframes grow-line` | `globals.css` |
| **Navbar slide-down on load** | CSS `@keyframes nav-in` | `globals.css` |

### D. Accessibility

- **`prefers-reduced-motion`** — jo users motion kam pasand karte hain (OS setting),
  unke liye SAARI animations automatically disable ho jati hain.
  Ye rules `globals.css` ke end mein hain.
- Custom cursor sirf desktop (fine pointer) par chalta hai, mobile par nahi.

---

## 4. Content Kaise Update Karein

Sab kuch **`lib/data.ts`** mein hai — components ko touch karne ki zaroorat nahi:

- `profile` → naam, tagline, email, phone, social links, about paragraphs, stats
- `typedRoles` → hero mein type hone wale roles
- `skillGroups` → skills ke 4 groups
- `projects` → har project ka title, description, tech, live URL, image path
- `experience` → jobs + bullet points
- `education` → degrees
- `highlights` → career highlights (Education section)
- `mentors` → testimonials (naam, title, LinkedIn, photo, quote)

**Naya project add karna ho:**
1. Mockup image `public/projects/` mein daalo
2. `lib/data.ts` ke `projects` array mein ek entry add karo — bas ho gaya.

---

## 5. Resume System

- **`/resume` page** — site ki design se matching, print-ready A4 layout
- **PDF** — `public/Neeraj-Kumar-Resume.pdf` (navbar "Resume" → Download PDF)
- Resume ka content bhi `lib/data.ts` se hi aata hai

**PDF dobara generate karna ho** (content change ke baad) — dev server chalu rakh kar:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="public/Neeraj-Kumar-Resume.pdf" http://localhost:3000/resume
```

---

## 6. Deploy Workflow

```
Code change → git add -A → git commit -m "message" → git push origin main
                                                          ↓
                                            Vercel automatically deploy
                                            (2-3 minute mein live)
```

**Useful commands:**

```bash
npm run dev     # Local development (localhost:3000)
npm run build   # Production build test (push se pehle check karo)
```

---

## 7. Design System (Colors & Fonts)

CSS variables `globals.css` mein defined hain:

| Variable | Value | Use |
|---|---|---|
| `--background` | `#faf9f7` | Page background (warm ivory) |
| `--foreground` | `#1c1917` | Main text (almost black) |
| `--muted` | `#78716c` | Secondary text (gray) |
| `--accent` | `#9a7b4f` | Gold — buttons, highlights, links |
| `--accent-dark` | `#7c6240` | Gold hover state |
| `--card` | `#ffffff` | Card backgrounds |
| `--border` | `#e7e2db` | Borders |

**Fonts:** Playfair Display (serif — headings) + Inter (sans — body text)

Color change karna ho to sirf ye variables badlo — poori site update ho jayegi.
