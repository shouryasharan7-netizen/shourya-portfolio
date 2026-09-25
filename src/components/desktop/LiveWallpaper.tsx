"use client";

import React, { useEffect, useRef, useState } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Sparkles, Zap, ShieldAlert } from "lucide-react";

export type WallpaperTheme = "ironman" | "sonoma" | "nebula";

interface LiveWallpaperProps {
  theme: WallpaperTheme;
  onSnapTriggered?: () => void;
}

export function LiveWallpaper({ theme = "ironman", onSnapTriggered }: LiveWallpaperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const DIALOGUES = [
    "And I... am... Iron Man.",
    "Part of the journey is the end.",
    "I love you 3000.",
    "Sometimes you gotta run before you can walk.",
  ];

  const handleSnap = () => {
    setIsSnapping(true);
    soundEngine.playIronManSnap();
    if (onSnapTriggered) onSnapTriggered();

    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);

    setTimeout(() => {
      setIsSnapping(false);
    }, 1800);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Particles (Embers & Cosmic Stardust)
    const particleCount = 120;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.8 - Math.random() * 1.5,
      size: 1 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.8,
      color: Math.random() > 0.4 ? "#F59E0B" : Math.random() > 0.5 ? "#EF4444" : "#38BDF8",
    }));

    // Lightning arcs state
    let lightningCounter = 0;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      if (theme === "ironman") {
        // Deep cinematic dark atmosphere with ambient red & gold vignette
        const grad = ctx.createRadialGradient(
          width * 0.65,
          height * 0.45,
          50,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.8
        );
        grad.addColorStop(0, "rgba(80, 15, 15, 0.45)");
        grad.addColorStop(0.35, "rgba(35, 10, 15, 0.7)");
        grad.addColorStop(0.7, "rgba(10, 8, 12, 0.95)");
        grad.addColorStop(1, "#050406");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Subtly rendered silhouette of the Nano Gauntlet with glowing Infinity Stones
        const cx = width * 0.68;
        const cy = height * 0.48;

        // Arm & Hand Armor Silhouette
        ctx.save();
        ctx.shadowColor = "rgba(220, 38, 38, 0.5)";
        ctx.shadowBlur = 40;

        // Forearm Plate
        ctx.fillStyle = "#180A0C";
        ctx.beginPath();
        ctx.moveTo(cx + 120, height);
        ctx.lineTo(cx + 60, cy + 180);
        ctx.lineTo(cx - 50, cy + 190);
        ctx.lineTo(cx - 70, height);
        ctx.closePath();
        ctx.fill();

        // Crimson & Gold Armor Accents
        ctx.strokeStyle = "rgba(217, 119, 6, 0.6)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx + 40, cy + 175);
        ctx.lineTo(cx + 20, cy + 120);
        ctx.stroke();

        // Palm & Knuckles
        ctx.fillStyle = "#220D10";
        ctx.beginPath();
        ctx.ellipse(cx, cy + 80, 65, 80, -0.15, 0, Math.PI * 2);
        ctx.fill();

        // Fingers posed in the iconic Snap Pinch
        // Thumb meeting Middle Finger in tension
        ctx.strokeStyle = "#381518";
        ctx.lineWidth = 18;
        ctx.lineCap = "round";

        // Thumb
        ctx.beginPath();
        ctx.moveTo(cx - 30, cy + 70);
        ctx.quadraticCurveTo(cx - 45, cy + 15, cx - 15, cy - 10);
        ctx.stroke();

        // Index finger extended slightly
        ctx.beginPath();
        ctx.moveTo(cx - 10, cy + 30);
        ctx.lineTo(cx - 5, cy - 40);
        ctx.stroke();

        // Middle Finger curved to meet thumb tip (the snap contact point)
        ctx.beginPath();
        ctx.moveTo(cx + 15, cy + 35);
        ctx.quadraticCurveTo(cx + 5, cy + 10, cx - 12, cy - 10);
        ctx.stroke();

        // Ring & Pinky curled into palm
        ctx.beginPath();
        ctx.moveTo(cx + 35, cy + 50);
        ctx.quadraticCurveTo(cx + 50, cy + 65, cx + 30, cy + 85);
        ctx.stroke();

        ctx.restore();

        // THE 6 INFINITY STONES (Grounded & Pulsing)
        // 1. Power (Purple) - Index knuckle
        // 2. Space (Blue) - Middle knuckle
        // 3. Reality (Red) - Ring knuckle
        // 4. Soul (Orange) - Pinky knuckle
        // 5. Time (Green) - Thumb side
        // 6. Mind (Yellow) - Back of hand central core
        const stones = [
          { x: cx - 18, y: cy + 32, r: 6, col: "#A855F7", glow: "rgba(168, 85, 247, 0.9)", name: "Power" },
          { x: cx + 10, y: cy + 35, r: 6.5, col: "#38BDF8", glow: "rgba(56, 189, 248, 0.9)", name: "Space" },
          { x: cx + 35, y: cy + 45, r: 5.5, col: "#EF4444", glow: "rgba(239, 68, 68, 0.9)", name: "Reality" },
          { x: cx + 55, y: cy + 65, r: 5, col: "#F97316", glow: "rgba(249, 115, 22, 0.9)", name: "Soul" },
          { x: cx - 42, y: cy + 45, r: 6, col: "#22C55E", glow: "rgba(34, 197, 94, 0.9)", name: "Time" },
          { x: cx + 5, y: cy + 85, r: 8.5, col: "#EAB308", glow: "rgba(234, 179, 8, 1.0)", name: "Mind" },
        ];

        const pulse = Math.sin(frame * 0.06);

        stones.forEach((stone) => {
          ctx.save();
          const currentRadius = stone.r + pulse * 1.2;

          // Outer energy aura
          const radial = ctx.createRadialGradient(stone.x, stone.y, 1, stone.x, stone.y, currentRadius * 5);
          radial.addColorStop(0, stone.glow);
          radial.addColorStop(0.4, stone.col + "66");
          radial.addColorStop(1, "transparent");

          ctx.fillStyle = radial;
          ctx.beginPath();
          ctx.arc(stone.x, stone.y, currentRadius * 5, 0, Math.PI * 2);
          ctx.fill();

          // Solid crystal core
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = stone.glow;
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(stone.x, stone.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Electrical Arcs crackling between stones and fingers
        lightningCounter++;
        if (lightningCounter % 4 === 0 || isSnapping) {
          ctx.save();
          ctx.strokeStyle = isSnapping ? "rgba(255, 255, 255, 0.95)" : "rgba(168, 85, 247, 0.75)";
          ctx.lineWidth = isSnapping ? 3 : 1.5;
          ctx.shadowColor = "#38BDF8";
          ctx.shadowBlur = 15;

          const arcCount = isSnapping ? 6 : 2;
          for (let a = 0; a < arcCount; a++) {
            ctx.beginPath();
            let lx = stones[Math.floor(Math.random() * stones.length)].x;
            let ly = stones[Math.floor(Math.random() * stones.length)].y;
            ctx.moveTo(lx, ly);

            for (let step = 0; step < 4; step++) {
              lx += (Math.random() - 0.5) * 45;
              ly += (Math.random() - 0.5) * 45;
              ctx.lineTo(lx, ly);
            }
            ctx.stroke();
          }
          ctx.restore();
        }

        // Snap Burst Flash Overlay
        if (isSnapping) {
          ctx.save();
          ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
          ctx.fillRect(0, 0, width, height);

          const snapGlow = ctx.createRadialGradient(cx - 15, cy - 10, 10, cx - 15, cy - 10, 450);
          snapGlow.addColorStop(0, "rgba(255, 255, 255, 1)");
          snapGlow.addColorStop(0.3, "rgba(245, 158, 11, 0.8)");
          snapGlow.addColorStop(0.6, "rgba(168, 85, 247, 0.5)");
          snapGlow.addColorStop(1, "transparent");

          ctx.fillStyle = snapGlow;
          ctx.beginPath();
          ctx.arc(cx - 15, cy - 10, 450, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (theme === "sonoma") {
        // macOS Sonoma Horizon Gradient
        const sGrad = ctx.createLinearGradient(0, 0, width, height);
        sGrad.addColorStop(0, "#081026");
        sGrad.addColorStop(0.4, "#1E1B4B");
        sGrad.addColorStop(0.7, "#831843");
        sGrad.addColorStop(1, "#F97316");
        ctx.fillStyle = sGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Deep Cosmic Nebula
        const nGrad = ctx.createRadialGradient(width * 0.5, height * 0.5, 10, width * 0.5, height * 0.5, width * 0.8);
        nGrad.addColorStop(0, "#1E112A");
        nGrad.addColorStop(0.5, "#0A0B14");
        nGrad.addColorStop(1, "#020204");
        ctx.fillStyle = nGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Render Floating Embers & Particle Drift
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [theme, isSnapping]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto">
      {/* Interactive WebGL/Canvas Live Wallpaper */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Cinematic Dialogue Watermark & Interactive Snap Trigger (Bottom-Right / Centered) */}
      {theme === "ironman" && (
        <div className="absolute top-16 left-8 sm:left-12 z-10 pointer-events-auto flex flex-col gap-3 max-w-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase font-semibold">
              MARK 85 // NANO GAUNTLET ONLINE
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-sans font-light tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            "{DIALOGUES[dialogueIndex]}"
          </h2>

          <p className="text-xs text-zinc-400 font-mono flex items-center gap-2">
            <span>6 Infinity Stones synchronized.</span>
            <button
              onClick={handleSnap}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/80 hover:bg-red-500 text-white font-mono text-[11px] shadow-lg shadow-red-900/50 transition-transform active:scale-95 cursor-pointer"
            >
              <Zap className="w-3 h-3 text-amber-300" />
              <span>SNAP NOW</span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
