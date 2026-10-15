"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "[INITIALIZING CHRONO-CORE...]",
  "[LOADING SANSKRIT SYNTAX & NEURAL WEIGHTS...]",
  "[DECRYPTING THREAT VECTORS...]",
  "[CALIBRATING ASTROLABE NODE GRAPH...]",
  "[QUANTUM HANDSHAKE COMPLETE ✓]",
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function NeuralPreloader({ onComplete }: PreloaderProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated mandala on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 300;
    canvas.height = 300;

    let angle = 0;
    let scale = 0.1;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, 300, 300);
      ctx.save();
      ctx.translate(150, 150);

      // Draw golden mandala rings
      for (let ring = 0; ring < 5; ring++) {
        const r = (ring + 1) * 22 * scale;
        const segments = 8 + ring * 4;
        ctx.beginPath();
        for (let i = 0; i < segments; i++) {
          const a = (i / segments) * Math.PI * 2 + angle * (ring % 2 === 0 ? 1 : -1) * 0.8;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${ring < 2 ? "245,158,11" : "0,245,212"}, ${0.7 - ring * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center node
      ctx.beginPath();
      ctx.arc(0, 0, 6 * scale, 0, Math.PI * 2);
      ctx.fillStyle = "#F59E0B";
      ctx.fill();

      ctx.restore();

      angle += 0.03;
      scale = Math.min(scale + 0.015, 1);
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Boot lines sequencer
  useEffect(() => {
    let i = 0;
    const addLine = () => {
      if (i < BOOT_LINES.length) {
        setLines((l) => [...l, BOOT_LINES[i]]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        i++;
        setTimeout(addLine, 400 + Math.random() * 200);
      } else {
        setTimeout(() => setDone(true), 600);
        setTimeout(onComplete, 1200);
      }
    };
    setTimeout(addLine, 300);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Mandala canvas */}
          <div className="preloader-mandala">
            <canvas
              ref={canvasRef}
              className="opacity-20"
              style={{ width: 300, height: 300 }}
            />
          </div>

          {/* Boot lines */}
          <div className="relative z-10 flex flex-col items-center gap-2 max-w-md w-full px-8">
            <div className="w-full space-y-2 mb-6">
              {lines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="preloader-line"
                  style={{ opacity: 1 }}
                >
                  <span className="text-emerald-400">{">"}</span>{" "}
                  <span className="text-cyan-300">{line}</span>
                </motion.div>
              ))}
              {lines.length > 0 && lines.length < BOOT_LINES.length && (
                <div className="preloader-line" style={{ opacity: 1 }}>
                  <span className="terminal-cursor" />
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full h-px bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-violet-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="text-xs font-mono text-zinc-500 mt-1">{progress}% INITIALIZED</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
