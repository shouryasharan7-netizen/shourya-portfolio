"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  Github,
  MapPin,
  Sparkles,
  Command,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
}

export function HeroSection({ onOpenCommandPalette }: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="hero"
      aria-label="Introduction & Highlights"
      className="pt-32 pb-16 px-4 sm:px-6 relative z-10 max-w-6xl mx-auto"
    >
      {/* Top Status Badge & Location */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-medium tracking-tight">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for research & engineering collaborations</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
          <span>Nagpur, India</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">Top 1% CBSE Cohort</span>
        </div>
      </div>

      {/* Main Punchy Linear Headline */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.1] font-sans">
          &ldquo;I don&apos;t think in disciplines. <br />
          <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent">
            I think in problems.&rdquo;
          </span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed font-sans">
          I&apos;m <span className="text-zinc-100 font-semibold">Shourya Sharan</span>—a 17-year-old researcher, builder, and UI architect working at the intersection of cognitive science, machine computation, and accessible visual systems. Currently serving as{" "}
          <span className="text-amber-300 font-medium">Chief Science Officer</span> at The Walnut Initiative,{" "}
          <span className="text-sky-300 font-medium">Computational Researcher</span> at STEMinate, and{" "}
          <span className="text-zinc-200 font-medium">Freelance Web Developer</span> at Descreened.
        </p>
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        {/* Explore Work */}
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-sm"
        >
          <span>Explore selected craft</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        {/* Copy Email Button */}
        <button
          onClick={copyEmail}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-200 text-xs font-medium transition-all"
          title="Copy email to clipboard"
        >
          {copiedEmail ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300">Copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy Email</span>
            </>
          )}
        </button>

        {/* GitHub */}
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-200 text-xs font-medium transition-all"
        >
          <Github className="w-3.5 h-3.5 text-zinc-400" />
          <span>GitHub</span>
        </a>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-900/60 border border-white/10 hover:border-white/20 text-zinc-400 text-xs font-mono transition-all"
        >
          <Command className="w-3.5 h-3.5" />
          <span>Press ⌘K</span>
        </button>
      </div>

      {/* 4 Verified Metric Bento Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {PERSONAL_INFO.stats.map((stat, i) => (
          <SpotlightCard
            key={i}
            spotlightColor={
              i === 0
                ? "rgba(245, 158, 11, 0.12)"
                : i === 1
                ? "rgba(56, 189, 248, 0.12)"
                : i === 2
                ? "rgba(168, 85, 247, 0.12)"
                : "rgba(16, 185, 129, 0.12)"
            }
            className="p-4 sm:p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                {stat.label}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            </div>

            <div className="my-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">
                {stat.value}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 font-sans mt-1">
              {stat.sub}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
