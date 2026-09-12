"use client";

import React, { useState } from "react";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Card3D } from "@/components/ui/Card3D";
import {
  Brain,
  Cpu,
  Palette,
  Layers,
  Zap,
  Crosshair,
  Compass,
  Code2,
  Database,
  Sparkles,
} from "lucide-react";
import { SKILLS_DATA, PERSONAL_INFO } from "@/data/portfolioData";

export function AboutSection() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      icon: <Brain className="w-5 h-5 text-gold-400" />,
      title: "COGNITIVE SCIENCE & SYSTEMS",
      desc: "Modeling how human perception interprets complex systems, abstracts noise, and navigates digital environments intuitively.",
      glow: "gold" as const,
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-neon" />,
      title: "COMPUTATION & MACHINE LEARNING",
      desc: "Engineering reproducible Python data pipelines, training TensorFlow neural models, and co-authoring computational research papers.",
      glow: "cyan" as const,
    },
    {
      icon: <Palette className="w-5 h-5 text-amber-400" />,
      title: "TACTILE UI & ARCHITECTURE",
      desc: "Designing component libraries, spatial physics, and accessible responsive interfaces using React, Next.js, and Figma.",
      glow: "amber" as const,
    },
  ];

  return (
    <section
      id="about"
      aria-label="Cognitive Matrix and Skills"
      className="py-28 px-4 sm:px-8 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-cyan-neon tracking-[0.3em] uppercase bg-cyan-neon/10 px-3.5 py-1 rounded-full border border-cyan-neon/30 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            // 01. COGNITIVE MATRIX & PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            I DON&apos;T THINK IN DISCIPLINES. <br />
            <span className="text-gold-400 font-sans">I THINK IN PROBLEMS.</span>
          </h2>
        </div>

        {/* 2-Column Split: Manifesto Card & 3 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: First Principles Axiom */}
          <div className="lg:col-span-7">
            <Card3D glowColor="gold" className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-gold-400 tracking-widest uppercase mb-4">
                  <Zap className="w-4 h-4 text-gold-400" />
                  <span>FIRST PRINCIPLES METHODOLOGY</span>
                </div>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans mb-6">
                  Whether training predictive machine learning models in TensorFlow, designing mobile architectures for heritage preservation, or directing operations for a 50+ member academic community:
                </p>
                <blockquote className="border-l-2 border-gold-500 pl-4 py-2 my-4 text-gold-300 font-mono text-sm leading-relaxed bg-gold-500/5">
                  &ldquo;Deconstruct any system down to its foundational axioms, eliminate unnecessary friction, and engineer a solution whose execution feels inevitable.&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                  Focusing on technical clarity, rigorous scientific inquiry, and purposeful design systems rather than decorative complexity.
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5 text-cyan-neon">
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>ACTIVE NODE: NAGPUR, INDIA</span>
                </span>
                <span className="text-gold-400">CBSE BOARD 97% // TOP 1% COHORT</span>
              </div>
            </Card3D>
          </div>

          {/* Right Column: 3 Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {pillars.map((pillar, i) => (
              <div key={i} className="flex-1">
                <Card3D
                  glowColor={pillar.glow}
                  onClick={() => {
                    audioEngine.playClick();
                    setActivePillar(i);
                  }}
                  className={`p-5 cursor-pointer transition-all ${
                    activePillar === i ? "border-cyan-neon bg-cyan-neon/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded bg-black/70 border border-white/10">
                      {pillar.icon}
                    </div>
                    <h3 className="text-sm font-bold font-mono tracking-wider text-white">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </Card3D>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Proficiencies & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Languages & Frameworks */}
          <Card3D glowColor="cyan" className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-cyan-neon" />
              <h3 className="text-xs font-mono text-cyan-neon tracking-widest uppercase">
                LANGUAGES & FRAMEWORKS
              </h3>
            </div>
            <div className="space-y-2">
              {SKILLS_DATA.languagesAndFrameworks.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-black/60 border border-zinc-800 text-xs"
                >
                  <span className="font-mono text-white font-medium">{skill.name}</span>
                  <span className="text-[10px] font-mono text-gray-400">[{skill.category}]</span>
                </div>
              ))}
            </div>
          </Card3D>

          {/* Data & AI Libraries */}
          <Card3D glowColor="purple" className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-mono text-purple-400 tracking-widest uppercase">
                DATA & AI LIBRARIES
              </h3>
            </div>
            <div className="space-y-2">
              {SKILLS_DATA.dataAndAI.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-black/60 border border-zinc-800 text-xs"
                >
                  <span className="font-mono text-white font-medium">{skill.name}</span>
                  <span className="text-[10px] font-mono text-gray-400">[{skill.category}]</span>
                </div>
              ))}
            </div>
          </Card3D>

          {/* Design & Workflows */}
          <Card3D glowColor="gold" className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-gold-400" />
              <h3 className="text-xs font-mono text-gold-400 tracking-widest uppercase">
                DESIGN & WORKFLOWS
              </h3>
            </div>
            <div className="space-y-2">
              {SKILLS_DATA.designAndWorkflows.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-black/60 border border-zinc-800 text-xs"
                >
                  <span className="font-mono text-white font-medium">{skill.name}</span>
                  <span className="text-[10px] font-mono text-gray-400">[{skill.category}]</span>
                </div>
              ))}
            </div>
          </Card3D>
        </div>

        {/* Domain Interests Pill Bar */}
        <Card3D glowColor="amber" className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                DOMAIN INTERESTS & INTELLECTUAL PURSUITS:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SKILLS_DATA.interests.map((interest, i) => (
                <span
                  key={i}
                  className="text-xs font-mono text-gray-300 bg-black/70 px-3 py-1 rounded-full border border-amber-500/20"
                >
                  • {interest}
                </span>
              ))}
            </div>
          </div>
        </Card3D>
      </div>
    </section>
  );
}
