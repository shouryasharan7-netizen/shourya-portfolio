"use client";

import React from "react";
import { Card3D } from "@/components/ui/Card3D";
import {
  Trophy,
  BookOpen,
  GraduationCap,
  Shield,
  Award,
  Sparkles,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";
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
        return <Trophy className="w-5 h-5 text-gold-400" />;
      case "tgelf-initiative":
        return <Shield className="w-5 h-5 text-cyan-neon" />;
      case "published-author":
        return <BookOpen className="w-5 h-5 text-purple-400" />;
      case "academic-scholarship":
        return <GraduationCap className="w-5 h-5 text-gold-400" />;
      default:
        return <Award className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section
      id="recognitions"
      aria-label="Awards, Certifications & Education"
      className="py-28 px-4 sm:px-8 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-gold-400 tracking-[0.3em] uppercase bg-gold-500/10 px-3.5 py-1 rounded-full border border-gold-500/30 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            // 04. HONORS & CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            RECOGNITIONS, CERTIFICATIONS & <span className="text-gold-400 font-sans">EDUCATION.</span>
          </h2>
          <p className="text-sm text-gray-400 font-mono mt-2 max-w-xl">
            National competitions, literary publications, academic scholarships, and technical certifications.
          </p>
        </div>

        {/* Recognitions Grid (2 Columns, 8 Items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {RECOGNITIONS_DATA.map((rec) => (
            <div key={rec.id} className="h-full">
              <Card3D glowColor={rec.glow} className="flex items-start gap-4 p-6 h-full">
                <div className="p-3 rounded bg-black/80 border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform">
                  {getIcon(rec.id)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono tracking-widest text-gold-400 font-semibold uppercase">
                      {rec.badge}
                    </span>
                    <span className="text-xs font-mono text-gray-400 bg-black/60 px-2.5 py-0.5 rounded border border-zinc-800">
                      {rec.year}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-serif text-white group-hover:text-gold-300 transition-colors mb-2">
                    {rec.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-3">
                    {rec.subtitle}
                  </p>

                  {rec.metric && (
                    <span className="text-[10px] font-mono text-cyan-neon bg-cyan-neon/10 px-2 py-0.5 rounded border border-cyan-neon/30">
                      ✓ {rec.metric}
                    </span>
                  )}
                </div>
              </Card3D>
            </div>
          ))}
        </div>

        {/* Certifications Row */}
        <div className="mb-14">
          <Card3D glowColor="cyan" className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <BadgeCheck className="w-5 h-5 text-cyan-neon" />
              <span className="text-xs font-mono text-cyan-neon tracking-widest uppercase">
                // PROFESSIONAL & TECHNICAL CERTIFICATIONS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CERTIFICATIONS_DATA.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded border border-cyan-neon/30 bg-black/60 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-gold-400 tracking-wider uppercase block mb-1">
                      {cert.date}
                    </span>
                    <h4 className="text-sm font-bold font-mono text-white mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-gray-300 font-sans">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-1 text-[10px] font-mono text-cyan-neon">
                    <CheckCircle2 className="w-3 h-3 text-cyan-neon" />
                    <span>Verified Credential</span>
                  </div>
                </div>
              ))}
            </div>
          </Card3D>
        </div>

        {/* Education Timeline Strip */}
        <Card3D glowColor="gold" className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-gold-400" />
            <span className="text-xs font-mono text-gold-400 tracking-widest uppercase">
              // ACADEMIC FOUNDATION & PEDAGOGY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            {EDUCATION_DATA.map((edu, index) => (
              <div
                key={index}
                className={index === 0 ? "pr-0 md:pr-6 pt-4 md:pt-0" : "pl-0 md:pl-6 pt-4 md:pt-0"}
              >
                <span className="text-[10px] font-mono text-cyan-neon tracking-widest uppercase block mb-1">
                  {edu.classes} · {edu.period}
                </span>
                <h4 className="text-lg font-bold font-serif text-white mb-1">
                  {edu.institution}
                </h4>
                <p className="text-xs font-mono text-gold-400 mb-3">
                  {edu.score} · {edu.percentileText}
                </p>
                <div className="space-y-1.5">
                  {edu.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300 font-sans leading-relaxed">
                      <span className="text-gold-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card3D>
      </div>
    </section>
  );
}
