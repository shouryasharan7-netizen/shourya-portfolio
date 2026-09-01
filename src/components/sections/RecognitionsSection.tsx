"use client";

import React from "react";
import { Card3D } from "@/components/ui/Card3D";
import { Trophy, BookOpen, GraduationCap, Shield, Award, Sparkles } from "lucide-react";

interface Recognition {
  year: string;
  title: string;
  subtitle: string;
  tag: string;
  glow: "gold" | "cyan" | "purple" | "amber";
  icon: React.ReactNode;
}

const RECOGNITIONS: Recognition[] = [
  {
    year: "2024",
    title: "National Rank 2 & 5 — CBSE Heritage India Quiz",
    subtitle: "Top 5 national finish out of 2,300+ participating schools. Televised national semi-finals broadcast on History TV18.",
    tag: "NATIONAL // QUIZ",
    glow: "gold",
    icon: <Trophy className="w-5 h-5 text-gold-400" />,
  },
  {
    year: "2024",
    title: "National Finalist & Top 3% — TGELF Initiative",
    subtitle: "Engineered and deployed low-cost biosand water filtration units for underserved off-grid communities.",
    tag: "IMPACT // TOP 3%",
    glow: "cyan",
    icon: <Shield className="w-5 h-5 text-cyan-neon" />,
  },
  {
    year: "2023",
    title: "Published Author — National Young Author's Fair",
    subtitle: "Authored \"A Soldier's Story\" — evaluated and selected from a nationwide competitive pool of 200,000+ literary submissions.",
    tag: "LITERATURE // AUTHOR",
    glow: "purple",
    icon: <BookOpen className="w-5 h-5 text-purple-400" />,
  },
  {
    year: "2025",
    title: "50% Academic Merit Scholarship",
    subtitle: "Awarded for exceptional academic excellence in Class 10 board examinations — 97% aggregate, placed in top 1% cohort.",
    tag: "ACADEMIC // TOP 1%",
    glow: "amber",
    icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
  },
  {
    year: "2022–24",
    title: "District U-19 DSO Chess — 3 Consecutive Years",
    subtitle: "Competed at district level for three straight years; simultaneously represented institution in district-level football championships.",
    tag: "STRATEGY // ATHLETICS",
    glow: "gold",
    icon: <Award className="w-5 h-5 text-gold-400" />,
  },
];

export function RecognitionsSection() {
  return (
    <section id="recognitions" className="py-28 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-gold-400 tracking-[0.3em] uppercase bg-gold-500/10 px-3.5 py-1 rounded-full border border-gold-500/30 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            // 04. HONORS & CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            RECOGNITIONS & <span className="text-gold-400 font-sans">MILESTONES.</span>
          </h2>
        </div>

        {/* Recognitions Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {RECOGNITIONS.map((rec, i) => (
            <div key={i} className="h-full">
              <Card3D glowColor={rec.glow} className="flex items-start gap-4 p-6 h-full">
                <div className="p-3 rounded bg-black/70 border border-white/10 flex-shrink-0 group-hover:scale-110 transition-transform">
                  {rec.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono tracking-widest text-gold-400 font-semibold uppercase">
                      {rec.tag}
                    </span>
                    <span className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-0.5 rounded border border-zinc-800">
                      {rec.year}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-serif text-white group-hover:text-gold-300 transition-colors mb-2">
                    {rec.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                    {rec.subtitle}
                  </p>
                </div>
              </Card3D>
            </div>
          ))}
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
            <div className="pr-0 md:pr-6 pt-4 md:pt-0">
              <span className="text-[10px] font-mono text-cyan-neon tracking-widest uppercase block mb-1">
                CURRENT ENROLLMENT // SENIOR SECONDARY
              </span>
              <h4 className="text-lg font-bold font-serif text-white mb-1">
                Centre Point School, Katol Road
              </h4>
              <p className="text-xs font-mono text-gold-400 mb-2">
                Class 11–12 · CBSE Curriculum · 87%
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Focused on Advanced Mathematics, Physics, Chemistry, and Computational Systems.
              </p>
            </div>

            <div className="pl-0 md:pl-6 pt-4 md:pt-0">
              <span className="text-[10px] font-mono text-gold-400 tracking-widest uppercase block mb-1">
                BOARD EXAMINATION // TOP 1% NATIONWIDE
              </span>
              <h4 className="text-lg font-bold font-serif text-white mb-1">
                Centre Point School, Amravati Road Bypass
              </h4>
              <p className="text-xs font-mono text-gold-400 mb-2">
                Class 9–10 · CBSE Board: 97% Aggregate · Top 1% of Cohort
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Conferred 50% Academic Merit Scholarship in recognition of top percentile scholastic performance.
              </p>
            </div>
          </div>
        </Card3D>
      </div>
    </section>
  );
}
