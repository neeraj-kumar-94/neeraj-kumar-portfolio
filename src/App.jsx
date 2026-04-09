import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import { personalInfo, skills, experiences, projects, testimonials } from "./data/portfolioData";

const sectionIds = ["hero", "about", "skills", "projects", "testimonials", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="nk-app relative z-0 min-h-[100dvh] w-full min-w-0 overflow-x-hidden bg-white text-slate-600 transition-colors duration-300 ease-out dark:bg-nkBg dark:text-slate-300">
      <AnimatedBackground darkMode={darkMode} />
      <CustomCursor />
      <Loader isLoading={isLoading} />
      <Navbar
        activeSection={activeSection}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />
      <main className="relative z-10 w-full min-w-0">
        <Hero info={personalInfo} />
        <About info={personalInfo} experiences={experiences} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Contact info={personalInfo} />
      </main>
      <Footer info={personalInfo} />
    </div>
  );
}

export default App;
