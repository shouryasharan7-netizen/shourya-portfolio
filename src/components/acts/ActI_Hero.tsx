"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ParticleField from "@/components/ui/ParticleField";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowDown, MapPin } from "lucide-react";

const HEADLINE_CHARS = "SHOURYA SHARAN".split("");
const DECODE_CHARS = "अशβ01∇⟩ΨΩ∑Δ神字命☯".split("");

export default function ActIHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [decoded, setDecoded] = useState(false);
  const [displayChars, setDisplayChars] = useState(
    HEADLINE_CHARS.map(() => DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)])
  );

  useEffect(() => {
    let frame = 0;
    const totalFrames = 50;
    const interval = setInterval(() => {
      frame++;
      setDisplayChars(
        HEADLINE_CHARS.map((char, i) => {
          const revealAt = Math.floor((i / HEADLINE_CHARS.length) * totalFrames * 0.8);
          if (frame > revealAt) return char;
          return char === " " ? " " : DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
        })
      );
      if (frame >= totalFrames) {
        clearInterval(interval);
        setDecoded(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particle sphere background */}
      <ParticleField />

      {/* Radial gradient focal point */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,245,212,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <MapPin size={12} className="text-cyan-400" />
          <span className="section-label text-[10px]">
            {PERSONAL_INFO.coordinates} — NAGPUR, INDIA
          </span>
        </motion.div>

        {/* Kinetic Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-black tracking-[-0.02em] leading-none mb-6"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
        >
          {displayChars.map((char, i) => (
            <span
              key={i}
              className={char === " " ? "inline-block w-[0.35em]" : "inline-block"}
              style={{
                color: decoded
                  ? i < 7
                    ? "#F0F0F0"
                    : "#F0F0F0"
                  : "#00F5D4",
                transition: "color 0.3s",
                textShadow: decoded ? "none" : "0 0 20px rgba(0,245,212,0.6)",
                fontFamily: "var(--font-display)",
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Title bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="h-px w-48 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="text-sm sm:text-base md:text-lg font-mono-custom text-zinc-400 max-w-2xl leading-relaxed tracking-wide"
        >
          <span className="text-gradient-gold font-semibold">ARCHITECTING</span> AT THE INTERSECTION OF{" "}
          <span className="text-amber-300">CULTURAL HERITAGE,</span>{" "}
          <span className="text-gradient-cyber font-semibold">NEURAL INTELLIGENCE</span>{" "}
          &amp; <span className="text-emerald-400">CYBER DEFENSE.</span>
        </motion.p>

        {/* Role Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {["AI Researcher", "Full-Stack Architect", "Cybersecurity Leader", "Heritage-Tech Innovator"].map((role) => (
            <span
              key={role}
              className="px-3 py-1 rounded-full text-xs font-mono-custom tracking-wider border border-white/10 text-zinc-400 bg-white/[0.03] hover:border-cyan-400/30 hover:text-cyan-300 transition-all duration-300"
              data-cursor="VIEW"
            >
              {role}
            </span>
          ))}
        </motion.div>

        {/* Scroll CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="text-[10px] font-mono-custom tracking-widest uppercase">Scroll to Begin</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-cyan-400/50" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #050508)",
        }}
      />
    </section>
  );
}
