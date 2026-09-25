"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Sparkles, RotateCw, Wifi, Shield, X } from "lucide-react";

interface MotoCard3DProps {
  onClose?: () => void;
  isWindow?: boolean;
}

export function MotoCard3D({ onClose, isWindow = false }: MotoCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);

  // Dynamic light glare gradient tracking cursor
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    soundEngine.playWindowClick();
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0D0D12] text-zinc-100 rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-white/10">
      {/* Title Bar */}
      {isWindow && (
        <div className="h-10 bg-[#1A1A22] border-b border-white/10 flex items-center justify-between px-3.5 select-none flex-shrink-0">
          <div className="flex items-center gap-2">
            {onClose && (
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80"
                aria-label="Close"
              />
            )}
            <span className="text-xs font-semibold text-white tracking-tight ml-2 flex items-center gap-1.5">
              <span>💳</span>
              <span>MOTO Stainless Steel Identity Card — 3D Physical Material</span>
            </span>
          </div>

          <button
            onClick={toggleFlip}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-mono transition-colors"
          >
            <RotateCw className="w-3 h-3" />
            <span>Flip Card</span>
          </button>
        </div>
      )}

      {/* Main 3D Card Stage */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center overflow-hidden perspective-[1400px]">
        {/* Interactive 3D Card Shell */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY: isFlipped ? 180 : rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-80 sm:w-96 aspect-[1.586/1] rounded-2xl cursor-grab active:cursor-grabbing transition-transform duration-500 shadow-[0_30px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(255,255,255,0.06)]"
        >
          {/* FRONT: Brushed Stainless Steel */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/40 p-6 flex flex-col justify-between bg-gradient-to-tr from-[#1E2024] via-[#353A40] to-[#25282E]"
          >
            {/* Brushed Metal Texture Effect */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-300 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,#fff,#fff_1px,transparent_1px,transparent_4px)] pointer-events-none" />

            {/* Specular Glare Reflection Tracking Cursor */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
              }}
              className="absolute inset-0 pointer-events-none"
            />

            {/* Top Bar: Contactless Wave + Bank/Brand */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-white/95 uppercase">
                  SHOURYA.OS
                </span>
                <span className="text-[10px] font-mono text-zinc-400">// 316L STEEL</span>
              </div>
              <Wifi className="w-5 h-5 text-white/80 rotate-90" />
            </div>

            {/* Middle: Gold EMV Microchip */}
            <div className="relative z-10 my-auto flex items-center gap-4">
              {/* EMV Microchip (Gold with specular circuits) */}
              <div className="w-12 h-9 rounded-md bg-gradient-to-br from-[#FFE082] via-[#FFD54F] to-[#FFA000] border border-[#FFB300] shadow-md p-1 grid grid-cols-3 grid-rows-2 gap-0.5">
                <div className="border-r border-b border-amber-700/60 rounded-tl" />
                <div className="border-b border-amber-700/60" />
                <div className="border-l border-b border-amber-700/60 rounded-tr" />
                <div className="border-r border-amber-700/60 rounded-bl" />
                <div className="border-t border-amber-700/60" />
                <div className="border-l border-amber-700/60 rounded-br" />
              </div>

              <div className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                FIRST PRINCIPLES // ZERO DEBT
              </div>
            </div>

            {/* Bottom: Engraved Credentials & Card Number */}
            <div className="relative z-10">
              <div className="font-mono text-sm sm:text-base tracking-[0.2em] text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                •••• •••• •••• 2026
              </div>

              <div className="flex items-end justify-between mt-3">
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                    CARDHOLDER / ARCHITECT
                  </div>
                  <div className="font-sans font-bold text-xs sm:text-sm text-white tracking-wider uppercase">
                    Shourya Sharan
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                    EXPIRES
                  </div>
                  <div className="font-mono text-xs text-white">
                    07 / 28
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK: Magnetic Stripe & Holographic Seal */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/30 p-6 flex flex-col justify-between bg-gradient-to-tr from-[#1E2024] via-[#2A2E34] to-[#1E2024]"
          >
            {/* Magnetic Stripe at Top */}
            <div className="absolute top-6 left-0 right-0 h-10 bg-black/90 shadow-inner" />

            <div className="mt-14 relative z-10">
              {/* White Signature Panel with CVV */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-7 bg-zinc-200 rounded px-2 flex items-center font-serif italic text-zinc-800 text-xs select-none">
                  Shourya Sharan
                </div>
                <div className="bg-black/80 px-2 py-1 rounded border border-white/20 font-mono text-xs text-white">
                  994
                </div>
              </div>

              <p className="text-[8px] font-mono text-zinc-400 mt-3 leading-relaxed">
                Authorized for strategic computation, high-performance web engineering, and cognitive architecture. Designed with 316L medical-grade stainless steel.
              </p>
            </div>

            {/* Bottom Holographic Seal */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Shield className="w-3.5 h-3.5" />
                <span>NANO-VERIFIED</span>
              </span>
              <span>IIT MADRAS • CENTRE POINT</span>
            </div>
          </div>
        </motion.div>

        {/* Interaction Controls */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={toggleFlip}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-mono transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-400" />
            <span>{isFlipped ? "Show Front" : "Flip to Back"}</span>
          </button>
          <span className="text-[11px] font-mono text-zinc-400">
            Hover & move cursor to tilt in 3D space
          </span>
        </div>
      </div>
    </div>
  );
}
