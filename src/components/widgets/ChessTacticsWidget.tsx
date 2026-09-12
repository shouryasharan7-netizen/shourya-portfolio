"use client";

import React, { useState } from "react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Trophy, RotateCcw, Check, Sparkles, HelpCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface ChessSquare {
  piece: string | null;
  color?: "w" | "b";
  isTarget?: boolean;
}

export function ChessTacticsWidget() {
  // Classic Tactical Puzzle: White Queen on e5 delivers checkmate on g7 (defended by bishop on c3)
  // Simplified 5x5 tactical focus quadrant:
  // e8: Black King (♚), f8: Black Rook (♜), g8: empty, h8: Black Rook (♜)
  // e7: Black Pawn (♟), f7: Black Pawn (♟), g7: Target checkmate square (•)
  // c3: White Bishop (♗), e5: White Queen (♕), f3: White Knight (♘)

  const [hasSolved, setHasSolved] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);

  const handleSquareClick = (squareId: string) => {
    if (hasSolved) return;

    if (squareId === "queen") {
      setSelectedPiece("queen");
      setFeedback("Queen selected! Click the winning target square to deliver mate.");
    } else if (squareId === "target" && selectedPiece === "queen") {
      setHasSolved(true);
      setFeedback("Checkmate! ♕xg7# — Brilliant tactical calculation.");
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#F59E0B", "#38BDF8", "#FFFFFF"],
        });
      } catch {}
    } else if (squareId === "target" && !selectedPiece) {
      setFeedback("Select White's Queen (♕) on e5 first to deliver the winning move.");
    } else {
      setSelectedPiece(null);
      setFeedback("Sub-optimal move. White has an immediate forced checkmate on g7!");
    }
  };

  const resetPuzzle = () => {
    setHasSolved(false);
    setSelectedPiece(null);
    setFeedback(null);
  };

  return (
    <SpotlightCard
      spotlightColor="rgba(245, 158, 11, 0.12)"
      className="p-5 flex flex-col justify-between h-full border border-amber-500/20"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-amber-400">
              ♟
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                3-Year DSO Chess Representation
              </span>
              <h3 className="text-sm font-bold text-white font-sans">
                The Strategist // Tactical Mini-Board
              </h3>
            </div>
          </div>

          <button
            onClick={resetPuzzle}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Reset Board"
            aria-label="Reset Chess Puzzle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 mb-3 font-sans">
          White to move & mate in 1. Select the Queen and strike the critical square:
        </p>

        {/* 4x4 Mini Tactical Grid */}
        <div className="grid grid-cols-4 gap-1 p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 mx-auto max-w-[240px] aspect-square">
          {/* Row 1 (8th rank) */}
          <div className="flex items-center justify-center rounded bg-[#2D2A26] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">e8</span>
          </div>
          <div className="flex items-center justify-center rounded bg-[#1B1917] text-2xl select-none text-zinc-200">
            ♚
          </div>
          <div className="flex items-center justify-center rounded bg-[#2D2A26] text-2xl select-none text-zinc-400">
            ♜
          </div>
          <div className="flex items-center justify-center rounded bg-[#1B1917] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">h8</span>
          </div>

          {/* Row 2 (7th rank) */}
          <div className="flex items-center justify-center rounded bg-[#1B1917] text-2xl select-none text-zinc-300">
            ♟
          </div>
          <div className="flex items-center justify-center rounded bg-[#2D2A26] text-2xl select-none text-zinc-300">
            ♟
          </div>
          <button
            onClick={() => handleSquareClick("target")}
            className={`flex items-center justify-center rounded transition-all text-2xl select-none ${
              hasSolved
                ? "bg-amber-500/30 text-amber-300 ring-2 ring-amber-400"
                : selectedPiece === "queen"
                ? "bg-amber-400/20 text-amber-400 animate-pulse border border-amber-400/40"
                : "bg-[#1B1917] text-zinc-500 hover:bg-zinc-800"
            }`}
            title="Square g7"
          >
            {hasSolved ? "♕" : "•"}
          </button>
          <div className="flex items-center justify-center rounded bg-[#2D2A26] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">h7</span>
          </div>

          {/* Row 3 (6th rank) */}
          <div className="flex items-center justify-center rounded bg-[#2D2A26] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">e6</span>
          </div>
          <div className="flex items-center justify-center rounded bg-[#1B1917] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">f6</span>
          </div>
          <div className="flex items-center justify-center rounded bg-[#2D2A26] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">g6</span>
          </div>
          <div className="flex items-center justify-center rounded bg-[#1B1917] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">h6</span>
          </div>

          {/* Row 4 (5th rank) */}
          <button
            onClick={() => handleSquareClick("queen")}
            className={`flex items-center justify-center rounded transition-all text-2xl select-none ${
              hasSolved
                ? "bg-zinc-900 text-zinc-600"
                : selectedPiece === "queen"
                ? "bg-amber-500 text-black font-bold ring-2 ring-white"
                : "bg-[#1B1917] text-amber-300 hover:scale-105 border border-amber-400/40"
            }`}
            title="White Queen on e5"
          >
            {hasSolved ? "" : "♕"}
          </button>
          <div className="flex items-center justify-center rounded bg-[#2D2A26] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">f5</span>
          </div>
          <div className="flex items-center justify-center rounded bg-[#1B1917] text-2xl select-none text-zinc-300">
            ♘
          </div>
          <div className="flex items-center justify-center rounded bg-[#2D2A26] text-xl select-none">
            <span className="opacity-40 text-xs font-mono text-zinc-600">h5</span>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Banner */}
      <div className="mt-3 pt-2.5 border-t border-zinc-800/80">
        {feedback ? (
          <p
            className={`text-xs font-mono flex items-center gap-1.5 ${
              hasSolved ? "text-emerald-400 font-semibold" : "text-amber-300"
            }`}
          >
            {hasSolved ? <Check className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
            <span>{feedback}</span>
          </p>
        ) : (
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Click White&apos;s ♕ to begin</span>
            <span className="text-amber-400/80">U-19 DSO Player</span>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
