"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Code2,
  X,
  CheckCircle,
  Eye,
  MapPin,
  ExternalLink,
  Layers,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { PROJECTS_DATA, ProjectItem } from "@/data/portfolioData";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="projects"
      aria-label="Projects and Inventions"
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 tracking-wider uppercase mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>02 // Craft & Inventions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Featured Systems & Deployments
          </h2>
        </div>
        <p className="text-xs text-zinc-400 font-mono">
          Click any card to inspect the architectural blueprint
        </p>
      </div>

      {/* Projects 3-Column Spotlight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROJECTS_DATA.map((proj) => (
          <SpotlightCard
            key={proj.id}
            spotlightColor="rgba(56, 189, 248, 0.1)"
            onClick={() => setSelectedProject(proj)}
            className="p-6 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Category & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:scale-105 transition-transform">
                  {proj.icon}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 bg-sky-400/10 px-2.5 py-0.5 rounded border border-sky-400/20">
                  {proj.category.split("//")[0].trim()}
                </span>
              </div>

              {/* Title & Role */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                {proj.title}
              </h3>
              <h4 className="text-xs text-zinc-400 font-medium mb-3">
                {proj.role}
              </h4>

              {/* Short Description */}
              <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-6">
                {proj.shortDesc}
              </p>
            </div>

            <div>
              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {proj.tags.slice(0, 3).map((tag, j) => (
                  <span
                    key={j}
                    className="text-[10px] font-mono text-zinc-400 bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-medium text-sky-400 group-hover:text-white transition-colors">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Blueprint</span>
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Accessible Architectural Inspection Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-[#0E0E12] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <span className="text-3xl p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                {selectedProject.icon}
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20">
                  {selectedProject.category}
                </span>
                <h3
                  id="modal-project-title"
                  className="text-2xl font-bold text-white mt-1 font-sans"
                >
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Role: {selectedProject.role}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed">
              <div>
                <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  // Architectural Overview
                </h4>
                <p className="bg-zinc-900/60 p-4 rounded-lg border border-zinc-800 text-zinc-300">
                  {selectedProject.overview}
                </p>
              </div>

              <div>
                <h4 className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                  // Key Impact & Validation
                </h4>
                <div className="bg-emerald-500/10 p-3.5 rounded-lg border border-emerald-500/20 text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{selectedProject.impact}</span>
                </div>
              </div>

              {selectedProject.presentationVenue && (
                <div>
                  <h4 className="text-[11px] font-mono text-purple-400 uppercase tracking-wider mb-1.5">
                    // Presentation & Summit Venue
                  </h4>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-purple-200 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span>{selectedProject.presentationVenue}</span>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                  // Systems & Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-zinc-200 text-black text-xs font-semibold hover:bg-white transition-colors"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
