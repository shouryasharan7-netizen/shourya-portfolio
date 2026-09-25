"use client";

import React, { useEffect, useRef, useState } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Waves, Sparkles, X } from "lucide-react";

interface RippleFlagCanvasProps {
  onClose?: () => void;
  isWindow?: boolean;
}

export function RippleFlagCanvas({ onClose, isWindow = false }: RippleFlagCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flagText, setFlagText] = useState("I DON'T THINK IN DISCIPLINES. I THINK IN PROBLEMS.");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    // Mouse velocity & ripple tracking
    let mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0, prevX: width / 2, prevY: height / 2 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      mouse.vx = nx - mouse.prevX;
      mouse.vy = ny - mouse.prevY;
      mouse.x = nx;
      mouse.y = ny;
      mouse.prevX = nx;
      mouse.prevY = ny;
    };
    canvas.addEventListener("mousemove", onMouseMove);

    let t = 0;
    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, width, height);

      // Deep dark silk background
      ctx.fillStyle = "#09090D";
      ctx.fillRect(0, 0, width, height);

      // Draw Flag Grid Mesh with Wave Displacement (pensatori-irrazionali inspired)
      const cols = 45;
      const rows = 28;
      const dx = width / cols;
      const dy = height / rows;

      ctx.save();

      // Fluid Wave Calculation
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x0 = i * dx;
          const y0 = j * dy;

          // Multi-harmonic sine waves + mouse distance ripple
          const distToMouse = Math.hypot(x0 - mouse.x, y0 - mouse.y);
          const mouseWave = Math.sin(distToMouse * 0.06 - t * 3) * Math.max(0, 25 - distToMouse * 0.08);

          const wave =
            Math.sin(i * 0.25 + t * 2) * 14 +
            Math.cos(j * 0.3 + t * 1.5) * 8 +
            mouseWave;

          // Shade based on wave height
          const lightness = 20 + Math.sin(i * 0.25 + t * 2) * 16 + (mouseWave / 25) * 20;
          ctx.fillStyle = `hsl(${0 + wave * 2}, ${75 + wave}%, ${lightness}%)`;

          ctx.fillRect(x0, y0 + wave, dx + 0.5, dy + 0.5);
        }
      }

      ctx.restore();

      // Center Typography Engraved into the Flag
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 22px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.9)";
      ctx.shadowBlur = 12;

      // Deform text to match center wave
      const centerWave = Math.sin(cols * 0.12 + t * 2) * 14;
      ctx.fillText(flagText, width / 2, height / 2 + centerWave);

      ctx.font = "12px monospace";
      ctx.fillStyle = "#F59E0B";
      ctx.fillText("SHOURYA SHARAN // COMPUTATIONAL ARCHITECTURE", width / 2, height / 2 + centerWave + 32);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [flagText]);

  return (
    <div className="flex flex-col h-full w-full bg-[#09090D] text-white rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-white/10">
      {/* Title Bar */}
      {/* Fluid Shader Sub-strip */}
      <div className="h-8 bg-[#121218] border-b border-white/5 flex items-center justify-between px-3 select-none flex-shrink-0">
        <span className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
          <Waves className="w-3.5 h-3.5 text-red-500" />
          <span>Pensatori Irrazionali Engine • Silk Mesh Displacement</span>
        </span>
        <span className="text-[10px] font-mono text-zinc-400">Drag cursor to wave fabric</span>
      </div>

      {/* Canvas Viewport */}
      <div className="flex-1 relative overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      </div>
    </div>
  );
}
