import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

function Navbar({ activeSection, darkMode, onToggleDarkMode }) {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <header className="nk-navbar sticky top-0 z-50 w-full min-w-0 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-slate-700 dark:bg-nkBg/95">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="text-lg font-bold text-slate-900 transition duration-300 hover:text-nkPrimary dark:text-white"
        >
          Neeraj<span className="text-nkAccent">.</span>
        </button>

        <ul className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 hover:scale-[1.03] ${
                  activeSection === item.id
                    ? "bg-nkPrimary text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 transition duration-300 hover:scale-105 hover:border-nkPrimary hover:text-nkPrimary dark:border-slate-600 dark:bg-nkCard dark:text-slate-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-md p-2 text-slate-800 transition hover:bg-slate-100 md:hidden dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-5 py-4 transition-colors duration-300 dark:border-slate-700 dark:bg-nkBg md:hidden">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition duration-300 ${
                    activeSection === item.id
                      ? "bg-nkPrimary text-white"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
