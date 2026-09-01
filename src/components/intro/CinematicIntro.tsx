"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Sparkles, Play, FastForward, Volume2 } from "lucide-react";

interface Snapshot {
  title: string;
  tagline: string;
  subtitle: string;
  year: string;
  category: string;
  accent: string;
  icon: string;
  rotation: number;
}

const SNAPSHOTS: Snapshot[] = [
  {
    title: "THE STRATEGIST",
    tagline: "District U-19 Chess · Tactical Calculation",
    subtitle: "3 Consecutive Years DSO Chess & Football Representation",
    year: "EST. 2022",
    category: "STRATEGY // COGNITION",
    accent: "#D4AF37",
    icon: "♟️",
    rotation: -4,
  },
  {
    title: "THE RESEARCHER",
    tagline: "Chief Science Officer & ML Researcher",
    subtitle: "The Walnut Initiative & STEMinate · Co-Authoring AI Papers",
    year: "EST. 2024",
    category: "RESEARCH // COMPUTATION",
    accent: "#00F0FF",
    icon: "🧬",
    rotation: 5,
  },
  {
    title: "THE ARCHITECT",
    tagline: "Ignicion & Project Cenquity AR Glasses",
    subtitle: "Heritage Cultural Tech & Wearable Reality Interfaces",
    year: "EST. 2025",
    category: "DESIGN // HARDWARE",
    accent: "#E5C06E",
    icon: "⚡",
    rotation: -3,
  },
  {
    title: "THE CATALYST",
    tagline: "Head of Tech & Operations · ThinkEconomics",
    subtitle: "Leading 50+ members & National Finalist Top 3% at TGELF",
    year: "EST. 2026",
    category: "LEADERSHIP // IMPACT",
    accent: "#FFB703",
    icon: "🏛️",
    rotation: 4,
  },
];

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);

  // Auto-play the sequence once started
  useEffect(() => {
    if (!hasStarted) return;

    audioEngine.playIntroTheme();

    const interval = setInterval(() => {
      setStep((prev) => {
        audioEngine.playShutter();
        if (prev < SNAPSHOTS.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          handleFinish();
          return prev;
        }
      });
    }, 750); // Snappy HIMYM-style tempo (0.75s per frame)

    return () => clearInterval(interval);
  }, [hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
    audioEngine.playClick();
  };

  const handleFinish = () => {
    setIsFinishing(true);
    audioEngine.playWarp();
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  const handleSkip = () => {
    audioEngine.playClick();
    onComplete();
  };

  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#030305] flex flex-col items-center justify-center overflow-hidden select-none px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/15 via-obsidian-950/80 to-[#030305] pointer-events-none" />

          {/* Top Skip Button */}
          <div className="absolute top-6 right-6 z-20">
            <button
              onClick={handleSkip}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-black/60 text-gold-300 text-xs font-mono tracking-widest uppercase hover:bg-gold-500/20 hover:border-gold-400 transition-all duration-200"
            >
              Skip Intro <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {!hasStarted ? (
            /* Pre-Launch Screen */
            <motion.div
              className="relative z-10 text-center max-w-xl flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>Cinematic Experience</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold font-serif tracking-tight text-white mb-4">
                SHOURYA <span className="text-gold-400 font-sans">SHARAN</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-400 font-sans tracking-wide leading-relaxed mb-8 max-w-md">
                A 3D spatial experience in cognitive science, computation, and tactical systems design.
              </p>

              <button
                onClick={handleStart}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 text-black font-semibold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.8)] hover:scale-105 transition-all duration-300"
              >
                <Play className="w-4 h-4 fill-black group-hover:translate-x-0.5 transition-transform" />
                <span>Launch Experience</span>
                <Volume2 className="w-4 h-4 ml-1 opacity-75" />
              </button>

              <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mt-4">
                Audio enabled · Best with sound
              </span>
            </motion.div>
          ) : (
            /* HIMYM-Style Rapid Snapshot Reel */
            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center min-h-[480px]">
              {step < SNAPSHOTS.length ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    className="relative w-[320px] sm:w-[420px] bg-white p-5 sm:p-6 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.9)] border-4 border-white"
                    initial={{
                      scale: 0.7,
                      opacity: 0,
                      rotate: SNAPSHOTS[step].rotation * 2,
                      y: 30,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: SNAPSHOTS[step].rotation,
                      y: 0,
                    }}
                    exit={{
                      scale: 1.15,
                      opacity: 0,
                      filter: "blur(6px)",
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.175, 0.885, 0.32, 1.275],
                    }}
                  >
                    {/* Retro Yellowish Tint Photo Card */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-amber-950 via-obsidian-950 to-black rounded-sm overflow-hidden flex flex-col items-center justify-center p-6 border border-amber-500/20 text-center">
                      <div className="text-5xl sm:text-6xl mb-3 drop-shadow-md">
                        {SNAPSHOTS[step].icon}
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase bg-black/60 px-2 py-0.5 rounded border border-gold-500/30 mb-1">
                        {SNAPSHOTS[step].category}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wider">
                        {SNAPSHOTS[step].title}
                      </h2>
                    </div>

                    {/* Polaroid Bottom Note */}
                    <div className="pt-4 text-black text-center font-sans">
                      <p className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-900">
                        {SNAPSHOTS[step].tagline}
                      </p>
                      <p className="text-[11px] text-zinc-600 mt-1 font-mono">
                        {SNAPSHOTS[step].subtitle}
                      </p>
                      <div className="flex justify-between items-center mt-3 pt-2 border-t border-zinc-200 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        <span>SHOURYA SHARAN</span>
                        <span>{SNAPSHOTS[step].year}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                /* Climax Finale Title Card */
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-gold-400 block mb-2">
                    AND THIS IS HOW
                  </span>
                  <h1 className="text-4xl sm:text-7xl font-bold font-serif text-white tracking-tight leading-none mb-6">
                    WE BUILD <span className="text-gold-400">THE FUTURE.</span>
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-neon/40 bg-cyan-neon/10 text-cyan-neon font-mono text-xs tracking-widest animate-pulse">
                    ENTERING 3D DOMAIN...
                  </div>
                </motion.div>
              )}

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 mt-8">
                {SNAPSHOTS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i <= step
                        ? "w-8 bg-gold-400 shadow-[0_0_8px_#D4AF37]"
                        : "w-2 bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
