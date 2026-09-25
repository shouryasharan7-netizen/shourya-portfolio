"use client";

import React, { useState } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Play, Pause, Volume2, VolumeX, ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface VideoHeroAppProps {
  onClose?: () => void;
  onOpenApp?: (appId: string) => void;
  isWindow?: boolean;
}

export function VideoHeroApp({ onClose, onOpenApp, isWindow = false }: VideoHeroAppProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="flex flex-col h-full w-full bg-[#050508] text-white rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-white/10">
      {/* Title Bar */}
      {isWindow && (
        <div className="h-10 bg-[#121217] border-b border-white/10 flex items-center justify-between px-3.5 select-none flex-shrink-0">
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80"
                aria-label="Close"
              />
            )}
            <span className="text-xs font-semibold text-white tracking-tight ml-2">
              Hobro Cinema — Creative Engineering Reel
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded hover:bg-white/10 text-zinc-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* Main Cinematic Video Hero Canvas */}
      <div className="flex-1 relative flex flex-col justify-between p-8 sm:p-14 overflow-hidden bg-gradient-to-b from-[#08080C] via-[#0E0E14] to-[#040406]">
        {/* Dynamic Video Simulation Backdrop with Scanline & Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(220,38,38,0.18)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111116_1px,transparent_1px),linear-gradient(to_bottom,#111116_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
              STUDIO FILM // 2026 REEL
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-500">NAGPUR • GLOBAL</span>
        </div>

        {/* Center Massive Editorial Typography (hobro.digital style) */}
        <div className="relative z-10 my-auto py-8">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-red-500 mb-3 font-semibold">
            FIRST-PRINCIPLES COMPUTATION
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white uppercase drop-shadow-xl">
            I DON'T THINK IN DISCIPLINES.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
              I THINK IN PROBLEMS.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            Leading scientific discovery at The Walnut Initiative, building spatial UI systems at Descreened, and training predictive neural networks at STEMinate.
          </p>

          {/* Magnetic CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenApp?.("preview")}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <span>View Resume (Preview.app)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenApp?.("motocard")}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-white/20 text-white font-mono text-xs tracking-wider uppercase transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <span>3D Stainless Steel Card</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-zinc-400 font-mono text-xs">
          {PERSONAL_INFO.stats.map((s, i) => (
            <div key={i}>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                {s.value}
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
