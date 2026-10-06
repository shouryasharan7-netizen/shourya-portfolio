"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Wrench,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Github,
  Mail,
  Layers,
  Cpu,
  Clock,
  ShieldCheck,
  ExternalLink,
  Laptop,
  Terminal,
  Activity,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function UnderConstructionPage() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentUtc, setCurrentUtc] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live clocks for IST (Nagpur, India) and UTC
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setCurrentUtc(
        now.toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle interactive particle constellation background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.5 + 0.25,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha * 0.7})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Mouse interaction line
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 * (1 - mdist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const milestones = [
    {
      id: "engine",
      title: "Workstation Architecture",
      subtitle: "Next.js 15 & React 19 Core",
      status: "Verified",
      progress: "92%",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
      icon: Cpu,
    },
    {
      id: "graphics",
      title: "Interactive 3D Physics",
      subtitle: "Three.js Shaders & Audio Rig",
      status: "Optimizing",
      progress: "85%",
      color: "border-sky-500/30 text-sky-400 bg-sky-500/10",
      icon: Layers,
    },
    {
      id: "research",
      title: "Research & Archive Hub",
      subtitle: "The Walnut Initiative & STEMinate",
      status: "Compiling",
      progress: "90%",
      color: "border-amber-500/30 text-amber-400 bg-amber-500/10",
      icon: ShieldCheck,
    },
  ];

  return (
    <main
      className="relative min-h-screen w-full bg-[#070709] text-[#F4F4F6] flex flex-col justify-between selection:bg-white selection:text-black overflow-hidden font-sans"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
    >
      {/* Background canvas for constellation particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
      />

      {/* Ambient Lighting Gradients */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full blur-[140px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(212, 175, 55, 0.15) 60%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-20 w-[500px] h-[450px] rounded-full blur-[130px] opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-20 w-[550px] h-[500px] rounded-full blur-[140px] opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* Refined Fine Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top Header / Status Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-6 md:pt-8 flex items-center justify-between">
        {/* Monogram / Domain Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-inner text-amber-300 font-mono font-bold text-sm tracking-wider">
            SS
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Personal Domain
            </span>
            <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
              shouryasharan.xyz
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/15 border border-amber-500/30 text-amber-300">
                Live Edge
              </span>
            </span>
          </div>
        </div>

        {/* Action Links & Clocks */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Live Node Clock (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>IST: {currentTime || "Loading..."}</span>
            <span className="text-zinc-600">|</span>
            <span>UTC: {currentUtc || "Loading..."}</span>
          </div>

          {/* GitHub Link */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.2] text-xs font-medium text-zinc-300 hover:text-white transition-all duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Dev Mode Sneak Peek Button */}
          <Link
            href="/workstation"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-500/40 text-xs font-medium text-amber-300 hover:text-amber-200 transition-all duration-200 group"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview Workstation</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </header>

      {/* Main Center Stage */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-16 my-auto flex flex-col items-center text-center">
        {/* Pulsing Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl mb-8 shadow-glass animate-fadeIn">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <span className="text-xs font-mono font-medium tracking-wide text-zinc-300">
            WEBSITE UNDER CONSTRUCTION · WILL BE BACK SOON
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] max-w-3xl">
          Under Construction.
          <span className="block mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
            Rebuilding something exceptional.
          </span>
        </h1>

        {/* Subtitle Message */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          <strong className="text-zinc-200 font-medium">shouryasharan.xyz</strong> is
          currently undergoing an architectural rebuild. We are polishing an
          interactive digital workstation, updated research publications, and 3D
          computational showcases. We will be back online shortly.
        </p>

        {/* Progress & Telemetry Cockpit */}
        <div className="w-full max-w-2xl bg-[#0E0E14]/70 border border-white/[0.08] backdrop-blur-2xl rounded-2xl p-6 md:p-8 shadow-2xl text-left mb-10 transition-all hover:border-white/[0.14]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                System Rebuild Telemetry
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 font-semibold">
                88% Complete
              </span>
            </div>
          </div>

          {/* Animated Glowing Progress Bar */}
          <div className="w-full h-2 rounded-full bg-white/[0.05] overflow-hidden p-0.5 border border-white/[0.06] mb-6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-amber-300 transition-all duration-1000 relative overflow-hidden"
              style={{ width: "88%" }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          {/* Milestone Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {milestones.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-zinc-400" />
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${item.color}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-zinc-200">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Row: Contact & Copy Email */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium text-sm transition-all shadow-lg active:scale-95"
            aria-label="Copy Email Address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">
                  Email Copied to Clipboard!
                </span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Direct Email ({PERSONAL_INFO.email})</span>
              </>
            )}
          </button>

          {/* Mailto Direct */}
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry%20from%20shouryasharan.xyz`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/[0.2] text-sm font-medium text-white transition-all active:scale-95"
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Send Direct Message</span>
          </a>

          {/* Workstation Deep Link */}
          <Link
            href="/workstation"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-medium text-zinc-300 hover:text-white transition-all"
          >
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>Access Workstation (Internal Dev)</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </div>
      </section>

      {/* Footer Telemetry & Copyright */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-6 md:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 border-t border-white/[0.04] pt-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Vercel Global Edge (BOM)
          </span>
          <span className="text-zinc-600">·</span>
          <span>SSL 256-bit Encrypted</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <span>{PERSONAL_INFO.location}</span>
          <span className="text-zinc-600">·</span>
          <span>© 2026 {PERSONAL_INFO.name}. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
