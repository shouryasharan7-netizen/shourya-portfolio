"use client";

import React, { useState } from "react";
import { audioEngine } from "@/components/audio/AudioEngine";
import { ArrowUpRight, Layers, Sparkles, X, CheckCircle, Cpu, Eye } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  description: string;
  fullOverview: string;
  impact: string;
  tags: string[];
  accent: string;
  icon: string;
}

const PROJECTS: Project[] = [
  {
    id: "ignicion",
    title: "Ignicion",
    category: "HERITAGE TECH // UI/UX",
    role: "Lead Systems Designer",
    description:
      "Designed the complete UI/UX and interaction architecture for a mobile platform bridging the youth-heritage gap. Presented the working prototype at the IGNICION summit.",
    fullOverview:
      "Ignicion is an interactive mobile ecosystem engineered to solve the cultural disconnect between modern youth and historical heritage. Designed from scratch in Figma with custom design systems, gamified learning pathways, and interactive 3D monument walkthroughs.",
    impact:
      "Presented prototype at IGNICION Summit with commendation for accessible UI paradigms and interactive cultural safeguarding.",
    tags: ["Figma", "UI/UX Architecture", "Mobile Prototyping", "Design Systems", "Heritage Tech"],
    accent: "from-cyan-500/20 to-blue-900/40 border-cyan-neon/40",
    icon: "🏛️",
  },
  {
    id: "cenquity",
    title: "Project Cenquity",
    category: "AR/VR // HARDWARE",
    role: "Hardware & Reality Architect",
    description:
      "Conceptualized wearable AR smart glasses bridging physical reality with real-time digital overlays. Pitched prototype at a Shark Tank-style innovation summit.",
    fullOverview:
      "Project Cenquity explores ambient augmented reality—replacing screen fatigue with lightweight optical waveguides. Conceptualized hardware chassis, battery thermal dissipation, and head-up optical display interfaces.",
    impact:
      "Pitched to an executive jury panel at Cenference Shark Tank; acclaimed for wearable ergonomics and spatial user interaction models.",
    tags: ["AR/VR", "Hardware Design", "Spatial Computing", "Optics", "Pitch Strategy"],
    accent: "from-purple-500/20 to-indigo-900/40 border-purple-400/40",
    icon: "👓",
  },
  {
    id: "biosand",
    title: "TGELF Biosand Filter",
    category: "SOCIAL IMPACT // ENGINEERING",
    role: "National Finalist · Top 3%",
    description:
      "Deployed low-cost multi-layer biosand water filtration units for clean water access in underserved communities. National Finalist at TGELF.",
    fullOverview:
      "Engineered an open-source, affordable biosand water filter using graded sand layers, active biolayer filtration, and gravel stratification. Successfully deployed real physical filtration units to remove pathogens without electricity.",
    impact:
      "Ranked Top 3% nationally across India at TGELF, delivering measurable bacterial reduction for off-grid communities.",
    tags: ["Environmental Engineering", "Social Impact", "National Finalist", "Hydrology", "Deployments"],
    accent: "from-amber-500/20 to-yellow-900/40 border-gold-500/40",
    icon: "💧",
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (proj: Project) => {
    audioEngine.playClick();
    setSelectedProject(proj);
  };

  const closeModal = () => {
    audioEngine.playClick();
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-28 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-gold-400 tracking-[0.3em] uppercase bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20 mb-3">
            // 03. CRAFT & DEPLOYMENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            FEATURED <span className="text-gold-400 font-sans">INVENTIONS & DESIGNS.</span>
          </h2>
          <p className="text-sm text-gray-400 font-mono mt-2">
            Click any project to initialize 3D exploded schematic
          </p>
        </div>

        {/* 3 Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              onClick={() => openModal(proj)}
              onMouseEnter={() => audioEngine.playHover()}
              className={`glass-card p-6 sm:p-8 rounded-sm flex flex-col justify-between group hover:scale-[1.02] cursor-pointer bg-gradient-to-b ${proj.accent} hud-corner transition-all duration-300`}
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl p-3 rounded bg-black/60 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {proj.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase bg-black/70 px-2.5 py-1 rounded border border-gold-500/30">
                    {proj.category}
                  </span>
                </div>

                {/* Title & Role */}
                <h3 className="text-2xl font-bold font-mono text-white group-hover:text-gold-300 transition-colors mb-1">
                  {proj.title}
                </h3>
                <h4 className="text-xs font-mono text-gray-300 font-medium mb-4">
                  {proj.role}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              {/* Tags and Inspect CTA */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tags.slice(0, 3).map((tag, j) => (
                    <span
                      key={j}
                      className="text-[9px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 rounded border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gold-400 group-hover:text-white transition-colors">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>INSPECT SCHEMATIC</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Schematic Inspection Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
            <div className="glass-card max-w-2xl w-full p-6 sm:p-10 rounded-sm border border-gold-500/50 shadow-[0_0_80px_rgba(212,175,55,0.25)] relative max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/80 border border-gold-500/40 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl p-3.5 rounded bg-black border border-gold-500/30">
                  {selectedProject.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/30">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl font-bold font-serif text-white tracking-tight mt-1">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400">
                    ROLE: {selectedProject.role}
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-6 text-gray-200 font-sans text-sm leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono text-gold-400 tracking-wider uppercase mb-2">
                    // ARCHITECTURAL OVERVIEW
                  </h4>
                  <p className="bg-black/50 p-4 rounded border border-zinc-800 text-gray-300 font-sans">
                    {selectedProject.fullOverview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-cyan-neon tracking-wider uppercase mb-2">
                    // KEY IMPACT & VALIDATION
                  </h4>
                  <p className="bg-black/50 p-4 rounded border border-cyan-neon/20 text-cyan-100 font-mono text-xs flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-neon flex-shrink-0 mt-0.5" />
                    <span>{selectedProject.impact}</span>
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-gold-400 tracking-wider uppercase mb-2">
                    // SYSTEMS & STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono text-gold-300 bg-gold-500/10 px-3 py-1 rounded border border-gold-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-full bg-gold-500 text-black font-mono font-semibold text-xs tracking-widest uppercase hover:bg-gold-400 transition-colors"
                >
                  DISMISS SCHEMATIC
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
