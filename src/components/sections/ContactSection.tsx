"use client";

import React, { useState } from "react";
import {
  Mail,
  Github,
  Phone,
  ArrowUp,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { PERSONAL_INFO } from "@/data/portfolioData";
import confetti from "canvas-confetti";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const triggerCelebrate = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  return (
    <section
      id="contact"
      aria-label="Contact Information"
      className="pt-20 pb-12 px-4 sm:px-6 max-w-6xl mx-auto relative z-10"
    >
      {/* Section Header */}
      <div className="mb-8 border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-wider uppercase mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>05 // Transmission & Channels</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
          Let&apos;s Build Something Inevitable
        </h2>
        <p className="text-xs text-zinc-400 font-sans mt-1 max-w-lg">
          Open to computational research, AI integration, UI architecture, and high-impact advisory discussions.
        </p>
      </div>

      {/* 3 Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Email Card */}
        <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.1)" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                Direct Electronic Mail
              </span>
              <Mail className="w-4 h-4 text-zinc-400" />
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-sm font-semibold text-white hover:text-amber-300 transition-colors block mb-1 truncate"
            >
              {PERSONAL_INFO.email}
            </a>
            <p className="text-[11px] text-zinc-500 font-sans">
              Expected response within 24 hours
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <button
              onClick={copyEmail}
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Copy address</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-xs font-medium text-amber-400 hover:underline"
            >
              Compose →
            </a>
          </div>
        </SpotlightCard>

        {/* GitHub Card */}
        <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.1)" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
                Code Repository
              </span>
              <Github className="w-4 h-4 text-zinc-400" />
            </div>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white hover:text-sky-300 transition-colors block mb-1"
            >
              {PERSONAL_INFO.githubHandle}
            </a>
            <p className="text-[11px] text-zinc-500 font-sans">
              Open-source web platforms & ML notebooks
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-mono">Public GitHub</span>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-sky-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Visit profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </SpotlightCard>

        {/* Cellular / Voice Card */}
        <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.1)" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                Voice / WhatsApp
              </span>
              <Phone className="w-4 h-4 text-zinc-400" />
            </div>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors block mb-1"
            >
              {PERSONAL_INFO.phone}
            </a>
            <p className="text-[11px] text-zinc-500 font-sans">
              Available for voice & scheduled syncs
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <button
              onClick={copyPhone}
              className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Copy number</span>
                </>
              )}
            </button>
            <button
              onClick={triggerCelebrate}
              className="text-xs font-medium text-emerald-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Connect</span>
            </button>
          </div>
        </SpotlightCard>
      </div>

      {/* Location & Timezone Bar */}
      <div className="p-4 rounded-xl border border-zinc-800/80 bg-[#0E0E12]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 font-mono mb-12">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Location: Nagpur, Maharashtra, India</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Timezone: IST (UTC +5:30)</span>
          </span>
        </div>
      </div>

      {/* Semantic Minimalist Footer */}
      <footer
        role="contentinfo"
        className="pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500"
      >
        <div>
          <span>Shourya Sharan // © 2026</span>
        </div>

        <div className="flex items-center gap-4">
          <span>Designed with Linear Minimalist Philosophy</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1"
            aria-label="Return to top of page"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </button>
        </div>
      </footer>
    </section>
  );
}
