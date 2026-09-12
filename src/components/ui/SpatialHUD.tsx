"use client";

import React, { useState, useEffect } from "react";
import { MusicPlayer } from "@/components/audio/MusicPlayer";
import { audioEngine } from "@/components/audio/AudioEngine";
import {
  Zap,
  Cpu,
  Menu,
  X,
  ChevronRight,
  FileText,
  Compass,
  Layers,
} from "lucide-react";

interface SpatialHUDProps {
  isHologramMode: boolean;
  onToggleHologram: () => void;
  onTriggerEMP: () => void;
  activeSection: string;
  isRecruiterMode: boolean;
  onToggleRecruiterMode: () => void;
}

const NAV_LINKS = [
  { label: "01. ABOUT", href: "#about" },
  { label: "02. EXPERIENCE", href: "#experience" },
  { label: "03. PROJECTS", href: "#projects" },
  { label: "04. HONORS", href: "#recognitions" },
  { label: "05. CONTACT", href: "#contact" },
];

export function SpatialHUD({
  isHologramMode,
  onToggleHologram,
  onTriggerEMP,
  activeSection,
  isRecruiterMode,
  onToggleRecruiterMode,
}: SpatialHUDProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    audioEngine.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Fixed Top Spatial HUD Bar */}
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-8 py-3 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand & Identity Link */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#hero");
              }}
              className="flex items-center gap-2 group min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-gold-400 rounded-sm"
              aria-label="Shourya Sharan — Return to top"
            >
              <div className="w-8 h-8 rounded-sm bg-black/90 border border-gold-500/40 flex items-center justify-center text-gold-400 font-serif text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-gold-400 group-hover:scale-105 transition-all">
                ♟
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif font-bold text-sm text-white tracking-widest group-hover:text-gold-400 transition-colors">
                  SHOURYA<span className="text-gold-400">.</span>
                </span>
                <span className="text-[9px] font-mono text-gray-400 tracking-wider hidden sm:block">
                  NAGPUR · {currentTime || "00:00:00"}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full border border-gold-500/20 bg-black/80 backdrop-blur-md pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                onMouseEnter={() => audioEngine.playHover()}
                className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 min-h-[32px] focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                  activeSection === link.href.substring(1)
                    ? "text-black bg-gold-400 font-semibold shadow-[0_0_12px_#D4AF37]"
                    : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Tools: Recruiter Mode + EMP + Hologram + Music */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Recruiter / Focused Reading Mode Toggle */}
            <button
              onClick={() => {
                audioEngine.playClick();
                onToggleRecruiterMode();
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-mono tracking-wider transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                isRecruiterMode
                  ? "border-gold-400 bg-gold-400 text-black font-semibold shadow-[0_0_15px_#D4AF37]"
                  : "border-zinc-700 bg-black/70 text-gray-300 hover:border-gold-400 hover:text-white"
              }`}
              title={
                isRecruiterMode
                  ? "Switch to 3D Tactical Cinematic Mode"
                  : "Switch to Clean Recruiter Fast-Reading Mode"
              }
              aria-label={
                isRecruiterMode
                  ? "Disable Recruiter Mode"
                  : "Enable Recruiter Mode"
              }
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isRecruiterMode ? "RECRUITER MODE ON" : "RECRUITER BRIEF"}
              </span>
            </button>

            {/* EMP Shockwave Trigger (Cinematic mode only) */}
            {!isRecruiterMode && (
              <button
                onClick={() => {
                  onTriggerEMP();
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full border border-amber-500/30 bg-black/60 text-amber-300 text-xs font-mono tracking-wider hover:border-amber-400 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber-400"
                title="Discharge 3D EMP Kinetic Shockwave"
                aria-label="Discharge 3D EMP Shockwave"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>EMP</span>
              </button>
            )}

            {/* Hologram CAD Mode Toggle */}
            {!isRecruiterMode && (
              <button
                onClick={() => {
                  audioEngine.playHoloToggle();
                  onToggleHologram();
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-mono tracking-wider transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-cyan-neon ${
                  isHologramMode
                    ? "border-cyan-neon bg-cyan-neon/20 text-cyan-neon shadow-[0_0_20px_rgba(0,240,255,0.5)]"
                    : "border-cyan-neon/30 bg-black/60 text-cyan-300 hover:border-cyan-neon hover:bg-cyan-neon/10"
                }`}
                title={
                  isHologramMode
                    ? "Switch to Solid Cybernetic King"
                    : "Switch to Hologram CAD Wireframe"
                }
                aria-label="Toggle Hologram CAD Mode"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{isHologramMode ? "CAD ON" : "CAD"}</span>
              </button>
            )}

            {/* Audio Player Widget */}
            <MusicPlayer />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden w-11 h-11 rounded-full border border-gold-500/30 bg-black/80 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 focus:outline-none focus:ring-2 focus:ring-gold-400"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dialog */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-6 lg:hidden"
        >
          <div className="flex flex-col gap-5 max-w-sm mx-auto w-full">
            <div className="flex items-center justify-between pb-3 border-b border-gold-500/30">
              <span className="text-xs font-mono text-gold-400 tracking-widest uppercase">
                // SYSTEM DIRECTORY
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
                aria-label="Close navigation dialog"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="flex items-center justify-between text-left py-3 border-b border-zinc-800 text-lg font-serif text-white hover:text-gold-400 transition-colors min-h-[44px]"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-gold-400" />
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  onToggleRecruiterMode();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 rounded-md border border-gold-500/40 bg-gold-500/10 text-gold-300 font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 min-h-[44px]"
              >
                <FileText className="w-4 h-4" />
                <span>
                  {isRecruiterMode ? "DISABLE RECRUITER VIEW" : "ENABLE RECRUITER VIEW"}
                </span>
              </button>

              <button
                onClick={() => {
                  onToggleHologram();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-md border border-cyan-neon/40 bg-cyan-neon/10 text-cyan-neon font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Cpu className="w-4 h-4" />
                <span>{isHologramMode ? "DISABLE HOLOGRAM" : "ENABLE HOLOGRAM CAD"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
