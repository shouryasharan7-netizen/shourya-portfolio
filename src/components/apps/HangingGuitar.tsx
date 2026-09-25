"use client";

import React, { useState } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Volume2, Music, Sparkles, X, RotateCcw } from "lucide-react";

interface HangingGuitarProps {
  onClose?: () => void;
  isWindow?: boolean;
}

export function HangingGuitar({ onClose, isWindow = false }: HangingGuitarProps) {
  const [activeString, setActiveString] = useState<number | null>(null);
  const [lastPlayedNote, setLastPlayedNote] = useState<string>("Hover or click strings to play");

  const STRINGS = [
    { name: "6 • Low E", freq: "82.4 Hz", note: "E2", color: "#C0A080", width: 3.5 },
    { name: "5 • A", freq: "110.0 Hz", note: "A2", color: "#C5A888", width: 3.0 },
    { name: "4 • D", freq: "146.8 Hz", note: "D3", color: "#D0B498", width: 2.5 },
    { name: "3 • G", freq: "196.0 Hz", note: "G3", color: "#E0C8B0", width: 2.0 },
    { name: "2 • B", freq: "246.9 Hz", note: "B3", color: "#E8D5C0", width: 1.6 },
    { name: "1 • High E", freq: "329.6 Hz", note: "E4", color: "#F0E4D4", width: 1.2 },
  ];

  const playString = (index: number) => {
    setActiveString(index);
    soundEngine.playGuitarString(index);
    setLastPlayedNote(`Plucked: String ${STRINGS[index].name} (${STRINGS[index].freq})`);

    setTimeout(() => {
      setActiveString(null);
    }, 450);
  };

  const handleStrum = () => {
    soundEngine.playGuitarStrum();
    setLastPlayedNote("Strummed: E Minor Acoustic Harmony");
    // Cascading string animation
    STRINGS.forEach((_, i) => {
      setTimeout(() => {
        setActiveString(i);
        setTimeout(() => setActiveString(null), 300);
      }, i * 40);
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#120E0F] text-zinc-200 rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-red-950/40">
      {/* Window Header */}
      {isWindow && (
        <div className="h-10 bg-[#1F171A] border-b border-white/10 flex items-center justify-between px-3.5 select-none flex-shrink-0">
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80"
                aria-label="Close"
              />
            )}
            <span className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5 ml-2">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              <span>Acoustic Guitar Studio — 6-String Physical Modeling</span>
            </span>
          </div>

          <button
            onClick={handleStrum}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 hover:bg-amber-500 text-black text-[11px] font-bold font-mono transition-transform active:scale-95 cursor-pointer shadow-md"
          >
            <Sparkles className="w-3 h-3" />
            <span>STRUM CHORD</span>
          </button>
        </div>
      )}

      {/* Main Guitar Hanging Body & Strumming Area */}
      <div className="flex-1 p-6 flex flex-col md:flex-row items-center justify-center gap-6 overflow-y-auto relative">
        {/* Leather Hanging Strap Mount at Top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-12 bg-amber-950/80 rounded-t-sm border-t-2 border-amber-800 shadow-inner flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 shadow-md" />
        </div>

        {/* The Hanging Acoustic Dreadnought Guitar Illustration (SVG) */}
        <div className="relative w-64 sm:w-72 h-[480px] flex items-center justify-center filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
          <svg viewBox="0 0 240 460" className="w-full h-full">
            {/* Guitar Body Base Wood Gradient */}
            <defs>
              <linearGradient id="guitarWood" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A1E14" />
                <stop offset="35%" stopColor="#8C3B1E" />
                <stop offset="70%" stopColor="#C46E32" />
                <stop offset="100%" stopColor="#2E120B" />
              </linearGradient>

              <radialGradient id="sunburst" cx="50%" cy="65%" r="45%">
                <stop offset="0%" stopColor="#E59846" />
                <stop offset="55%" stopColor="#9C441D" />
                <stop offset="100%" stopColor="#2B0E09" />
              </radialGradient>
            </defs>

            {/* Headstock at Top */}
            <path
              d="M102,15 L100,70 L140,70 L138,15 Q120,8 102,15 Z"
              fill="#2E120B"
              stroke="#150805"
              strokeWidth="2"
            />
            {/* Tuning Pegs */}
            {[25, 42, 58].map((y, i) => (
              <g key={i}>
                <circle cx="94" cy={y} r="4.5" fill="#D4AF37" stroke="#333" strokeWidth="1" />
                <circle cx="146" cy={y} r="4.5" fill="#D4AF37" stroke="#333" strokeWidth="1" />
              </g>
            ))}

            {/* Nut */}
            <rect x="100" y="70" width="40" height="4" fill="#F4EADB" rx="1" />

            {/* Rosewood Fretboard Neck */}
            <rect x="101" y="74" width="38" height="150" fill="#1C120C" />
            {/* Metal Frets */}
            {[88, 102, 116, 132, 148, 166, 184, 204].map((fy, fi) => (
              <line
                key={fi}
                x1="101"
                y1={fy}
                x2="139"
                y2={fy}
                stroke="#C0C0C0"
                strokeWidth="1.2"
                opacity="0.8"
              />
            ))}
            {/* Mother of Pearl Position Dots */}
            <circle cx="120" cy="124" r="2.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="120" cy="157" r="2.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="120" cy="194" r="2.5" fill="#FFFFFF" opacity="0.9" />

            {/* Acoustic Guitar Body (Figure-8 Silhouette) */}
            <path
              d="M101,220 
                 C65,224 45,250 45,280 
                 C45,308 65,324 75,335 
                 C50,355 35,385 35,420 
                 C35,465 75,475 120,475 
                 C165,475 205,465 205,420 
                 C205,385 190,355 165,335 
                 C175,324 195,308 195,280 
                 C195,250 175,224 139,220 Z"
              fill="url(#sunburst)"
              stroke="#D4AF37"
              strokeWidth="2.5"
            />

            {/* Soundhole with Rosette Rings */}
            <circle cx="120" cy="305" r="28" fill="#120A07" stroke="#25120B" strokeWidth="4" />
            <circle cx="120" cy="305" r="32" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="120" cy="305" r="35" fill="none" stroke="#E59846" strokeWidth="0.8" />

            {/* Bridge & Saddle */}
            <rect x="96" y="395" width="48" height="14" rx="2" fill="#20100A" stroke="#100805" strokeWidth="1" />
            <rect x="100" y="398" width="40" height="3" rx="0.5" fill="#F4EADB" />

            {/* The 6 Interactive Vibrating Strings */}
            {STRINGS.map((str, idx) => {
              const xPos = 104 + idx * 6.4;
              const isVibrating = activeString === idx;

              return (
                <g key={idx} className="cursor-pointer group" onClick={() => playString(idx)}>
                  {/* Invisible Wide Hitbox for Easy Mouse Hover / Pluck */}
                  <line
                    x1={xPos}
                    y1="70"
                    x2={xPos}
                    y2="400"
                    stroke="transparent"
                    strokeWidth="12"
                    onMouseEnter={() => playString(idx)}
                  />

                  {/* Visible Harmonic String with Sine Wave Vibration */}
                  {isVibrating ? (
                    <path
                      d={`M${xPos},70 Q${xPos + 6},235 ${xPos},400`}
                      stroke="#FFFFFF"
                      strokeWidth={str.width + 1}
                      fill="none"
                      className="animate-pulse"
                      filter="drop-shadow(0 0 6px rgba(255,255,255,0.8))"
                    />
                  ) : (
                    <line
                      x1={xPos}
                      y1="70"
                      x2={xPos}
                      y2="400"
                      stroke={str.color}
                      strokeWidth={str.width}
                      className="transition-colors group-hover:stroke-white"
                      opacity="0.9"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* String Control Cards & Acoustic Readouts */}
        <div className="flex flex-col gap-3 max-w-xs w-full">
          <div className="bg-black/40 p-4 rounded-xl border border-white/10 shadow-inner">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-1">
              Active Acoustic State
            </span>
            <p className="text-sm font-mono text-white font-medium">
              {lastPlayedNote}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block px-1">
              Click String to Pluck:
            </span>
            {STRINGS.map((str, i) => (
              <button
                key={i}
                onClick={() => playString(i)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                  activeString === i
                    ? "bg-amber-500 text-black font-bold border-amber-400 scale-[1.02]"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300 border-white/5 hover:border-white/15"
                }`}
              >
                <span>{str.name}</span>
                <span className="opacity-70 text-[10px]">{str.note} • {str.freq}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleStrum}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all mt-2 cursor-pointer"
          >
            Strum All 6 Strings
          </button>
        </div>
      </div>
    </div>
  );
}
