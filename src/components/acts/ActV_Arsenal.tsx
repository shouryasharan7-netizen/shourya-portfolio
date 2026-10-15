"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILL_NODES, CERTIFICATIONS } from "@/data/portfolioData";

// Force-directed node graph on canvas
function SkillGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.parentElement?.clientWidth || 600;
    const H = 420;
    canvas.width = W;
    canvas.height = H;

    // Node positions (force-directed simulation)
    type Node = {
      id: string;
      label: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      accent: string;
      level: number;
      connections: string[];
      hovered: boolean;
    };

    const nodes: Node[] = SKILL_NODES.map((s) => ({
      ...s,
      x: W / 2 + (Math.random() - 0.5) * W * 0.6,
      y: H / 2 + (Math.random() - 0.5) * H * 0.6,
      vx: 0,
      vy: 0,
      r: 6 + s.level * 1.6,
      hovered: false,
    }));

    let mouseX = -999;
    let mouseY = -999;
    let raf: number;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouse);

    const getNode = (id: string) => nodes.find((n) => n.id === id);

    const simulate = () => {
      // Repulsion between all nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 1800 / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          nodes[i].vx += fx; nodes[i].vy += fy;
          nodes[j].vx -= fx; nodes[j].vy -= fy;
        }
      }

      // Attraction along edges
      nodes.forEach((node) => {
        node.connections.forEach((cId) => {
          const target = getNode(cId);
          if (!target) return;
          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const ideal = 120;
          const force = (dist - ideal) * 0.015;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        });
      });

      // Center gravity
      nodes.forEach((node) => {
        node.vx += (W / 2 - node.x) * 0.006;
        node.vy += (H / 2 - node.y) * 0.006;
        // Damping
        node.vx *= 0.82;
        node.vy *= 0.82;
        node.x += node.vx;
        node.y += node.vy;
        // Bounds
        node.x = Math.max(node.r + 10, Math.min(W - node.r - 10, node.x));
        node.y = Math.max(node.r + 10, Math.min(H - node.r - 10, node.y));
        // Hover check
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        node.hovered = Math.sqrt(dx * dx + dy * dy) < node.r + 8;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw edges
      nodes.forEach((node) => {
        node.connections.forEach((cId) => {
          const target = getNode(cId);
          if (!target) return;
          const active = node.hovered || target.hovered;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = active
            ? `${node.accent}60`
            : "rgba(255,255,255,0.05)";
          ctx.lineWidth = active ? 1.5 : 0.8;
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        // Outer glow
        if (node.hovered) {
          const glow = ctx.createRadialGradient(node.x, node.y, node.r, node.x, node.y, node.r * 3);
          glow.addColorStop(0, `${node.accent}30`);
          glow.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.hovered ? node.r + 3 : node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.hovered ? node.accent : `${node.accent}40`;
        ctx.fill();
        ctx.strokeStyle = node.accent;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        ctx.font = `${node.hovered ? "bold " : ""}${node.hovered ? 12 : 10}px JetBrains Mono, monospace`;
        ctx.fillStyle = node.hovered ? "#ffffff" : "rgba(255,255,255,0.55)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + node.r + 15);
      });

      simulate();
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full rounded-2xl border border-white/[0.04]"
      style={{ background: "rgba(8,8,14,0.6)", height: 420 }}
    />
  );
}

export default function ActVArsenal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 px-6"
      style={{ background: "linear-gradient(180deg, #050508 0%, #060710 60%, #050508 100%)" }}
    >
      <div className="act-divider mb-20" />
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-3">ACT V · THE NEURAL ARSENAL</div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-tight">
            <span className="text-white">Skills &</span>{" "}
            <span className="text-gradient-cyber">Credentials</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-lg mx-auto text-sm">
            An interactive force-directed constellation — hover nodes to illuminate connections across the tech stack.
          </p>
        </motion.div>

        {/* Node graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-16"
        >
          <SkillGraph />
          <p className="text-center text-[10px] font-mono-custom text-zinc-700 mt-3 tracking-widest">
            HOVER NODES TO ILLUMINATE CONNECTIONS
          </p>
        </motion.div>

        {/* Certification badge ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="section-label text-center mb-6">CERTIFICATIONS & ACHIEVEMENTS</div>
          <div className="relative overflow-hidden">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #050508, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #050508, transparent)" }} />

            <div className="ticker-track py-2">
              {[...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-3 px-5 py-2.5 mx-2 rounded-full border text-xs font-mono-custom"
                  style={{
                    borderColor: `${cert.accent}30`,
                    color: cert.accent,
                    background: `${cert.accent}08`,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: cert.accent, boxShadow: `0 0 6px ${cert.accent}` }}
                  />
                  {cert.label}
                  <span className="text-zinc-700">· {cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="act-divider mt-20" />
    </section>
  );
}
