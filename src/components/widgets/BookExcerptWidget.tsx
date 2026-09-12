"use client";

import React, { useState } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BookOpen, Award, CheckCircle2, Bookmark, ArrowRight } from "lucide-react";

export function BookExcerptWidget() {
  const [activeTab, setActiveTab] = useState<"synopsis" | "excerpt" | "note">("synopsis");

  return (
    <SpotlightCard
      spotlightColor="rgba(168, 85, 247, 0.12)"
      className="p-6 border border-purple-500/20"
    >
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Book Spine & Cover Graphic */}
        <div className="lg:w-48 flex-shrink-0 flex flex-col items-center justify-between p-5 rounded-lg bg-gradient-to-b from-[#181324] via-[#100C1A] to-[#0A0712] border border-purple-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden group">
          {/* Subtle gold foil sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity" />

          <div className="text-center w-full">
            <span className="text-[9px] font-mono tracking-widest text-purple-300 uppercase block mb-1">
              Published Work
            </span>
            <div className="h-px w-8 bg-amber-400 mx-auto mb-4" />

            <h4 className="text-base font-serif font-bold text-white tracking-wide leading-tight mb-2">
              A SOLDIER&apos;S STORY
            </h4>
            <span className="text-[10px] font-mono text-zinc-400 block">
              by Shourya Sharan
            </span>
          </div>

          <div className="mt-6 text-center w-full pt-4 border-t border-purple-500/20">
            <span className="text-[9px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 inline-block mb-1">
              Top 1 of 200,000
            </span>
            <span className="text-[9px] text-zinc-400 block">
              National Young Author&apos;s Fair
            </span>
          </div>
        </div>

        {/* Interactive Reader Drawer */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Header and Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                  Author Showcase // National Young Author&apos;s Fair
                </span>
              </div>

              {/* Tab Pills */}
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab("synopsis")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === "synopsis"
                      ? "bg-purple-500/20 text-purple-200 font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Synopsis
                </button>
                <button
                  onClick={() => setActiveTab("excerpt")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === "excerpt"
                      ? "bg-purple-500/20 text-purple-200 font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Opening Excerpt
                </button>
                <button
                  onClick={() => setActiveTab("note")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === "note"
                      ? "bg-purple-500/20 text-purple-200 font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Selection
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="min-h-[140px] text-xs font-sans leading-relaxed text-zinc-300">
              {activeTab === "synopsis" && (
                <div className="space-y-3">
                  <p>
                    <strong className="text-white font-serif">A Soldier&apos;s Story</strong> explores duty, human resolve, and psychological resilience under extreme adversity. Authored during his formative school years, the work delves into the quiet emotional burden carried by front-line service personnel beyond the tactical theater.
                  </p>
                  <p className="text-zinc-400">
                    Selected and officially published following nationwide jury review at the National Young Author&apos;s Fair, chosen from an applicant pool exceeding 200,000 submissions across India.
                  </p>
                </div>
              )}

              {activeTab === "excerpt" && (
                <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 font-serif italic text-zinc-200 text-xs sm:text-sm leading-relaxed">
                  &ldquo;The silence that settles before dawn is never empty. It carries the weight of a thousand quiet promises, whispering across the cold ridges where footsteps turn to shadows, and courage is tested not in the thunder of battle, but in the steadfastness of the vigil.&rdquo;
                </div>
              )}

              {activeTab === "note" && (
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>200,000+ Competitors:</strong> Evaluated by professional literary reviewers and editors across national rounds.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Official Print & Digital Publication:</strong> Conferred Young Author laurels and distributed across reading platforms.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Badge */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Verified Literary Credential</span>
            <span className="text-purple-400">Published Author · 2023</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
