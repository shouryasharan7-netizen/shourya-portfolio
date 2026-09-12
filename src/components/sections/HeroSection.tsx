"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Card3D } from "@/components/ui/Card3D";
import {
  ArrowUpRight,
  Briefcase,
  Layers,
  Sparkles,
  Zap,
  Download,
  Mail,
  Award,
  ChevronDown,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface HeroSectionProps {
  onTriggerEMP?: () => void;
  isRecruiterMode?: boolean;
}

export function HeroSection({ onTriggerEMP, isRecruiterMode }: HeroSectionProps) {
  const [glitchText, setGlitchText] = useState("SHOURYA SHARAN");
  const subtitle = "I don't think in disciplines. I think in problems.";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < subtitle.length) {
        setTypedText(subtitle.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const triggerGlitch = () => {
    audioEngine.playHover();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;
    const target = "SHOURYA SHARAN";

    const interval = setInterval(() => {
      setGlitchText(
        target
          .split("")
          .map((char, index) => {
            if (index < iterations) return target[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= target.length) {
        clearInterval(interval);
      }
      iterations += 1 / 2;
    }, 30);
  };

  return (
    <section
      id="hero"
      aria-label="Introduction & Overview"
      className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 relative z-10 pt-28 pb-16"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Tactical Signal Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold-500/30 bg-black/80 backdrop-blur-md mb-6 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-gold-300 uppercase">
            CHIEF SCIENCE OFFICER // COMPUTATIONAL RESEARCHER // UI ARCHITECT
          </span>
        </motion.div>

        {/* Semantic H1 with Glitch Decryption on Hover */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onMouseEnter={triggerGlitch}
          className="text-4xl sm:text-7xl md:text-8xl font-black font-serif tracking-tight text-white mb-4 select-none cursor-pointer group"
          title="Hover to trigger cryptographic decode"
        >
          <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent group-hover:from-gold-200 group-hover:via-gold-400 group-hover:to-amber-500 transition-all duration-300 drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
            {glitchText}
          </span>
        </motion.h1>

        {/* Dynamic Core Thesis Subtitle */}
        <div className="min-h-[32px] mb-6">
          <p className="text-base sm:text-xl text-gold-400 font-mono tracking-wider font-medium">
            &ldquo;{typedText}&rdquo;
            <span className="animate-pulse text-cyan-neon">_</span>
          </p>
        </div>

        {/* Direct, Credible Bio Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed mb-8 font-sans"
        >
          Operating at the intersection of <strong className="text-white font-semibold">cognitive science</strong>,{" "}
          <strong className="text-white font-semibold">machine computation</strong>, and{" "}
          <strong className="text-white font-semibold">tactile UI architecture</strong>. Currently serving as{" "}
          <span className="text-gold-300 font-medium">Chief Science Officer</span> at The Walnut Initiative,{" "}
          <span className="text-cyan-neon font-medium">Computational Researcher</span> at STEMinate, and{" "}
          <span className="text-white font-medium">Freelance UI Architect</span> at Descreened.
        </motion.p>

        {/* Primary Action Row: Immediate Value & Fast Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          {/* Primary CTA: Selected Work */}
          <a
            href="#projects"
            onClick={() => audioEngine.playClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 text-black font-semibold text-xs font-mono tracking-widest uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_45px_rgba(212,175,55,0.75)] hover:scale-105 transition-all min-h-[44px] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <span>EXPLORE WORK</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Secondary CTA: Experience Dossier */}
          <a
            href="#experience"
            onClick={() => audioEngine.playClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="px-6 py-3.5 rounded-full border border-gold-500/40 bg-black/70 text-gold-300 font-semibold text-xs font-mono tracking-widest uppercase hover:bg-gold-500/10 hover:border-gold-400 transition-all min-h-[44px] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <Briefcase className="w-4 h-4 text-gold-400" />
            <span>VIEW EXPERIENCE</span>
          </a>

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={() => audioEngine.playClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="px-5 py-3.5 rounded-full border border-zinc-700 bg-black/60 text-gray-300 font-semibold text-xs font-mono tracking-widest uppercase hover:border-zinc-500 hover:text-white transition-all min-h-[44px] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            <Mail className="w-4 h-4 text-gray-400" />
            <span>CONTACT</span>
          </a>

          {/* EMP Kinetic Shockwave (Only in visual mode) */}
          {onTriggerEMP && !isRecruiterMode && (
            <button
              onClick={onTriggerEMP}
              onMouseEnter={() => audioEngine.playHover()}
              className="px-4 py-3.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono tracking-widest uppercase hover:bg-amber-500/20 transition-all min-h-[44px] flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
              title="Discharge 3D particle kinetic pulse"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>EMP</span>
            </button>
          )}
        </motion.div>

        {/* 4 Multi-Layer Verified Metric Cards (Grounded strictly in resume) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          {PERSONAL_INFO.stats.map((stat, i) => (
            <Card3D
              key={i}
              glowColor={i === 0 ? "gold" : i === 1 ? "cyan" : i === 2 ? "purple" : "amber"}
              className="p-4 sm:p-5 flex flex-col items-center justify-center text-center"
            >
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white group-hover:text-gold-400 transition-colors">
                {stat.value}
              </span>
              <span className="text-[10px] font-mono tracking-wider text-gold-400/90 font-semibold mt-1">
                {stat.label}
              </span>
              <span className="text-[9px] text-gray-400 font-sans mt-0.5">
                {stat.sub}
              </span>
            </Card3D>
          ))}
        </motion.div>

        {/* Gentle Scroll Hint */}
        <div className="mt-12 flex flex-col items-center text-gray-500 text-[11px] font-mono tracking-widest uppercase animate-bounce">
          <span>Scroll to inspect trajectory</span>
          <ChevronDown className="w-4 h-4 mt-1 text-gold-400/60" />
        </div>
      </div>
    </section>
  );
}
