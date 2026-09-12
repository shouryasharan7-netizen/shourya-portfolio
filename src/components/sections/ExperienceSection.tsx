"use client";

import React, { useState } from "react";
import { Briefcase, Calendar, CheckCircle2, ChevronRight, Layers, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ROLES_DATA, RoleItem } from "@/data/portfolioData";

export function ExperienceSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = [
    { label: "All Appointments", value: "ALL", count: ROLES_DATA.length },
    {
      label: "Engineering & AI",
      value: "Engineering & AI",
      count: ROLES_DATA.filter((r) => r.category === "Engineering & AI").length,
    },
    {
      label: "Leadership & Science",
      value: "Leadership & Science",
      count: ROLES_DATA.filter((r) => r.category === "Leadership & Science").length,
    },
    {
      label: "School Governance",
      value: "School Governance",
      count: ROLES_DATA.filter((r) => r.category === "School Governance").length,
    },
  ];

  const filteredRoles =
    activeCategory === "ALL"
      ? ROLES_DATA
      : ROLES_DATA.filter((r) => r.category === activeCategory);

  return (
    <section
      id="experience"
      aria-label="Leadership and Work Experience"
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>01 // Trajectory & Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
            Work & Leadership Appointments
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-zinc-200 text-black font-semibold shadow-sm"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 text-[10px] opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Appointments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoles.map((item) => (
          <SpotlightCard
            key={item.id}
            spotlightColor="rgba(245, 158, 11, 0.08)"
            className="p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header: Period & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  {item.badge}
                </span>
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  {item.period}
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="text-lg font-bold text-white mb-0.5 font-sans">
                {item.role}
              </h3>
              <h4 className="text-xs font-medium text-zinc-400 mb-4">
                {item.organization} <span className="text-zinc-600">·</span> {item.type}
              </h4>

              {/* Description */}
              <p className="text-xs text-zinc-300 font-sans leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Responsibilities */}
              <div className="space-y-1.5 mb-5">
                {item.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Metric Chips */}
            <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap gap-1.5">
              {item.metrics.map((metric, j) => (
                <span
                  key={j}
                  className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800"
                >
                  ⚡ {metric}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
