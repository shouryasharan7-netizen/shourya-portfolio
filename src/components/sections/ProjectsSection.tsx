"use client";

import React, { useState, useEffect } from "react";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Card3D } from "@/components/ui/Card3D";
import {
  ArrowUpRight,
  X,
  CheckCircle,
  Eye,
  Sparkles,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { PROJECTS_DATA, ProjectItem } from "@/data/portfolioData";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const openModal = (proj: ProjectItem) => {
    audioEngine.playClick();
    setSelectedProject(proj);
  };

  const closeModal = () => {
    audioEngine.playClick();
    setSelectedProject(null);
  };

  // Keyboard accessibility: Escape to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="projects"
      aria-label="Projects and Inventions"
      className="py-28 px-4 sm:px-8 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-cyan-neon tracking-[0.3em] uppercase bg-cyan-neon/10 px-3.5 py-1 rounded-full border border-cyan-neon/30 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            // 03. CRAFT & DEPLOYMENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            FEATURED <span className="text-gold-400 font-sans">INVENTIONS & DESIGNS.</span>
          </h2>
          <p className="text-sm text-gray-400 font-mono mt-2 max-w-xl">
            Prototypes and implementations spanning heritage cultural applications, AR wearables, and environmental technology.
          </p>
        </div>

        {/* 3 Featured Projects Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((proj) => (
            <div key={proj.id} className="h-full">
              <Card3D
                glowColor={proj.glow}
                onClick={() => openModal(proj)}
                className="flex flex-col justify-between h-full p-6 sm:p-8 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-cyan-neon rounded-sm"
              >
                <div>
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl p-3 rounded bg-black/80 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform">
                      {proj.icon}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase bg-black/80 px-2.5 py-1 rounded border border-gold-500/30">
                      {proj.category.split("//")[0]}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="text-2xl font-bold font-mono text-white group-hover:text-gold-300 transition-colors mb-1">
                    {proj.title}
                  </h3>
                  <h4 className="text-xs font-mono text-gray-300 font-medium mb-4">
                    {proj.role}
                  </h4>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                    {proj.shortDesc}
                  </p>
                </div>

                {/* Tags and Inspect CTA */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.slice(0, 3).map((tag, j) => (
                      <span
                        key={j}
                        className="text-[9px] font-mono text-gray-400 bg-black/70 px-2 py-0.5 rounded border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-neon group-hover:text-white transition-colors">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>INSPECT BLUEPRINT</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Card3D>
            </div>
          ))}
        </div>

        {/* Accessible Interactive Schematic Inspection Modal */}
        {selectedProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            <div className="glass-card max-w-2xl w-full p-6 sm:p-10 rounded-sm border border-cyan-neon/50 shadow-[0_0_80px_rgba(0,240,255,0.3)] relative max-h-[90vh] overflow-y-auto">
              {/* Close Button with 44px touch area */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/80 border border-gold-500/40 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label="Close project blueprint modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl p-3.5 rounded bg-black border border-gold-500/30">
                  {selectedProject.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-neon uppercase bg-cyan-neon/10 px-2 py-0.5 rounded border border-cyan-neon/30">
                    {selectedProject.category}
                  </span>
                  <h3
                    id="modal-project-title"
                    className="text-3xl font-bold font-serif text-white tracking-tight mt-1"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-300">
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
                  <p className="bg-black/60 p-4 rounded border border-zinc-800 text-gray-300 font-sans">
                    {selectedProject.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono text-cyan-neon tracking-wider uppercase mb-2">
                    // KEY IMPACT & VALIDATION
                  </h4>
                  <div className="bg-black/60 p-4 rounded border border-cyan-neon/30 text-cyan-100 font-mono text-xs flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-neon flex-shrink-0 mt-0.5" />
                    <span>{selectedProject.impact}</span>
                  </div>
                </div>

                {selectedProject.presentationVenue && (
                  <div>
                    <h4 className="text-xs font-mono text-purple-400 tracking-wider uppercase mb-2">
                      // PRESENTATION & SUMMIT VENUE
                    </h4>
                    <div className="bg-black/60 p-3 rounded border border-purple-500/30 text-purple-200 font-mono text-xs flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>{selectedProject.presentationVenue}</span>
                    </div>
                  </div>
                )}

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
                  className="px-6 py-3 rounded-full bg-cyan-neon text-black font-mono font-semibold text-xs tracking-widest uppercase hover:bg-white transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-cyan-neon"
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
