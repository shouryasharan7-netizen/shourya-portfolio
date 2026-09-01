"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CyberCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "BUTTON" ||
        target?.tagName === "A" ||
        target?.closest("button") ||
        target?.closest("a") ||
        target?.classList.contains("interactive") ||
        target?.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.body.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#D4AF37]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isClicked ? 0.6 : isHovered ? 1.5 : 1,
        }}
      />

      {/* Outer Tactical Crosshair Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
          isHovered
            ? "border-cyan-neon bg-cyan-neon/10 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            : "border-gold-500/50 bg-transparent"
        }`}
        style={{
          x: trailX,
          y: trailY,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          scale: isClicked ? 0.8 : 1,
        }}
      >
        {/* Tactical Crosshair Ticks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0.5 h-1 bg-gold-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0.5 h-1 bg-gold-400" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-0.5 w-1 bg-gold-400" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-0.5 w-1 bg-gold-400" />
      </motion.div>
    </div>
  );
}
