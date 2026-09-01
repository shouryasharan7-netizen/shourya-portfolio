"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Brain, Cpu, Palette, Code, Layers, Zap } from "lucide-react";

export function AboutSection() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      icon: <Brain className="w-5 h-5 text-gold-400" />,
      title: "COGNITIVE SCIENCE",
      desc: "Investigating how human perception models systems, processes information, and abstracts complex challenges into intuitive mental maps.",
      accent: "border-gold-500/50 bg-gold-500/10",
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-neon" />,
      title: "COMPUTATION & ML",
      desc: "Training predictive models with TensorFlow & Scikit-Learn, building Python data pipelines, and co-authoring computational research papers.",
      accent: "border-cyan-neon/50 bg-cyan-neon/10",
    },
    {
      icon: <Palette className="w-5 h-5 text-amber-400" />,
      title: "VISUAL ARCHITECTURE",
      desc: "Architecting high-precision interfaces in Figma, Next.js, and Three.js with deep attention to typography, spatial physics, and tactile ergonomics.",
      accent: "border-amber-400/50 bg-amber-400/10",
    },
  ];

  const techStack = [
    { name: "Python", cat: "Research & ML" },
    { name: "TensorFlow", cat: "Deep Learning" },
    { name: "Scikit-Learn", cat: "Predictive Models" },
    { name: "Pandas", cat: "Data Analytics" },
    { name: "Next.js 15", cat: "Web Architecture" },
    { name: "React 19", cat: "UI Engineering" },
    { name: "Three.js", cat: "3D Graphics" },
    { name: "TypeScript", cat: "Type Safety" },
    { name: "Figma", cat: "Systems Design" },
    { name: "Tailwind CSS", cat: "Styling Tokens" },
  ];

  return (
    <section id="about" className="py-28 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-gold-400 tracking-[0.3em] uppercase bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20 mb-3">
            // 01. PHILOSOPHY & CONVERGENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            I DON&apos;T THINK IN DISCIPLINES. <br />
            <span className="text-gold-400 font-sans">I THINK IN PROBLEMS.</span>
          </h2>
        </div>

        {/* 2-Column Split: Philosophy & Cognitive Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Manifesto Card */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-10 rounded-sm flex flex-col justify-between hud-corner">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-gold-400 tracking-widest uppercase mb-4">
                <Zap className="w-4 h-4" />
                <span>CORE AXIOM</span>
              </div>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans mb-6">
                Whether training predictive machine learning models with TensorFlow, designing mobile architectures for heritage preservation, or directing tech operations for a 50+ member community — the methodology is uncompromising:
              </p>
              <blockquote className="border-l-2 border-gold-500 pl-4 py-2 my-4 text-gold-300 font-mono text-sm leading-relaxed bg-gold-500/5">
                &quot;Understand the underlying system down to first principles, eliminate unnecessary friction, and engineer a solution that feels inevitable.&quot;
              </blockquote>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
              <span>ACTIVE STATUS: RESEARCH & ENGINEERING</span>
              <span className="text-gold-400">CLASS 11–12 · CBSE 87% // 10TH 97%</span>
            </div>
          </div>

          {/* Right Column: 3 Overlapping Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                onClick={() => {
                  audioEngine.playClick();
                  setActivePillar(i);
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className={`p-5 rounded-sm border transition-all duration-300 cursor-pointer ${
                  activePillar === i
                    ? `${pillar.accent} shadow-[0_4px_25px_rgba(212,175,55,0.2)] scale-[1.02]`
                    : "glass-card hover:border-gold-500/40"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded bg-black/60 border border-white/10">
                    {pillar.icon}
                  </div>
                  <h3 className="text-sm font-bold font-mono tracking-wider text-white">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Matrix Tags */}
        <div className="glass-card p-6 sm:p-8 rounded-sm">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-mono text-gold-400 tracking-widest uppercase">
              TECHNICAL PROFICIENCIES & RESEARCH TOOLKIT
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech, i) => (
              <div
                key={i}
                onMouseEnter={() => audioEngine.playHover()}
                className="px-3.5 py-2 rounded-sm border border-gold-500/20 bg-black/60 hover:border-gold-400 hover:bg-gold-500/10 transition-all duration-200 group cursor-default"
              >
                <span className="text-xs font-mono font-medium text-white group-hover:text-gold-300">
                  {tech.name}
                </span>
                <span className="text-[10px] text-gray-500 ml-2 font-mono group-hover:text-gray-400">
                  [{tech.cat}]
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
