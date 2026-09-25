"use client";

import React, { useState, useEffect, useRef } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Volume2, VolumeX, Sparkles, ArrowRight } from "lucide-react";

interface EraPreloaderProps {
  onComplete: () => void;
}

export function EraPreloader({ onComplete }: EraPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // High-precision luxury counter from 0 to 100% (inspired by era-residence.com)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            handleFinish();
          }
          return 100;
        }
        // Variable acceleration curve
        const step = prev < 30 ? 2 : prev < 75 ? 3 : prev < 95 ? 2 : 1;
        return Math.min(100, prev + step);
      });
    }, 28);

    return () => clearInterval(interval);
  }, []);

  const handleFinish = () => {
    setIsOpening(true);
    soundEngine.playBootChime();
    setTimeout(() => {
      onComplete();
    }, 950);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        if (!isOpening) {
          handleFinish();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpening]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="System Boot Sequence"
      className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden"
    >
      {/* Top Half Luxury Curtain Shutter */}
      <div
        style={{
          transform: isOpening ? "translateY(-100%)" : "translateY(0%)",
          transition: "transform 0.95s cubic-bezier(0.77, 0, 0.175, 1)",
        }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#09090C] border-b border-white/[0.08] flex flex-col justify-between p-8 sm:p-12 z-20"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
              Apple Silicon M3 Max • macOS 15.1
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const next = !audioEnabled;
                setAudioEnabled(next);
                soundEngine.setSoundEnabled(next);
              }}
              className="p-1.5 rounded-full border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-colors"
              title={audioEnabled ? "Mute boot audio" : "Enable boot audio"}
            >
              {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-600" />}
            </button>

            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 hover:border-white/25 bg-zinc-900/60 text-zinc-300 hover:text-white text-xs font-mono transition-all"
            >
              <span>Skip</span>
              <ArrowRight className="w-3 h-3 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Studio Branding */}
        <div className="mt-auto">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-red-500/80 mb-2">
            RESEARCH & ARCHITECTURE WORKSTATION
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-light tracking-tighter text-white">
            Shourya Sharan
          </h1>
        </div>
      </div>

      {/* Bottom Half Luxury Curtain Shutter */}
      <div
        style={{
          transform: isOpening ? "translateY(100%)" : "translateY(0%)",
          transition: "transform 0.95s cubic-bezier(0.77, 0, 0.175, 1)",
        }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#09090C] border-t border-white/[0.08] flex flex-col justify-between p-8 sm:p-12 z-20"
      >
        {/* Center Progress Bar & Counter (era-residence inspired) */}
        <div className="w-full max-w-xl mx-auto my-auto text-center flex flex-col items-center gap-4">
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-mono text-5xl sm:text-7xl font-light text-white tracking-tighter">
              {progress.toString().padStart(2, "0")}
            </span>
            <span className="text-lg font-mono text-zinc-500">%</span>
          </div>

          {/* Micro Progress Bar */}
          <div className="w-64 sm:w-80 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-white transition-all duration-75 ease-out"
            />
          </div>

          <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
            Mounting desktop environment • loading neural models
          </p>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between w-full text-[10px] font-mono text-zinc-500">
          <span>NAGPUR, INDIA // 21.1458° N, 79.0882° E</span>
          <span className="hidden sm:inline">I DON'T THINK IN DISCIPLINES. I THINK IN PROBLEMS.</span>
          <span>ENTER WORKSPACE ↵</span>
        </div>
      </div>
    </div>
  );
}
