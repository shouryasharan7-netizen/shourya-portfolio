"use client";

import React from "react";
import {
  Trophy,
  BookOpen,
  GraduationCap,
  Shield,
  Award,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  RECOGNITIONS_DATA,
  CERTIFICATIONS_DATA,
  EDUCATION_DATA,
} from "@/data/portfolioData";

export function RecognitionsSection() {
  const getIcon = (id: string) => {
    switch (id) {
      case "cbse-heritage-quiz":
      case "resera-hackathon":
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case "tgelf-initiative":
        return <Shield className="w-4 h-4 text-sky-400" />;
      case "published-author":
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      case "academic-scholarship":
        return <GraduationCap className="w-4 h-4 text-amber-400" />;
      default:
        return <Award className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section
      id="recognitions"
      aria-label="Awards, Certifications & Education"
      className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <div className="mb-8 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>04 // Recognitions & Credentials</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
          Honors, Certifications & Academic Pedagogy
        </h2>
      </div>

      {/* Recognitions Grid (2 Columns, 8 Items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {RECOGNITIONS_DATA.map((rec) => (
          <SpotlightCard
            key={rec.id}
            spotlightColor="rgba(245, 158, 11, 0.08)"
            className="p-5 flex items-start gap-4"
          >
            <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex-shrink-0 mt-0.5">
              {getIcon(rec.id)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase">
                  {rec.badge}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {rec.year}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-1.5 font-sans">
                {rec.title}
              </h3>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-2.5">
                {rec.subtitle}
              </p>

              {rec.metric && (
                <span className="text-[10px] font-mono text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20">
                  ✓ {rec.metric}
                </span>
              )}
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Certifications Row */}
      <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.08)" className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BadgeCheck className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-mono text-sky-400 uppercase tracking-wider">
            Verified Professional & Technical Certifications
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CERTIFICATIONS_DATA.map((cert, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">
                  {cert.date}
                </span>
                <h4 className="text-xs font-bold text-white font-sans mb-0.5">
                  {cert.name}
                </h4>
                <p className="text-[11px] text-zinc-400">{cert.issuer}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Credential Verified</span>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* Education Timeline Strip */}
      <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.08)" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            Academic Pedagogy & Scholastic Foundations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80">
          {EDUCATION_DATA.map((edu, index) => (
            <div
              key={index}
              className={index === 0 ? "pr-0 md:pr-6 pt-3 md:pt-0" : "pl-0 md:pl-6 pt-4 md:pt-0"}
            >
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider block mb-1">
                {edu.classes} · {edu.period}
              </span>
              <h4 className="text-base font-bold text-white mb-0.5 font-sans">
                {edu.institution}
              </h4>
              <p className="text-xs font-mono text-amber-400 mb-2.5">
                {edu.score} · {edu.percentileText}
              </p>
              <div className="space-y-1.5">
                {edu.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-sans leading-relaxed">
                    <span className="text-zinc-600 mt-0.5">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </section>
  );
}
