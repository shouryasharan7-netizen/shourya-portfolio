"use client";

import React, { useState } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Share2,
  Plus,
  Shield,
  ExternalLink,
  Code,
  Globe,
  Sparkles,
} from "lucide-react";
import { PROJECTS_DATA, ROLES_DATA } from "@/data/portfolioData";

interface SafariAppProps {
  onClose?: () => void;
  onOpenApp?: (appId: string) => void;
}

export function SafariApp({ onClose, onOpenApp }: SafariAppProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [url, setUrl] = useState("https://www.shouryasharan.xyz/inventions");

  const TABS = [
    { title: "Inventions & Deployments", url: "https://www.shouryasharan.xyz/inventions" },
    { title: "The Walnut Initiative", url: "https://thewalnutinitiative.org" },
    { title: "Descreened Architecture", url: "https://descreened.xyz" },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#1A1A22] text-zinc-100 rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-white/10">
      {/* Safari Titlebar & Tabs Bar */}
      <div className="bg-[#24242F] border-b border-black/40 flex flex-col select-none flex-shrink-0">
        {/* Safari Navigation & Omnibar */}
        <div className="h-10 flex items-center justify-between px-3.5 gap-3">
          {/* Back / Forward / Refresh Navigation */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            <button
              onClick={() => soundEngine.playWindowClick()}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => soundEngine.playWindowClick()}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Forward"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Safari Omnibar / URL Search Box */}
          <div className="flex-1 max-w-lg mx-auto flex items-center bg-[#181820] border border-white/10 rounded-lg px-3 py-1 text-xs text-zinc-300 gap-2 shadow-inner">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="truncate flex-1 font-mono text-[11px] text-zinc-300">
              {url}
            </span>
            <RotateCw className="w-3 h-3 text-zinc-500 hover:text-white cursor-pointer" />
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <Share2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center px-2 gap-1 overflow-x-auto scrollbar-none pb-1">
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveTab(i);
                setUrl(tab.url);
                soundEngine.playWindowClick();
              }}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-sans transition-colors cursor-pointer max-w-[200px] truncate ${
                activeTab === i
                  ? "bg-[#181820] text-white font-medium border border-white/10"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              <Globe className="w-3 h-3 text-sky-400 flex-shrink-0" />
              <span className="truncate">{tab.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Safari Rendered Web Content */}
      <div className="flex-1 bg-[#0F0F14] p-6 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="border-b border-white/10 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
              LIVE PORTFOLIO DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 font-sans">
              Deployed Systems & Architectural Prototypes
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Engineered with First-Principles Thinking • Nagpur, India
            </p>
          </div>

          {/* Inventions Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS_DATA.map((proj) => (
              <div
                key={proj.id}
                className="bg-zinc-900/80 border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-amber-400/40 transition-all shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl p-2 rounded-lg bg-black/40 border border-white/5">
                      {proj.icon}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    {proj.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-2">
                    ✓ {proj.impact}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((t, ti) => (
                      <span
                        key={ti}
                        className="text-[9px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick External Actions */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/30 to-black border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-white">Need the full curriculum vitae?</h4>
              <p className="text-xs text-zinc-400">
                Inspect official credentials in the native macOS Preview application.
              </p>
            </div>
            <button
              onClick={() => onOpenApp?.("preview")}
              className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all cursor-pointer whitespace-nowrap"
            >
              Open in Preview.app ↵
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
