"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal, Typewriter, AnimatedCounter } from "@/components/ui/TextReveal";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  // Particle grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let animId: number;
    const mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    // Grid particles
    interface GridParticle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
      vx: number;
      vy: number;
    }

    const particles: GridParticle[] = [];
    const GRID_SIZE = 80;

    for (let x = 0; x < w(); x += GRID_SIZE) {
      for (let y = 0; y < h(); y += GRID_SIZE) {
        particles.push({
          x: x + GRID_SIZE / 2,
          y: y + GRID_SIZE / 2,
          baseX: x + GRID_SIZE / 2,
          baseY: y + GRID_SIZE / 2,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.3 + 0.1,
          vx: 0,
          vy: 0,
        });
      }
    }

    // Floating chess-like shapes
    const shapes = [
      { x: w() * 0.2, y: h() * 0.3, size: 30, rotation: 0, speed: 0.003, type: "diamond" },
      { x: w() * 0.75, y: h() * 0.25, size: 25, rotation: 45, speed: 0.005, type: "cross" },
      { x: w() * 0.85, y: h() * 0.7, size: 20, rotation: 0, speed: 0.004, type: "diamond" },
    ];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w(), h());

      // Draw grid lines
      ctx.strokeStyle = "rgba(201, 162, 39, 0.04)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w(); x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h());
        ctx.stroke();
      }
      for (let y = 0; y < h(); y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w(), y);
        ctx.stroke();
      }

      // Animate particles
      particles.forEach((p) => {
        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 0.5;
          p.vy -= (dy / dist) * force * 0.5;
        }

        // Spring back to base
        p.vx += (p.baseX - p.x) * 0.02;
        p.vy += (p.baseY - p.y) * 0.02;
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        // Pulse alpha
        const pulse = Math.sin(Date.now() * 0.001 + p.baseX * 0.01) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${p.alpha + pulse})`;
        ctx.fill();

        // Connect nearby particles
        particles.forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < GRID_SIZE * 1.2 && d > 0) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(201, 162, 39, ${0.06 * (1 - d / (GRID_SIZE * 1.2))})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw floating shapes
      shapes.forEach((s) => {
        s.rotation += s.speed;
        const floatY = Math.sin(Date.now() * 0.001 * s.speed * 200) * 15;

        ctx.save();
        ctx.translate(s.x, s.y + floatY);
        ctx.rotate(s.rotation);
        ctx.strokeStyle = "rgba(201, 162, 39, 0.15)";
        ctx.lineWidth = 1;

        if (s.type === "diamond") {
          ctx.beginPath();
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size, 0);
          ctx.lineTo(0, s.size);
          ctx.lineTo(-s.size, 0);
          ctx.closePath();
          ctx.stroke();
        } else {
          // Cross
          ctx.beginPath();
          ctx.moveTo(-s.size, 0);
          ctx.lineTo(s.size, 0);
          ctx.moveTo(0, -s.size);
          ctx.lineTo(0, s.size);
          ctx.stroke();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity: heroOpacity, scale: heroScale }}
    >
      {/* Canvas BG */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Vignette */}
      <div className="vignette" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        {/* Small pre-title */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Anno Domini MMXXVI
          </span>
        </motion.div>

        {/* THE GRAND TACTICIAN -> THE SYNAPTIC ARCHITECT */}
        <h1
          className="text-[clamp(2rem,7vw,6rem)] font-bold tracking-[0.08em] leading-[1.1] mb-6 whitespace-nowrap"
          style={{
            fontFamily: "var(--font-cinzel)",
            color: "var(--color-ivory)",
            textShadow: "0 0 80px rgba(0, 240, 255, 0.4)",
          }}
        >
          <TextReveal text="THE SYNAPTIC" delay={0.2} stagger={0.06} />
          <br />
          <TextReveal text="ARCHITECT" delay={0.5} stagger={0.05} />
        </h1>

        {/* Subtitle typewriter */}
        <div className="mb-8 mt-4">
          <Typewriter
            text="I don't predict the future. I engineer the matrix it runs on."
            className="text-sm md:text-base tracking-[0.15em] text-[var(--color-gold)] font-bold"
            delay={1.5}
            speed={35}
          />
        </div>

        {/* Location + Available */}
        <motion.div
          className="flex items-center justify-center gap-6 text-xs text-[var(--color-muted)] tracking-[0.1em] mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <span>Node: Nagpur, India</span>
          <span className="flex items-center gap-1.5 px-2 py-1 border border-[var(--color-gold)] rounded-sm bg-black/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
            <span className="text-[var(--color-gold)] font-mono">SYSTEM READY</span>
          </span>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-[var(--color-rule)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
        >
          {[
            { value: 2300, suffix: "+", label: "Nodes Connected" },
            { value: 97, suffix: "%", label: "Computational Precision" },
            { value: 50, suffix: "+", label: "Systems Architected" },
            { value: 7, suffix: "", label: "Parallel Threads" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div
                className="text-3xl md:text-4xl font-bold text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-mono)",
                }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-muted)] mt-1 group-hover:text-[var(--color-ivory)] transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <span
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--color-gold)] opacity-50"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          1. e4 →
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--color-gold)] to-transparent opacity-30 animate-pulse" />
      </motion.div>
    </motion.section>
  );
}
