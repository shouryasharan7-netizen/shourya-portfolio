"use client";

import React, { useState, useEffect } from "react";
import { MusicPlayer } from "@/components/audio/MusicPlayer";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Compass, Eye, Menu, X, Terminal, ChevronRight } from "lucide-react";

interface SpatialHUDProps {
  isOrbitMode: boolean;
  onToggleOrbit: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { label: "01. ABOUT", href: "#about" },
  { label: "02. PATH", href: "#experience" },
  { label: "03. CRAFT", href: "#projects" },
  { label: "04. AWARDS", href: "#recognitions" },
  { label: "05. SIGNAL", href: "#contact" },
];

export function SpatialHUD({ isOrbitMode, onToggleOrbit, activeSection }: SpatialHUDProps) {
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
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand & Radar Coordinates */}
          <div className="flex items-center gap-4 pointer-events-auto">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#hero");
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-sm bg-black/80 border border-gold-500/40 flex items-center justify-center text-gold-400 font-serif text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-gold-400 group-hover:scale-105 transition-all">
                ♟
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm text-white tracking-widest group-hover:text-gold-400 transition-colors">
                  SHOURYA<span className="text-gold-400">.</span>
                </span>
                <span className="text-[9px] font-mono text-gray-400 tracking-wider hidden sm:block">
                  NAGPUR [21.14° N, 79.08° E] · {currentTime}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full border border-gold-500/20 bg-black/60 backdrop-blur-md pointer-events-auto shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                onMouseEnter={() => audioEngine.playHover()}
                className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                  activeSection === link.href.substring(1)
                    ? "text-black bg-gold-400 font-semibold shadow-[0_0_12px_#D4AF37]"
                    : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Tools: Orbit Mode Toggle + Music Player + Mobile Hamburger */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {/* 3D Orbit Mode Toggle */}
            <button
              onClick={() => {
                audioEngine.playClick();
                onToggleOrbit();
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border text-xs font-mono tracking-wider transition-all duration-200 ${
                isOrbitMode
                  ? "border-cyan-neon bg-cyan-neon/20 text-cyan-neon shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  : "border-gold-500/30 bg-black/60 text-gray-300 hover:border-gold-400 hover:text-gold-400"
              }`}
              title={isOrbitMode ? "Exit 3D Free-Orbit" : "Enable 3D Free-Orbit"}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isOrbitMode ? "3D ORBIT ON" : "3D ORBIT"}</span>
            </button>

            {/* Audio Synthesizer Widget */}
            <MusicPlayer />

            {/* Mobile Hamburger */}
            <button
              onClick={() => {
                audioEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden w-9 h-9 rounded-full border border-gold-500/30 bg-black/80 flex items-center justify-center text-gold-400 hover:bg-gold-500/20"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Glass Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center px-8 lg:hidden">
          <div className="flex flex-col gap-6 max-w-sm mx-auto w-full">
            <span className="text-xs font-mono text-gold-400/80 tracking-widest uppercase">
              // SPATIAL DIRECTORY
            </span>

            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="flex items-center justify-between text-left py-3 border-b border-gold-500/20 text-xl font-serif text-white hover:text-gold-400 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-gold-400" />
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  onToggleOrbit();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-md border border-cyan-neon/40 bg-cyan-neon/10 text-cyan-neon font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>{isOrbitMode ? "SWITCH TO SCROLL" : "SWITCH TO 3D ORBIT"}</span>
              </button>

              <a
                href="mailto:shouryasharan27@gmail.com"
                className="w-full py-3 rounded-md bg-gold-500 text-black font-semibold text-xs font-mono tracking-widest uppercase text-center hover:bg-gold-400 transition-colors"
              >
                INITIATE CONTACT →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
