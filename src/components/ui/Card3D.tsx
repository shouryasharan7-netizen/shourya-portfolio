"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { audioEngine } from "@/components/audio/AudioEngine";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "gold" | "cyan" | "purple" | "amber";
  onClick?: () => void;
}

export function Card3D({
  children,
  className = "",
  glowColor = "gold",
  onClick,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates relative to card center (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for fluid tilt
  const springConfig = { damping: 18, stiffness: 220, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

  // Dynamic light glare gradient
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const glowStyles = {
    gold: "border-gold-500/30 hover:border-gold-400 hover:shadow-[0_15px_45px_rgba(212,175,55,0.25)]",
    cyan: "border-cyan-neon/30 hover:border-cyan-neon hover:shadow-[0_15px_45px_rgba(0,240,255,0.25)]",
    purple: "border-purple-500/30 hover:border-purple-400 hover:shadow-[0_15px_45px_rgba(168,85,247,0.25)]",
    amber: "border-amber-500/30 hover:border-amber-400 hover:shadow-[0_15px_45px_rgba(245,158,11,0.25)]",
  };

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full rounded-sm bg-obsidian-900/80 backdrop-blur-xl border transition-colors duration-300 p-6 sm:p-8 hud-corner overflow-hidden ${glowStyles[glowColor]} ${className}`}
      >
        {/* Holographic Laser Scanline Sweep on Hover */}
        {isHovered && (
          <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: "200%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-cyan-neon/15 to-transparent pointer-events-none z-30"
          />
        )}

        {/* Dynamic Hologram Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-sm opacity-0 hover:opacity-100 transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Inner Content with 3D Depth Projection */}
        <div style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }} className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
