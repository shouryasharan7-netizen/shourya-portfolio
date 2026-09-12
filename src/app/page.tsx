"use client";

import React, { useState, useEffect } from "react";
import { SpatialHUD } from "@/components/ui/SpatialHUD";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AppleHelloIntro } from "@/components/intro/AppleHelloIntro";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { RecognitionsSection } from "@/components/sections/RecognitionsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  const [showHello, setShowHello] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track active section for navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "projects", "recognitions", "about", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.15) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHelloUnlocking = () => {
    setIsUnlocking(true);
  };

  const handleHelloComplete = () => {
    setShowHello(false);
    setIsUnlocking(false);
  };

  const handleReplayHello = () => {
    setIsUnlocking(false);
    setShowHello(true);
  };

  return (
    <main
      id="main-content"
      role="main"
      className="relative min-h-screen w-full bg-[#08080A] text-[#F4F4F6] overflow-x-hidden selection:bg-white selection:text-black font-sans"
    >
      {/* Apple iPhone-Style Multilingual "hello" Showcase */}
      {showHello && (
        <AppleHelloIntro
          onComplete={handleHelloComplete}
          onUnlocking={handleHelloUnlocking}
        />
      )}

      {/* Subtle Linear Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#16161c_1px,transparent_1px),linear-gradient(to_bottom,#16161c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Top Ambient Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Sleek Floating Navbar */}
      <SpatialHUD
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onReplayHello={handleReplayHello}
        activeSection={activeSection}
      />

      {/* Command Palette Modal (Cmd + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Content Stream with iOS Home Screen Zoom-In Transition */}
      <div
        className={`relative z-10 w-full transition-all duration-700 ease-out transform ${
          showHello && !isUnlocking
            ? "scale-[0.96] opacity-40 filter blur-[3px] pointer-events-none"
            : isUnlocking
            ? "scale-100 opacity-100 filter-none"
            : "scale-100 opacity-100 filter-none"
        }`}
      >
        <HeroSection
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onReplayHello={handleReplayHello}
        />
        <ExperienceSection />
        <ProjectsSection />
        <AboutSection />
        <RecognitionsSection />
        <ContactSection />
      </div>
    </main>
  );
}
