import SmoothScroll from "@/components/effects/SmoothScroll";
import ScrollProgress from "@/components/effects/ScrollProgress";
import CursorFx from "@/components/effects/CursorFx";
import MagneticFx from "@/components/effects/MagneticFx";

import Loader from "@/components/layout/Loader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Mentors from "@/components/sections/Mentors";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="p-grain min-h-screen">
      <Loader />
      <SmoothScroll />
      <ScrollProgress />
      <CursorFx />
      <MagneticFx />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Mentors />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
