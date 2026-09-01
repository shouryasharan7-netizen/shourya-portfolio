"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { audioEngine } from "@/components/audio/AudioEngine";
import { ArrowUpRight, Sparkles, Terminal, Activity, ShieldCheck } from "lucide-react";

export function HeroSection() {
  const [glitchText, setGlitchText] = useState("SHOURYA SHARAN");

  // Subtle typewriter effect for subtitle
  const subtitle = "I don't think in disciplines — I think in problems.";
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
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const triggerGlitch = () => {
    audioEngine.playHover();
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
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
      className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 sm:px-6 relative z-10 pt-24 pb-16"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Imperial Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-black/60 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-neon animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-gold-300 uppercase">
            ANNO DOMINI MMXXVI // RESEARCHER · BUILDER · DESIGNER
          </span>
        </motion.div>

        {/* Main 3D Spatial Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={triggerGlitch}
          className="text-4xl sm:text-7xl md:text-8xl font-black font-serif tracking-tight text-white mb-4 select-none cursor-pointer group"
          title="Hover to decode"
        >
          <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent group-hover:from-gold-200 group-hover:via-gold-400 group-hover:to-amber-500 transition-all duration-300 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {glitchText}
          </span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <div className="min-h-[32px] mb-8">
          <p className="text-base sm:text-xl text-gold-400 font-mono tracking-wider font-medium">
            &quot;{typedText}&quot;
            <span className="animate-pulse text-cyan-neon">_</span>
          </p>
        </div>

        {/* Hero Bio Blurb */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed mb-10 font-sans backdrop-blur-[2px]"
        >
          Sitting at the confluence of cognitive science, machine computation, and tactical visual design.
          Currently serving as <span className="text-white font-semibold">Chief Science Officer</span> at The Walnut Initiative
          and <span className="text-white font-semibold">Computational Researcher</span> at STEMinate.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            onClick={() => audioEngine.playClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 text-black font-semibold text-xs font-mono tracking-widest uppercase shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span>EXPLORE CRAFT</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            onClick={() => audioEngine.playClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="px-7 py-3.5 rounded-full border border-gold-500/30 bg-black/60 backdrop-blur-md text-gold-300 font-semibold text-xs font-mono tracking-widest uppercase hover:border-gold-400 hover:bg-gold-500/10 hover:text-white transition-all duration-200 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-gold-400" />
            <span>INITIATE SIGNAL</span>
          </a>
        </motion.div>

        {/* 4 Quick Stat Metric Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl"
        >
          {[
            { value: "200+", label: "INTERACTIONS DRIVEN", sub: "User Engagement" },
            { value: "97%", label: "BOARD SCORE", sub: "Top 1% Aggregate" },
            { value: "50+", label: "COMMUNITY LED", sub: "Economics & Tech" },
            { value: "4", label: "CONCURRENT ROLES", sub: "Active Leadership" },
          ].map((stat, i) => (
            <div
              key={i}
              onMouseEnter={() => audioEngine.playHover()}
              className="glass-card p-4 rounded-sm flex flex-col items-center text-center group cursor-pointer"
            >
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white group-hover:text-gold-400 transition-colors">
                {stat.value}
              </span>
              <span className="text-[10px] font-mono tracking-wider text-gold-400/90 font-semibold mt-1">
                {stat.label}
              </span>
              <span className="text-[9px] text-gray-500 font-sans mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
