import type { Metadata } from "next";
import "./premium.css";

import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import CursorFx from "@/components/CursorFx";
import MagneticFx from "@/components/MagneticFx";

import PNav from "@/components/premium/PNav";
import PHero from "@/components/premium/PHero";
import PAbout from "@/components/premium/PAbout";
import PSkills from "@/components/premium/PSkills";
import PProjects from "@/components/premium/PProjects";
import PExperience from "@/components/premium/PExperience";
import PQuotes from "@/components/premium/PQuotes";
import PContact from "@/components/premium/PContact";
import PFooter from "@/components/premium/PFooter";

export const metadata: Metadata = {
  title: "Neeraj Kumar — Frontend Developer | Premium",
  description:
    "Premium portfolio of Neeraj Kumar — Frontend Developer specializing in WordPress, Shopify, React.js, and Next.js.",
};

export default function PremiumPage() {
  return (
    <div className="premium p-grain min-h-screen">
      <SmoothScroll />
      <ScrollProgress />
      <CursorFx />
      <MagneticFx />
      <PNav />
      <main>
        <PHero />
        <PAbout />
        <PSkills />
        <PProjects />
        <PExperience />
        <PQuotes />
        <PContact />
      </main>
      <PFooter />
    </div>
  );
}
