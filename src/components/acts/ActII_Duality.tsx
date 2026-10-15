"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CLASSICAL_MIND, STRATEGIST_CARDS } from "@/data/portfolioData";
import { BookOpen, Trophy, Swords, Award, GraduationCap, Star } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={18} />,
  Trophy: <Trophy size={18} />,
  Swords: <Swords size={18} />,
};

function PerspectiveTiltCard({ children, accent }: { children: React.ReactNode; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`;
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="DRAG"
      className="spotlight-card glass-card rounded-2xl p-6 relative overflow-hidden cursor-pointer"
      style={{
        transition: "transform 0.15s ease-out",
        willChange: "transform",
        borderColor: `rgba(255,255,255,0.07)`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accent}15 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function ActIIDuality() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6 max-w-7xl mx-auto"
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="section-label mb-3">ACT II · THE DUALITY ENGINE</div>
        <h2 className="font-display font-black text-4xl md:text-6xl leading-tight">
          <span className="text-gradient-gold">Classical Mind.</span>
          <br />
          <span className="text-gradient-cyber">Strategic Execution.</span>
        </h2>
        <p className="text-zinc-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
          Where ancient precision meets computational ambition — a duality forged through academic excellence, cultural scholarship, and competitive mastery.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* LEFT: Classical Mind — Academic Pedigree */}
        <div className="space-y-6">
          <div className="section-label flex items-center gap-2 mb-6">
            <GraduationCap size={14} className="text-amber-400" />
            <span>THE CLASSICAL MIND</span>
          </div>

          {CLASSICAL_MIND.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 glass-card-hover spotlight-card"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono-custom text-zinc-500">{item.label}</span>
                <div
                  className="text-2xl font-display font-black"
                  style={{
                    background: `linear-gradient(135deg, ${item.color.replace("from-", "").replace(" to-", ", ")})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.value}
                </div>
              </div>

              {/* Sub */}
              <div className="text-sm text-zinc-300 font-semibold mb-3">{item.sub}</div>

              {/* Certs */}
              <div className="flex flex-wrap gap-2">
                {item.certs.map((cert) => (
                  <span
                    key={cert}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono-custom tracking-wider border border-white/[0.06] text-zinc-400 bg-white/[0.02]"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: The Strategist — 3D Tilt Cards */}
        <div className="space-y-6">
          <div className="section-label flex items-center gap-2 mb-6">
            <Star size={14} className="text-cyan-400" />
            <span>THE STRATEGIST</span>
          </div>

          {STRATEGIST_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            >
              <PerspectiveTiltCard accent={card.accent}>
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.accent}15`, color: card.accent }}
                  >
                    {ICON_MAP[card.icon]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-mono-custom tracking-wider px-2 py-0.5 rounded"
                        style={{ background: `${card.accent}15`, color: card.accent }}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <div className="text-xs font-mono-custom text-zinc-500 mb-1">{card.label}</div>
                    <div className="text-base font-display font-bold text-white mb-2">{card.title}</div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{card.detail}</p>
                  </div>
                </div>
              </PerspectiveTiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
