"use client";

import React from "react";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Briefcase, Calendar, MapPin, ExternalLink, ShieldAlert, Cpu, Award } from "lucide-react";

interface Role {
  role: string;
  organization: string;
  period: string;
  type: string;
  badge: string;
  badgeColor: string;
  description: string;
  highlights: string[];
}

const ROLES: Role[] = [
  {
    role: "Chief Science Officer",
    organization: "The Walnut Initiative",
    period: "Jun 2026 → Present",
    type: "Remote · Independent Publication",
    badge: "LEADERSHIP // SCIENCE",
    badgeColor: "border-gold-500/40 text-gold-400 bg-gold-500/10",
    description:
      "Directing scientific content strategy and rigorous peer-review pipelines for independent STEM publications. Authored pedagogical reports for localized neuroscience workshops deployed across regional academic institutions in India.",
    highlights: [
      "Scientific content strategy & peer-review",
      "Neuroscience workshops in regional schools",
      "Pedagogical framework development",
    ],
  },
  {
    role: "Web Architect & UI Lead",
    organization: "Descreened · LLPL AI Bootcamp",
    period: "Apr 2026 → Present",
    type: "Freelance · Platform Engineering",
    badge: "SYSTEMS // NEXT.JS",
    badgeColor: "border-cyan-neon/40 text-cyan-neon bg-cyan-neon/10",
    description:
      "Architecting responsive, high-performance web platforms utilizing React and Next.js. Spearheaded AI-assisted coding paradigms with Claude and Qoder, driving 200+ unique user interactions across interactive web solutions.",
    highlights: [
      "200+ unique user interactions driven",
      "React & Next.js production platforms",
      "AI-assisted developer workflows",
    ],
  },
  {
    role: "Computational Researcher",
    organization: "STEMinate",
    period: "May 2026 → Present",
    type: "Research · Machine Learning",
    badge: "AI // PYTHON // ML",
    badgeColor: "border-purple-400/40 text-purple-300 bg-purple-500/10",
    description:
      "Co-authoring computational research papers employing Python, Pandas, and Scikit-Learn. Training predictive neural architectures in TensorFlow to analyze structured multidimensional datasets for publishable scientific findings.",
    highlights: [
      "Predictive modeling with TensorFlow",
      "Multivariate dataset analysis via Pandas",
      "Co-authoring research papers for publication",
    ],
  },
  {
    role: "Head of Tech & Operations",
    organization: "ThinkEconomics Club",
    period: "May 2026 → Present",
    type: "Operations · Community",
    badge: "OPERATIONS // 50+ MEMBERS",
    badgeColor: "border-amber-400/40 text-amber-300 bg-amber-500/10",
    description:
      "Managing end-to-end digital infrastructure and automated workflow pipelines for a 50+ member academic community. Synthesizing economic analytical models with operational software to streamline event logistics and communication.",
    highlights: [
      "50+ member community infrastructure",
      "Automated logistics & registration pipelines",
      "Economic modeling & event coordination",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-gold-400 tracking-[0.3em] uppercase bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20 mb-3">
            // 02. SPATIAL TRAJECTORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            WHAT I&apos;VE BEEN <span className="text-gold-400 font-sans">BUILDING & LEADING.</span>
          </h2>
        </div>

        {/* 2x2 Grid of Roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROLES.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => audioEngine.playHover()}
              className="glass-card p-6 sm:p-8 rounded-sm flex flex-col justify-between group hover:border-gold-400/60 transition-all duration-300 hud-corner"
            >
              <div>
                {/* Header Badge & Period */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-gold-400" />
                    {item.period}
                  </span>
                </div>

                {/* Role Title & Org */}
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-gold-300 transition-colors mb-1">
                  {item.role}
                </h3>
                <h4 className="text-sm font-sans font-medium text-gold-400 mb-4">
                  {item.organization} · <span className="text-gray-400 font-normal">{item.type}</span>
                </h4>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Highlights Pill List */}
              <div className="pt-4 border-t border-zinc-800/80">
                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight, j) => (
                    <span
                      key={j}
                      className="text-[10px] font-mono text-gray-300 bg-black/50 px-2.5 py-1 rounded border border-zinc-800 group-hover:border-gold-500/20 transition-colors"
                    >
                      ✓ {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
