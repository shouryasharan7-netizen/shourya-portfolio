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

// Dynamically import 3D WebGL Canvas for client-side rendering
const MainScene = dynamic(
  () => import("@/components/3d/MainScene").then((mod) => mod.MainScene),
  { ssr: false }
);

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isHologramMode, setIsHologramMode] = useState(false);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [empTriggerCount, setEmpTriggerCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const triggerEMP = () => {
    setEmpTriggerCount((prev) => prev + 1);
  };

  const toggleRecruiterMode = () => {
    setIsRecruiterMode((prev) => !prev);
  };

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
    <main
      id="main-content"
      role="main"
      className={`relative min-h-screen w-full bg-[#030305] text-[#F8F9FA] overflow-x-hidden selection:bg-gold-500 selection:text-black ${
        isRecruiterMode ? "recruiter-mode-active" : ""
      }`}
    >
      {/* HIMYM-Style Cinematic Snapshot Opening Intro (Only if not in Recruiter Mode) */}
      {!introFinished && !isRecruiterMode && (
        <CinematicIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Full-Screen JARVIS 3D WebGL Canvas Layer */}
      <MainScene
        scrollProgress={scrollProgress}
        isHologramMode={isHologramMode}
        empTriggerCount={empTriggerCount}
        isRecruiterMode={isRecruiterMode}
      />

      {/* Cinematic Vignette */}
      {!isRecruiterMode && <div className="cinematic-vignette" aria-hidden="true" />}

      {/* Fixed Spatial Tactical HUD Bar */}
      <SpatialHUD
        isHologramMode={isHologramMode}
        onToggleHologram={() => setIsHologramMode(!isHologramMode)}
        onTriggerEMP={triggerEMP}
        activeSection={activeSection}
        isRecruiterMode={isRecruiterMode}
        onToggleRecruiterMode={toggleRecruiterMode}
      />

      {/* Recruiter Mode Active Banner */}
      {isRecruiterMode && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-gold-400 text-black px-4 py-1.5 text-center text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-lg">
          <span>RECRUITER BRIEF MODE ACTIVE — 3D WebGL paused for fast scanning.</span>
          <button
            onClick={toggleRecruiterMode}
            className="underline hover:text-white transition-colors ml-2"
          >
            [Switch to 3D Mode]
          </button>
        </div>
      )}

      {/* Interactive 3D Spatial Content Overlays */}
      <div className="relative z-10 w-full">
        <HeroSection onTriggerEMP={triggerEMP} isRecruiterMode={isRecruiterMode} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <RecognitionsSection />
        <ContactSection
          onToggleHologram={() => setIsHologramMode(!isHologramMode)}
          onTriggerEMP={triggerEMP}
        />
      </div>
    </main>
  );
}
