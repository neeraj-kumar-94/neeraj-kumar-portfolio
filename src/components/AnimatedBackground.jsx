import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function AnimatedBackground({ darkMode }) {
  const [engineReady, setEngineReady] = useState(false);

  const initEngine = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    void initParticlesEngine(initEngine).then(() => setEngineReady(true));
  }, [initEngine]);

  const options = useMemo(() => {
    const dark = darkMode;
    const bg = dark ? "#0b1220" : "#ffffff";
    const particle = dark ? "#ffffff" : "#0f172a";
    const link = dark ? "#ffffff" : "#0f172a";
    const grabOpacity = dark ? 0.14 : 0.12;

    return {
      autoPlay: true,
      background: {
        color: { value: bg },
      },
      clear: true,
      detectRetina: true,
      fpsLimit: 60,
      fullScreen: { enable: false, zIndex: 0 },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      smooth: true,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              blink: false,
              consent: false,
              opacity: grabOpacity,
            },
          },
          push: {
            quantity: 3,
          },
        },
      },
      particles: {
        color: { value: particle },
        links: {
          enable: true,
          distance: 110,
          color: link,
          opacity: dark ? 0.07 : 0.06,
          width: 0.5,
          consent: false,
        },
        move: {
          enable: true,
          speed: 0.2,
          direction: "none",
          random: false,
          straight: false,
          outModes: { default: "bounce" },
        },
        number: {
          value: 28,
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
        },
        opacity: {
          value: { min: dark ? 0.1 : 0.12, max: dark ? 0.28 : 0.32 },
          animation: { enable: false },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 1.8 },
        },
      },
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: { value: 22 },
              links: { distance: 88 },
            },
          },
        },
        {
          maxWidth: 480,
          options: {
            particles: {
              number: { value: 18 },
              links: { distance: 72 },
            },
          },
        },
      ],
    };
  }, [darkMode]);

  if (!engineReady) {
    return (
      <div
        className={`pointer-events-none fixed inset-0 -z-10 h-full min-h-[100dvh] w-full min-w-0 ${
          darkMode ? "bg-[#0b1220]" : "bg-white"
        }`}
        aria-hidden
      />
    );
  }

  return (
    <Particles
      key={darkMode ? "dark" : "light"}
      id="tsparticles-bg"
      className="pointer-events-none fixed inset-0 -z-10 h-full min-h-[100dvh] w-full min-w-0"
      options={options}
    />
  );
}
