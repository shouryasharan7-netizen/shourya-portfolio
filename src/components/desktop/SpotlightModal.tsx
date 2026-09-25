"use client";

import React, { useState, useEffect, useRef } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Search, FileText, Music, Sparkles, Terminal, Globe, Settings, ArrowRight } from "lucide-react";

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (appId: string) => void;
}

export function SpotlightModal({ isOpen, onClose, onSelectApp }: SpotlightModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const ITEMS = [
    { id: "preview", name: "Preview Resume.pdf", desc: "Official 2-page curriculum vitae", icon: "📄" },
    { id: "chess", name: "Apple Chess (DSO)", desc: "U-19 tournament chess game & puzzle", icon: "♟️" },
    { id: "guitar", name: "Acoustic Guitar Studio", desc: "6-string physical sound synthesis", icon: "🎸" },
    { id: "motocard", name: "3D Stainless Steel Card", desc: "Interactive metallic MOTO card", icon: "💳" },
    { id: "flag", name: "Fluid Ripple Flag", desc: "Cloth wave shader (pensatori-irrazionali)", icon: "🌊" },
    { id: "video", name: "Hobro Cinema Reel", desc: "Agency-grade video hero showcase", icon: "🎬" },
    { id: "safari", name: "Safari Browser", desc: "Inventions & deployed platforms", icon: "🧭" },
    { id: "terminal", name: "Terminal.app", desc: "Developer command-line interface", icon: "💻" },
    { id: "notes", name: "Notes & Thesis", desc: "First-principles research notebook", icon: "📝" },
    { id: "settings", name: "System Settings", desc: "Hardware specs & verified credentials", icon: "⚙️" },
  ];

  const filtered = ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-28 p-4 pointer-events-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-[#181820]/95 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden text-white font-sans"
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search..."
            className="flex-1 bg-transparent text-base sm:text-lg text-white placeholder-zinc-500 outline-none font-sans"
          />
          <kbd className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playWindowClick();
                  onSelectApp(item.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl p-1.5 rounded-lg bg-black/40 border border-white/5">
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-amber-300">
                      {item.name}
                    </div>
                    <div className="text-xs text-zinc-400 font-sans">{item.desc}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-xs font-mono text-zinc-500">
              No matching applications found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
