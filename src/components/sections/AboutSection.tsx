"use client";

import React, { useState } from "react";
import {
  Brain,
  Cpu,
  Palette,
  Code2,
  Database,
  Layers,
  Sparkles,
  Zap,
  Compass,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SKILLS_DATA } from "@/data/portfolioData";

export function AboutSection() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      icon: <Brain className="w-4 h-4 text-amber-400" />,
      title: "Cognitive Science & Systems",
      desc: "Modeling how human perception interprets high-density information, eliminates noise, and abstracts complex problems into intuitive mental maps.",
      accent: "rgba(245, 158, 11, 0.1)",
    },
    {
      icon: <Cpu className="w-4 h-4 text-sky-400" />,
      title: "Computation & Machine Learning",
      desc: "Engineering reproducible Python data pipelines, training TensorFlow neural models, and co-authoring computational research papers.",
      accent: "rgba(56, 189, 248, 0.1)",
    },
    {
      icon: <Palette className="w-4 h-4 text-emerald-400" />,
      title: "Tactile UI Architecture",
      desc: "Architecting accessible, high-performance responsive interfaces in React, Next.js, and Figma with deep attention to ergonomics and micro-interactions.",
      accent: "rgba(16, 185, 129, 0.1)",
    },
  ];

  return (
    <section
      id="about"
      aria-label="Cognitive Matrix and Skills"
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <div className="mb-8 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 tracking-wider uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>03 // Cognitive Matrix & Toolkit</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
          Philosophy & Technical Proficiencies
        </h2>
      </div>

      {/* 2-Column Split: First Principles & 3 Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
        {/* Left: First Principles Card */}
        <div className="lg:col-span-6">
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.1)"
            className="p-6 sm:p-7 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>First Principles Methodology</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-4">
                Whether co-authoring machine learning papers in TensorFlow, deploying water filtration systems with TGELF, or architecting responsive platforms for 50+ members:
              </p>
              <blockquote className="border-l-2 border-amber-400 pl-4 py-2 my-3 text-zinc-200 font-mono text-xs leading-relaxed bg-zinc-900/60 rounded-r-md">
                &ldquo;Deconstruct any system down to its foundational axioms, eliminate unnecessary friction, and engineer a solution whose execution feels inevitable.&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>Scientific Content & Code</span>
              <span className="text-amber-400">The Walnut Initiative CSO</span>
            </div>
          </SpotlightCard>
        </div>

        {/* Right: 3 Pillars */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          {pillars.map((pillar, i) => (
            <SpotlightCard
              key={i}
              spotlightColor={pillar.accent}
              onClick={() => setActivePillar(i)}
              className={`p-4 cursor-pointer transition-all ${
                activePillar === i ? "border-white/20 bg-zinc-900/80" : ""
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800">
                  {pillar.icon}
                </div>
                <h3 className="text-xs font-bold font-sans text-white tracking-wide">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed pl-8">
                {pillar.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* Technical Proficiencies 3-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Languages & Frameworks */}
        <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.08)" className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Code2 className="w-4 h-4 text-sky-400" />
            <h4 className="text-xs font-mono text-sky-400 uppercase tracking-wider">
              Languages & Frameworks
            </h4>
          </div>
          <div className="space-y-1.5">
            {SKILLS_DATA.languagesAndFrameworks.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-md bg-zinc-900/70 border border-zinc-800/80 text-xs"
              >
                <span className="font-medium text-zinc-200">{skill.name}</span>
                <span className="text-[10px] font-mono text-zinc-500">[{skill.category}]</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Data & AI Libraries */}
        <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.08)" className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-mono text-purple-400 uppercase tracking-wider">
              Data & AI Libraries
            </h4>
          </div>
          <div className="space-y-1.5">
            {SKILLS_DATA.dataAndAI.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-md bg-zinc-900/70 border border-zinc-800/80 text-xs"
              >
                <span className="font-medium text-zinc-200">{skill.name}</span>
                <span className="text-[10px] font-mono text-zinc-500">[{skill.category}]</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Design & Workflows */}
        <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.08)" className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Design & Workflows
            </h4>
          </div>
          <div className="space-y-1.5">
            {SKILLS_DATA.designAndWorkflows.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-md bg-zinc-900/70 border border-zinc-800/80 text-xs"
              >
                <span className="font-medium text-zinc-200">{skill.name}</span>
                <span className="text-[10px] font-mono text-zinc-500">[{skill.category}]</span>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>

      {/* Domain Interests Pill Bar */}
      <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.08)" className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase tracking-wider">Intellectual Pursuits & Interests:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SKILLS_DATA.interests.map((interest, i) => (
              <span
                key={i}
                className="text-xs text-zinc-300 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
