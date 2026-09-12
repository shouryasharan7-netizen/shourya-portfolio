"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  Sparkles,
  Mail,
  ChevronRight,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface SpatialHUDProps {
  onOpenCommandPalette: () => void;
  onReplayHello?: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { label: "Overview", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Honors", href: "#recognitions" },
  { label: "Skills", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SpatialHUD({
  onOpenCommandPalette,
  onReplayHello,
  activeSection,
}: SpatialHUDProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3.5 transition-all duration-300 pointer-events-none"
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-300 pointer-events-auto ${
          scrolled
            ? "bg-[#08080A]/85 backdrop-blur-xl border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
            : "bg-[#08080A]/50 backdrop-blur-md border-white/[0.06]"
        }`}
      >
        {/* Brand Logo & Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#hero");
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Shourya Sharan — Home"
        >
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center text-zinc-100 font-serif text-xs font-bold group-hover:border-amber-400 group-hover:text-amber-400 transition-colors">
            ♟
          </div>
          <div className="flex items-center gap-1.5 font-medium text-xs tracking-tight text-zinc-200">
            <span className="font-semibold text-white">Shourya Sharan</span>
            <span className="text-zinc-500 hidden sm:inline">/</span>
            <span className="text-zinc-400 text-[11px] font-mono hidden sm:inline">
              CSO & Researcher
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "text-white bg-white/10 font-semibold shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: Hello Replay + Cmd+K + Contact */}
        <div className="flex items-center gap-2">
          {/* Replay Hello Intro Button */}
          {onReplayHello && (
            <button
              onClick={onReplayHello}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 hover:border-amber-400/40 text-zinc-400 hover:text-amber-300 text-[11px] font-mono transition-all"
              title="Replay Apple Hello Opening Sequence"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>hello</span>
            </button>
          )}

          {/* Command Palette Trigger Pill */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-zinc-200 text-xs transition-all shadow-inner focus:outline-none"
            aria-label="Open Command Palette"
            title="Search or press Cmd+K"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[9px] font-mono font-medium text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Contact Button */}
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <Mail className="w-3 h-3 text-black" />
            <span>Contact</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full border border-white/10 bg-zinc-900/80 flex items-center justify-center text-zinc-300 hover:text-white"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#08080A]/95 backdrop-blur-2xl flex flex-col justify-center px-6 md:hidden pointer-events-auto"
        >
          <div className="flex flex-col gap-5 max-w-sm mx-auto w-full">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase">
                Directory
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="flex items-center justify-between text-left py-2.5 border-b border-zinc-900 text-base text-zinc-200 hover:text-white transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-2.5">
              {onReplayHello && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayHello();
                  }}
                  className="w-full py-2.5 rounded-lg bg-zinc-900/80 border border-amber-400/30 text-amber-300 text-xs font-mono flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Replay Apple Hello Opening</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-2"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Commands (Cmd + K)</span>
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-full py-2.5 rounded-lg bg-white text-black text-xs font-semibold text-center"
              >
                Email Shourya
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
