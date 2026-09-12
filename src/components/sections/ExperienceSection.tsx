"use client";

import React, { useState } from "react";
import { Card3D } from "@/components/ui/Card3D";
import { Calendar, Briefcase, Sparkles, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { ROLES_DATA, RoleItem } from "@/data/portfolioData";
import { audioEngine } from "@/components/audio/AudioEngine";

export function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const categories = [
    { label: "ALL INITIATIVES", value: "ALL", count: ROLES_DATA.length },
    {
      label: "ENGINEERING & AI",
      value: "Engineering & AI",
      count: ROLES_DATA.filter((r) => r.category === "Engineering & AI").length,
    },
    {
      label: "LEADERSHIP & SCIENCE",
      value: "Leadership & Science",
      count: ROLES_DATA.filter((r) => r.category === "Leadership & Science").length,
    },
    {
      label: "SCHOOL GOVERNANCE",
      value: "School Governance",
      count: ROLES_DATA.filter((r) => r.category === "School Governance").length,
    },
  ];

  const filteredRoles =
    activeFilter === "ALL"
      ? ROLES_DATA
      : ROLES_DATA.filter((role) => role.category === activeFilter);

  return (
    <section
      id="experience"
      aria-label="Leadership and Work Experience"
      className="py-28 px-4 sm:px-8 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-mono text-gold-400 tracking-[0.3em] uppercase bg-gold-500/10 px-3.5 py-1 rounded-full border border-gold-500/30 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            // 02. SPATIAL TRAJECTORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            LEADERSHIP & <span className="text-gold-400 font-sans">WORK EXPERIENCE.</span>
          </h2>
          <p className="text-sm text-gray-400 font-mono mt-2 max-w-xl">
            Verified institutional appointments across scientific content strategy, AI engineering, and community leadership.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                audioEngine.playClick();
                setActiveFilter(cat.value);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all min-h-[44px] flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                activeFilter === cat.value
                  ? "bg-gold-400 text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "bg-black/60 border border-zinc-800 text-gray-300 hover:border-gold-500/40 hover:text-white"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  activeFilter === cat.value
                    ? "bg-black/30 text-black font-bold"
                    : "bg-zinc-800 text-gray-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Roles Grid (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoles.map((item) => (
            <div key={item.id} className="h-full">
              <Card3D glowColor={item.glow} className="flex flex-col justify-between h-full p-6 sm:p-8">
                <div>
                  {/* Top Badge & Period */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-gold-300 transition-colors mb-1">
                    {item.role}
                  </h3>
                  <h4 className="text-sm font-sans font-medium text-gold-400 mb-4">
                    {item.organization} ·{" "}
                    <span className="text-gray-400 font-normal">{item.type}</span>
                  </h4>

                  {/* Narrative Body */}
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Responsibilities Bullets */}
                  <div className="space-y-2 mb-6">
                    {item.responsibilities.map((resp, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-400/80 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics Footer */}
                <div className="pt-4 border-t border-zinc-800/80">
                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map((metric, j) => (
                      <span
                        key={j}
                        className="text-[10px] font-mono text-gray-300 bg-black/60 px-2.5 py-1 rounded border border-zinc-800 group-hover:border-gold-500/30 transition-colors"
                      >
                        ⚡ {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3D>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
