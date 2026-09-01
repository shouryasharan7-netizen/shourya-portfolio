"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { RecognitionsSection } from "@/components/sections/RecognitionsSection";
import { ContactSection } from "@/components/sections/ContactSection";

// Dynamically import 3D WebGL Canvas to prevent server-side SSR prerender errors
const MainScene = dynamic(
  () => import("@/components/3d/MainScene").then((mod) => mod.MainScene),
  { ssr: false }
);

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      // Detect active section
      const sections = ["hero", "about", "experience", "projects", "recognitions", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#030305] text-[#F8F9FA] overflow-x-hidden selection:bg-gold-500 selection:text-black">
      {/* HIMYM-Style Cinematic Snapshot Opening Intro */}
      {!introFinished && (
        <CinematicIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Full-Screen 3D WebGL Canvas Layer */}
      <MainScene scrollProgress={scrollProgress} isOrbitMode={isOrbitMode} />

      {/* Cinematic Vignette */}
      <div className="cinematic-vignette" />

      {/* Fixed Spatial Tactical HUD Bar */}
      <SpatialHUD
        isOrbitMode={isOrbitMode}
        onToggleOrbit={() => setIsOrbitMode(!isOrbitMode)}
        activeSection={activeSection}
      />

      {/* Interactive 3D Spatial Content Overlays */}
      <div
        className={`relative z-10 w-full transition-opacity duration-500 ${
          isOrbitMode ? "opacity-20 pointer-events-none" : "opacity-100"
        }`}
      >
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <RecognitionsSection />
        <ContactSection />
      </div>
    </main>
  );
}
