"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Zap, ShieldAlert, Sparkles, Volume2 } from "lucide-react";

export type WallpaperTheme = "ironman" | "sonoma" | "nebula" | "flag";

interface LiveWallpaperProps {
  theme: WallpaperTheme;
  onSnapTriggered?: () => void;
}

export function LiveWallpaper({ theme = "ironman", onSnapTriggered }: LiveWallpaperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeStone, setActiveStone] = useState<string | null>(null);

  const DIALOGUES = [
    "And I... am... Iron Man.",
    "Part of the journey is the end.",
    "I love you 3000.",
    "Sometimes you gotta run before you can walk.",
  ];

  // Mouse move parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleSnap = () => {
    if (isSnapping) return;
    setIsSnapping(true);
    soundEngine.playIronManSnap();

    // Trigger speech whisper if available
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        const utterance = new SpeechSynthesisUtterance("And I... am... Iron Man.");
        utterance.rate = 0.85;
        utterance.pitch = 0.8;
        window.speechSynthesis.speak(utterance);
      } catch {
        // audio engine will play snap sound
      }
    }

    if (onSnapTriggered) onSnapTriggered();
    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);

    setTimeout(() => {
      setIsSnapping(false);
    }, 2400);
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

    // Particle system (Battlefield Embers / Cosmic Sparkle)
    const particleCount = 100;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: -0.8 - Math.random() * 1.6,
      size: 1.2 + Math.random() * 2.8,
      alpha: 0.2 + Math.random() * 0.7,
      color: Math.random() > 0.4 ? "#F59E0B" : Math.random() > 0.5 ? "#EF4444" : "#38BDF8",
    }));

    // Ash disintegration particles on Snap
    const ashParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      rot: number;
    }> = [];

    let shockwaveRadius = 0;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      if (theme === "ironman") {
        // Atmospheric battle vignette
        const grad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.45,
          100,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.85
        );
        grad.addColorStop(0, "rgba(0, 0, 0, 0)");
        grad.addColorStop(0.55, "rgba(10, 6, 8, 0.4)");
        grad.addColorStop(1, "rgba(5, 3, 5, 0.85)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Map gauntlet stones relative to screen proportions
        // Tony's Nano Gauntlet is located in upper-left quadrant of Tony
        const gx = width * 0.32;
        const gy = height * 0.36;

        // 6 Infinity Stones Coordinates
        const stones = [
          { name: "Power", color: "#C084FC", glow: "rgba(192, 132, 252, 0.9)", dx: -18, dy: -32, r: 7 },
          { name: "Space", color: "#38BDF8", glow: "rgba(56, 189, 248, 0.9)", dx: 8, dy: -28, r: 7 },
          { name: "Reality", color: "#EF4444", glow: "rgba(239, 68, 68, 0.9)", dx: 32, dy: -18, r: 6.5 },
          { name: "Soul", color: "#F97316", glow: "rgba(249, 115, 22, 0.9)", dx: 52, dy: 2, r: 6 },
          { name: "Time", color: "#22C55E", glow: "rgba(34, 197, 94, 0.9)", dx: -38, dy: -10, r: 7 },
          { name: "Mind", color: "#FACC15", glow: "rgba(250, 204, 21, 1.0)", dx: 8, dy: 15, r: 9 },
        ];

        const pulse = Math.sin(frame * 0.08);

        // Render Glowing Infinity Stones over Gauntlet
        stones.forEach((stone) => {
          const sx = gx + stone.dx;
          const sy = gy + stone.dy;
          const rad = stone.r + pulse * 1.5;

          // Corona
          const aura = ctx.createRadialGradient(sx, sy, 1, sx, sy, rad * 4.5);
          aura.addColorStop(0, stone.glow);
          aura.addColorStop(0.5, stone.color + "66");
          aura.addColorStop(1, "transparent");

          ctx.save();
          ctx.fillStyle = aura;
          ctx.beginPath();
          ctx.arc(sx, sy, rad * 4.5, 0, Math.PI * 2);
          ctx.fill();

          // White-hot core
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = stone.glow;
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.arc(sx, sy, rad * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Arc Reactor Pulsing Light at Center Chest (x: 51%, y: 53%)
        const rx = width * 0.505;
        const ry = height * 0.535;
        const rPulse = 18 + Math.sin(frame * 0.05) * 5;

        ctx.save();
        const rGrad = ctx.createRadialGradient(rx, ry, 2, rx, ry, rPulse * 3.5);
        rGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        rGrad.addColorStop(0.3, "rgba(56, 189, 248, 0.6)");
        rGrad.addColorStop(0.7, "rgba(14, 165, 233, 0.2)");
        rGrad.addColorStop(1, "transparent");
        ctx.fillStyle = rGrad;
        ctx.beginPath();
        ctx.arc(rx, ry, rPulse * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Electrical Gamma Arcs crawling along arm
        if (frame % 4 === 0 || isSnapping) {
          ctx.save();
          ctx.strokeStyle = isSnapping ? "rgba(255, 255, 255, 0.95)" : "rgba(192, 132, 252, 0.8)";
          ctx.lineWidth = isSnapping ? 3.5 : 1.8;
          ctx.shadowColor = "#38BDF8";
          ctx.shadowBlur = 16;

          const arcCount = isSnapping ? 8 : 3;
          for (let a = 0; a < arcCount; a++) {
            ctx.beginPath();
            let lx = gx + (Math.random() - 0.5) * 60;
            let ly = gy + (Math.random() - 0.5) * 60;
            ctx.moveTo(lx, ly);

            for (let step = 0; step < 4; step++) {
              lx += (Math.random() - 0.5) * 50;
              ly += (Math.random() - 0.5) * 50;
              ctx.lineTo(lx, ly);
            }
            ctx.stroke();
          }
          ctx.restore();
        }

        // SNAP EFFECT: Cosmic Gamma Flash, Expanding Shockwave & Ash Dissolution
        if (isSnapping) {
          shockwaveRadius += 30;

          // Blinding Flash
          ctx.save();
          ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
          ctx.fillRect(0, 0, width, height);

          // Golden Shockwave Ring
          ctx.strokeStyle = "rgba(250, 204, 21, 0.85)";
          ctx.lineWidth = 14;
          ctx.shadowColor = "#FFFFFF";
          ctx.shadowBlur = 30;
          ctx.beginPath();
          ctx.arc(gx, gy, shockwaveRadius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Spawn Thanos army ash dissolution particles
          if (ashParticles.length < 250) {
            for (let i = 0; i < 15; i++) {
              ashParticles.push({
                x: gx + (Math.random() - 0.5) * 300,
                y: gy + (Math.random() - 0.5) * 300,
                vx: (Math.random() - 0.2) * 5,
                vy: -Math.random() * 4 - 2,
                size: 2 + Math.random() * 4,
                alpha: 1.0,
                rot: Math.random() * Math.PI,
              });
            }
          }
        } else {
          shockwaveRadius = 0;
        }

        // Render Ash Particles
        for (let i = ashParticles.length - 1; i >= 0; i--) {
          const p = ashParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.015;

          if (p.alpha <= 0) {
            ashParticles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.fillStyle = Math.random() > 0.3 ? `rgba(40, 30, 30, ${p.alpha})` : `rgba(245, 158, 11, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else if (theme === "flag") {
        // Fluid Ripple Silk Wave Shader (Pensatori Irrazionali Inspired)
        const cols = 40;
        const rows = 24;
        const dx = width / cols;
        const dy = height / rows;
        const t = frame * 0.035;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x0 = i * dx;
            const y0 = j * dy;
            const wave =
              Math.sin(i * 0.2 + t * 2) * 16 +
              Math.cos(j * 0.25 + t * 1.5) * 12;
            const lightness = 14 + Math.sin(i * 0.2 + t * 2) * 12;
            ctx.fillStyle = `hsl(${0 + wave * 1.5}, 70%, ${lightness}%)`;
            ctx.fillRect(x0, y0 + wave, dx + 0.5, dy + 0.5);
          }
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

      // Floating Embers
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

      if (!document.hidden) {
        animId = requestAnimationFrame(render);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, [theme, isSnapping]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto bg-[#070508]"
    >
      {/* Authentic Original Movie Still from Avengers Endgame */}
      {theme === "ironman" && (
        <div
          style={{
            transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0) scale(1.04)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0.8, 0.4, 1)",
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/wallpapers/ironman_snap.jpg"
            alt="Tony Stark Iron Man I am Iron Man Snap"
            fill
            priority
            className="object-cover object-center filter brightness-[0.88] contrast-[1.08]"
          />
        </div>
      )}

      {/* Dynamic Canvas Particles, Lightning & Cosmic Energy Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Cinematic Dialogue & Stark HUD (Top-Left) */}
      {theme === "ironman" && (
        <div className="absolute top-12 left-6 sm:left-10 z-10 pointer-events-auto flex flex-col gap-2.5 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-red-400 uppercase font-semibold">
              MARK 85 // NANO GAUNTLET ACTIVE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-sans font-light tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
            "{DIALOGUES[dialogueIndex]}"
          </h2>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleSnap}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:brightness-125 text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all active:scale-95 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>SNAP INFINITY GAUNTLET</span>
            </button>
            <span className="text-[11px] font-mono text-zinc-400">
              Click to execute snap
            </span>
          </div>
        </div>
      )}

      {/* Clickable Gauntlet Hotspot */}
      {theme === "ironman" && (
        <button
          onClick={handleSnap}
          style={{
            top: "28%",
            left: "27%",
            width: "12%",
            height: "18%",
          }}
          className="absolute z-10 cursor-pointer rounded-full opacity-0 hover:opacity-10 transition-opacity bg-amber-400/20"
          title="Click Nano Gauntlet to Snap"
          aria-label="Click Nano Gauntlet to Snap"
        />
      )}
    </div>
  );
}
