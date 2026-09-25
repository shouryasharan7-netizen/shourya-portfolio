"use client";

import React, { useState } from "react";
import { Settings, Cpu, HardDrive, Monitor, ShieldCheck, Mail, Github, Globe } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface SettingsAppProps {
  onClose?: () => void;
}

export function SettingsApp({ onClose }: SettingsAppProps) {
  return (
    <div className="flex flex-col h-full w-full bg-[#181820] text-zinc-100 rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-white/10">
      {/* Title Bar */}
      <div className="h-10 bg-[#22222C] border-b border-black/40 flex items-center justify-between px-3.5 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80"
              aria-label="Close"
            />
          )}
          <span className="text-xs font-semibold text-white tracking-tight ml-2 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-zinc-400" />
            <span>System Settings — MacBook Pro</span>
          </span>
        </div>
      </div>

      {/* Main Settings Body */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Hardware Identity Card */}
          <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/20 flex items-center justify-center text-3xl shadow-inner">
              💻
            </div>

            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                MacBook Pro 16-inch
              </h2>
              <p className="text-xs font-mono text-zinc-400">
                Chip: Apple M3 Max • 16-core CPU, 40-core GPU
              </p>
              <p className="text-[11px] font-mono text-zinc-500">
                Memory: 128 GB Unified Memory • ShouryaOS 15.1
              </p>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5 text-xs">
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-zinc-400">Architect & Owner</span>
              <span className="font-semibold text-white">{PERSONAL_INFO.name}</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-zinc-400">Primary Role</span>
              <span className="font-semibold text-amber-400">Chief Science Officer @ The Walnut Initiative</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-zinc-400">Academic Certification</span>
              <span className="font-semibold text-emerald-400">IIT Madras AI & Data Science (July 2026)</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-zinc-400">High School Benchmark</span>
              <span className="font-semibold text-white">Class 10 CBSE 97% • Top 1% Nationwide</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-zinc-400">Official Contact</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 underline">
                {PERSONAL_INFO.email}
              </a>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="text-zinc-400">Code Repository</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">
                {PERSONAL_INFO.githubHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
