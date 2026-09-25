"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Music, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";

interface DesktopHangingGuitarProps {
  onOpenStudio: () => void;
}

export function DesktopHangingGuitar({ onOpenStudio }: DesktopHangingGuitarProps) {
  const [activeString, setActiveString] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [swayAngle, setSwayAngle] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [lastPlucked, setLastPlucked] = useState<string>("");

  const STRINGS = [
    { name: "Low E", note: "E2", freq: "82.4Hz", color: "#C0A080", width: 2.8 },
    { name: "A", note: "A2", freq: "110.0Hz", color: "#C5A888", width: 2.4 },
    { name: "D", note: "D3", freq: "146.8Hz", color: "#D0B498", width: 2.0 },
    { name: "G", note: "G3", freq: "196.0Hz", color: "#E0C8B0", width: 1.6 },
    { name: "B", note: "B3", freq: "246.9Hz", color: "#E8D5C0", width: 1.3 },
    { name: "High E", note: "E4", freq: "329.6Hz", color: "#F0E4D4", width: 1.0 },
  ];

  const pluckString = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveString(index);
    soundEngine.playGuitarString(index);
    setLastPlucked(`${STRINGS[index].note} (${STRINGS[index].name})`);

    // Subtle physical reaction sway
    setSwayAngle((index % 2 === 0 ? 1 : -1) * 1.5);
    setTimeout(() => setSwayAngle(0), 400);

    setTimeout(() => {
      setActiveString(null);
    }, 350);
  };

  const strumAll = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundEngine.playGuitarStrum();
    setLastPlucked("Strum: E Minor Harmonic Resonance");
    STRINGS.forEach((_, i) => {
      setTimeout(() => {
        setActiveString(i);
        setTimeout(() => setActiveString(null), 250);
      }, i * 35);
    });
  };

  // Keyboard shortcut keys 1-6 to pluck strings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= "1" && key <= "6") {
        const idx = parseInt(key, 10) - 1;
        pluckString(idx);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isMinimized) {
    return (
      <div className="absolute top-12 right-2 z-10 hidden lg:flex items-center">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-l-xl bg-black/60 hover:bg-black/80 border-l border-y border-white/15 backdrop-blur-md text-amber-300 font-mono text-xs shadow-xl transition-all hover:scale-105 cursor-pointer"
          title="Show Hanging Guitar"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>🎸 Guitar</span>
        </button>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-9 right-4 sm:right-8 z-10 hidden lg:flex flex-col items-center pointer-events-auto select-none"
    >
      {/* Wall Hanger Mount & Leather Strap */}
      <div className="flex flex-col items-center">
        {/* Brass Wall Mount Rosette */}
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 border border-amber-300 shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 shadow-inner" />
        </div>

        {/* Leather Suspension Strap */}
        <div className="w-3 h-8 bg-gradient-to-b from-[#3D2012] to-[#201008] border-x border-[#5A321E] shadow-sm flex items-center justify-center">
          <div className="w-[1px] h-full bg-[#150A05]" />
        </div>
      </div>

      {/* Hanging Physical Guitar Body (Swaying with spring physics) */}
      <div
        style={{
          transformOrigin: "top center",
          transform: `rotate(${swayAngle}deg) ${isHovered ? "scale(1.02)" : "scale(1)"}`,
          transition: "transform 0.35s cubic-bezier(0.2, 0.8, 0.4, 1)",
        }}
        className="relative w-44 h-80 flex flex-col items-center cursor-pointer group"
        onClick={onOpenStudio}
        title="Click guitar to open Acoustic Studio • Sweep mouse over strings to play"
      >
        {/* Realistic SVG Acoustic Dreadnought Guitar */}
        <svg viewBox="0 0 240 450" className="w-full h-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]">
          <defs>
            <radialGradient id="hangingSunburst" cx="50%" cy="65%" r="45%">
              <stop offset="0%" stopColor="#E59846" />
              <stop offset="55%" stopColor="#9C441D" />
              <stop offset="100%" stopColor="#2B0E09" />
            </radialGradient>
          </defs>

          {/* Headstock */}
          <path d="M102,15 L100,65 L140,65 L138,15 Q120,8 102,15 Z" fill="#2E120B" stroke="#150805" strokeWidth="2" />
          {/* Tuning Pegs */}
          {[22, 38, 54].map((y, i) => (
            <g key={i}>
              <circle cx="94" cy={y} r="4" fill="#D4AF37" stroke="#333" strokeWidth="1" />
              <circle cx="146" cy={y} r="4" fill="#D4AF37" stroke="#333" strokeWidth="1" />
            </g>
          ))}

          {/* Bone Nut */}
          <rect x="100" y="65" width="40" height="4" fill="#F4EADB" rx="1" />

          {/* Rosewood Fretboard Neck */}
          <rect x="101" y="69" width="38" height="150" fill="#1C120C" />
          {/* Frets */}
          {[82, 96, 110, 126, 142, 160, 178, 198].map((fy, fi) => (
            <line key={fi} x1="101" y1={fy} x2="139" y2={fy} stroke="#C0C0C0" strokeWidth="1" opacity="0.8" />
          ))}
          {/* Position Dots */}
          <circle cx="120" cy="118" r="2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="120" cy="151" r="2" fill="#FFFFFF" opacity="0.9" />
          <circle cx="120" cy="188" r="2" fill="#FFFFFF" opacity="0.9" />

          {/* Acoustic Guitar Body */}
          <path
            d="M101,215 
               C65,220 45,245 45,275 
               C45,302 65,318 75,328 
               C50,348 35,378 35,412 
               C35,455 75,465 120,465 
               C165,465 205,455 205,412 
               C205,378 190,348 165,328 
               C175,318 195,302 195,275 
               C195,245 175,220 139,215 Z"
            fill="url(#hangingSunburst)"
            stroke="#D4AF37"
            strokeWidth="2"
          />

          {/* Soundhole with Rosette */}
          <circle cx="120" cy="298" r="26" fill="#120A07" stroke="#25120B" strokeWidth="3" />
          <circle cx="120" cy="298" r="30" fill="none" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Bridge & Saddle */}
          <rect x="96" y="388" width="48" height="12" rx="2" fill="#20100A" stroke="#100805" strokeWidth="1" />
          <rect x="100" y="391" width="40" height="2.5" rx="0.5" fill="#F4EADB" />

          {/* Interactive Strings (Pluckable on hover / sweep) */}
          {STRINGS.map((str, idx) => {
            const xPos = 104 + idx * 6.4;
            const isVibrating = activeString === idx;

            return (
              <g
                key={idx}
                className="cursor-pointer"
                onMouseEnter={(e) => pluckString(idx, e)}
                onClick={(e) => pluckString(idx, e)}
              >
                {/* Wide invisible hit area */}
                <line
                  x1={xPos}
                  y1="65"
                  x2={xPos}
                  y2="390"
                  stroke="transparent"
                  strokeWidth="10"
                />

                {/* Visible String with sine wave vibration */}
                {isVibrating ? (
                  <path
                    d={`M${xPos},65 Q${xPos + 5},228 ${xPos},390`}
                    stroke="#FFFFFF"
                    strokeWidth={str.width + 1.2}
                    fill="none"
                    filter="drop-shadow(0 0 5px rgba(255,255,255,0.9))"
                  />
                ) : (
                  <line
                    x1={xPos}
                    y1="65"
                    x2={xPos}
                    y2="390"
                    stroke={str.color}
                    strokeWidth={str.width}
                    opacity="0.95"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Mini Action Pill */}
        <div className="absolute -bottom-8 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 hover:bg-black/90 border border-white/15 backdrop-blur-md text-[10px] font-mono text-amber-300 shadow-xl">
            <Music className="w-3 h-3 text-amber-400" />
            <span>{lastPlucked || "Sweep strings to play"}</span>
          </div>
          <span className="text-[9px] font-mono text-zinc-400">Keys 1–6 to pluck</span>
        </div>
      </div>

      {/* Minimize chevron */}
      <button
        onClick={() => setIsMinimized(true)}
        className="mt-12 p-1 rounded-full bg-black/40 hover:bg-black/70 text-zinc-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
        title="Hide guitar"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
