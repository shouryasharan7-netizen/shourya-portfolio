"use client";

import React, { useState } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Edit3, Folder, Search, Sparkles } from "lucide-react";
import { PERSONAL_INFO, ROLES_DATA, EDUCATION_DATA } from "@/data/portfolioData";

interface NotesAppProps {
  onClose?: () => void;
}

export function NotesApp({ onClose }: NotesAppProps) {
  const [selectedNoteId, setSelectedNoteId] = useState<string>("thesis");

  const NOTES = [
    {
      id: "thesis",
      title: "Core Thesis & Problem Space",
      date: "Sep 25, 2026",
      preview: "I don't think in disciplines. I think in problems...",
      content: `I don't think in disciplines. I think in problems.

Too often engineering and science are compartmentalized into artificial silos—hardware vs. software, biology vs. computation, theory vs. operations. Real-world challenges, whether early wildfire detection (Ignicion), decentralized clean water filtration (TGELF Biosand), or pediatric cognitive health (The Walnut Initiative), do not care about academic boundaries.

My goal is to construct first-principles systems that solve urgent physical and computational bottlenecks.`,
    },
    {
      id: "walnut",
      title: "The Walnut Initiative // CSO Log",
      date: "Sep 18, 2026",
      preview: "Directing pedagogical strategy for regional neuroscience...",
      content: `The Walnut Initiative — Chief Science Officer Notebook

1. Directed editorial peer-review pipeline for independent STEM publications and academic whitepapers.
2. Created neuroscience workshop curricula targeted at regional schools across Maharashtra to bridge secondary education and modern cognitive science research.
3. Formatted standardized criteria for technical verification of student research papers.`,
    },
    {
      id: "novel",
      title: "A Soldier's Story // Author's Reflection",
      date: "Aug 12, 2026",
      preview: "Published novella selected from 200,000 national entries...",
      content: `A Soldier's Story — Reflections on Publication

Selected by BriBooks & the National Young Author's Fair as one of the top published works nationwide out of 200,000 competitive student submissions.

The story examines the psychological resilience of an Indian army officer navigating duty, high-altitude trauma, and personal sacrifice in the Siachen snowline. Writing this book reinforced my understanding of narrative pacing, discipline, and emotional precision.`,
    },
  ];

  const currentNote = NOTES.find((n) => n.id === selectedNoteId) || NOTES[0];

  return (
    <div className="flex flex-col h-full w-full bg-[#1E1E26] text-zinc-100 rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-white/10">
      {/* Title Bar */}
      <div className="h-10 bg-[#262632] border-b border-black/40 flex items-center justify-between px-3.5 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80"
              aria-label="Close"
            />
          )}
          <span className="text-xs font-semibold text-white tracking-tight ml-2 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-amber-400" />
            <span>Notes — iCloud</span>
          </span>
        </div>
      </div>

      {/* Main Notes Layout (Sidebar list + Note Body) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Notes List */}
        <div className="w-56 bg-[#181820] border-r border-white/5 flex flex-col p-2 space-y-1 overflow-y-auto">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-2 py-1">
            All Notes ({NOTES.length})
          </span>

          {NOTES.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                setSelectedNoteId(n.id);
                soundEngine.playWindowClick();
              }}
              className={`w-full text-left p-2.5 rounded-lg transition-colors cursor-pointer ${
                selectedNoteId === n.id
                  ? "bg-amber-500/20 border border-amber-500/40 text-white"
                  : "hover:bg-white/5 text-zinc-300 border border-transparent"
              }`}
            >
              <div className="font-semibold text-xs truncate">{n.title}</div>
              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{n.date}</div>
              <div className="text-[11px] text-zinc-400 truncate mt-1">{n.preview}</div>
            </button>
          ))}
        </div>

        {/* Right Note Editor / Viewport */}
        <div className="flex-1 bg-[#1A1A24] p-6 sm:p-8 overflow-y-auto select-text">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] font-mono text-zinc-400">{currentNote.date}</span>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                {currentNote.title}
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap">
              {currentNote.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
