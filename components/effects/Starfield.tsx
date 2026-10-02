"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; depth: number };
type Shot = { x: number; y: number; vx: number; vy: number; life: number; max: number; len: number };

const MAX_DPR = 2;

/** Night sky behind the whole site: three depths of stars that drift with the
 *  scroll, and a shooting star every few seconds. Light theme gets quiet dust
 *  instead of stars, since a starfield on paper reads as noise.
 *
 *  One canvas, one loop, paused whenever the tab is hidden. Reduced motion
 *  paints a still sky and stops.  */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let shots: Shot[] = [];
    let w = 0;
    let h = 0;
    let frame = 0;
    let nextShot = 0;
    let light = document.documentElement.getAttribute("data-theme") === "light";

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density by area, so a laptop and a phone feel the same
      const count = Math.round((w * h) / (light ? 26000 : 9000));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h * 1.6,
          r: light ? 0.7 + Math.random() * 0.8 : 0.35 + depth * 1.25,
          a: light ? 0.05 + Math.random() * 0.06 : 0.18 + depth * 0.6,
          tw: 0.4 + Math.random() * 1.1,
          ph: Math.random() * Math.PI * 2,
          depth,
        };
      });
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY || 0;

      for (const s of stars) {
        // Deeper stars move less, which gives the sky its sense of distance
        const y = s.y - scroll * (0.02 + s.depth * 0.06);
        const wrapped = ((y % (h * 1.6)) + h * 1.6) % (h * 1.6);
        if (wrapped > h + 4) continue;

        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 * s.tw + s.ph);
        ctx.globalAlpha = Math.max(0, s.a * twinkle);
        ctx.fillStyle = light ? "#4a4336" : "#f4f1ea";
        ctx.beginPath();
        ctx.arc(s.x, wrapped, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (light || reduced) return;

      // Shooting stars, rare enough to feel like luck
      if (t > nextShot) {
        nextShot = t + 4200 + Math.random() * 6000;
        const fromLeft = Math.random() > 0.35;
        const speed = 0.55 + Math.random() * 0.4;
        shots.push({
          x: fromLeft ? Math.random() * w * 0.5 : w * (0.5 + Math.random() * 0.5),
          y: Math.random() * h * 0.45,
          vx: (fromLeft ? 1 : -1) * speed,
          vy: speed * 0.55,
          life: 0,
          max: 900 + Math.random() * 500,
          len: 90 + Math.random() * 110,
        });
      }

      for (const s of shots) {
        s.life += 16;
        s.x += s.vx * 16;
        s.y += s.vy * 16;

        const p = s.life / s.max;
        const fade = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8;
        if (fade <= 0) continue;

        const tailX = s.x - s.vx * s.len;
        const tailY = s.y - s.vy * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(239, 234, 225, ${0.85 * fade})`);
        grad.addColorStop(0.35, `rgba(227, 168, 87, ${0.35 * fade})`);
        grad.addColorStop(1, "rgba(227, 168, 87, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.globalAlpha = fade;
        ctx.fillStyle = "#fffaf0";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      shots = shots.filter((s) => s.life < s.max && s.x > -200 && s.x < w + 200 && s.y < h + 200);
    };

    const loop = (t: number) => {
      paint(t);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced) paint(0);
      else frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };

    const onResize = () => {
      build();
      if (reduced) paint(0);
    };

    // The sky changes with the theme
    const themeWatcher = new MutationObserver(() => {
      const next = document.documentElement.getAttribute("data-theme") === "light";
      if (next === light) return;
      light = next;
      shots = [];
      build();
      if (reduced) paint(0);
    });
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    build();
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      themeWatcher.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
