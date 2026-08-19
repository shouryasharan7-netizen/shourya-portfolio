"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CyberCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("magnetic") ||
        target.closest(".magnetic")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        body { cursor: none; }
        a, button, [role="button"], input, select, textarea { cursor: none; }
      `}} />
      
      {/* Outer crosshair (slower trailing) */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[var(--color-gold)] rounded-full pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "var(--color-gold-glow)" : "var(--color-gold)",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      >
        <div className="absolute top-[-5px] left-1/2 w-[1px] h-2 bg-[var(--color-gold)] -translate-x-1/2" />
        <div className="absolute bottom-[-5px] left-1/2 w-[1px] h-2 bg-[var(--color-gold)] -translate-x-1/2" />
        <div className="absolute top-1/2 left-[-5px] w-2 h-[1px] bg-[var(--color-gold)] -translate-y-1/2" />
        <div className="absolute top-1/2 right-[-5px] w-2 h-[1px] bg-[var(--color-gold)] -translate-y-1/2" />
      </motion.div>

      {/* Inner dot (fast tracking) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--color-ivory)] rounded-full pointer-events-none z-[10000] mix-blend-screen shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 28,
        }}
      />
    </>
  );
}
