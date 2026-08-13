"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [showName, setShowName] = useState(false);

  const CHESS_MOVES = [
    "1. e4",
    "e5",
    "2. Nf3",
    "Nc6",
    "3. Bb5",
    "a6",
    "4. ♞",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const w = window.innerWidth;
    const h = window.innerHeight;
    const centerX = w / 2;
    const centerY = h / 2;

    // Gold dust particles
    interface Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      alpha: number;
      speed: number;
      converged: boolean;
    }

    const particles: Particle[] = [];
    const PARTICLE_COUNT = 120;

    // Knight silhouette target points (simplified polygon)
    const knightPoints = [
      [0, -40], [-10, -50], [-25, -45], [-30, -30], [-20, -20],
      [-25, -5], [-30, 10], [-25, 30], [-15, 40], [15, 40],
      [25, 30], [20, 10], [15, -5], [25, -15], [30, -30],
      [20, -45], [10, -50],
    ].map(([x, y]) => [centerX + x * 1.5, centerY + y * 1.5]);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const targetPoint = knightPoints[i % knightPoints.length];
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        targetX: targetPoint[0] + (Math.random() - 0.5) * 20,
        targetY: targetPoint[1] + (Math.random() - 0.5) * 20,
        size: Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
        converged: false,
      });
    }

    let frame = 0;
    const TOTAL_FRAMES = 150; // ~2.5s at 60fps
    const CONVERGE_FRAME = 60; // 1s to converge
    const HOLD_FRAME = 100; // Hold silhouette
    const DISPERSE_FRAME = 130; // Disperse

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Update progress
      setProgress(Math.min(frame / TOTAL_FRAMES, 1));

      // Phase logic
      const phase = frame < CONVERGE_FRAME ? "converge"
        : frame < HOLD_FRAME ? "hold"
        : frame < DISPERSE_FRAME ? "disperse"
        : "done";

      particles.forEach((p) => {
        if (phase === "converge") {
          p.x += (p.targetX - p.x) * (p.speed + frame * 0.0003);
          p.y += (p.targetY - p.y) * (p.speed + frame * 0.0003);
        } else if (phase === "disperse") {
          p.x += (Math.random() - 0.5) * 8;
          p.y += (Math.random() - 0.5) * 8;
          p.alpha *= 0.95;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${p.alpha})`;
        ctx.fill();

        // Draw connecting lines between nearby particles
        if (phase !== "disperse") {
          particles.forEach((p2) => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 40 && dist > 0) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(201, 162, 39, ${0.1 * (1 - dist / 40)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      if (frame >= HOLD_FRAME && !showName) {
        setShowName(true);
      }

      if (frame < TOTAL_FRAMES) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };

    // Start after a brief pause
    const timeout = setTimeout(() => requestAnimationFrame(animate), 200);
    return () => clearTimeout(timeout);
  }, [onComplete, showName]);

  const currentMove = Math.min(
    Math.floor(progress * CHESS_MOVES.length),
    CHESS_MOVES.length - 1
  );

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#050509] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Name reveal */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showName ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-[var(--color-gold)]"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          SHOURYA SHARAN
        </h1>
        <div className="mt-3 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
      </motion.div>

      {/* Chess notation progress */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3">
        <div
          className="text-xs tracking-[0.2em] text-[var(--color-gold)] opacity-60"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {CHESS_MOVES.slice(0, currentMove + 1).join(" ")}
        </div>
        <div className="w-48 h-px bg-[rgba(201,162,39,0.1)] relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[var(--color-gold)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
