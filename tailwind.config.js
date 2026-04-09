/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nkBg: "#0b1220",
        nkCard: "#111827",
        nkPrimary: "#6366f1",
        nkAccent: "#14b8a6",
        nkText: "#f1f5f9",
        nkMuted: "#94a3b8",
      },
      boxShadow: {
        nkSoft: "0 10px 30px rgba(17, 24, 39, 0.12)",
      },
    },
  },
  plugins: [],
};
