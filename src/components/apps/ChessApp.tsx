"use client";

import React, { useState } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import confetti from "canvas-confetti";
import { RotateCcw, Trophy, Award, Sparkles, CheckCircle2 } from "lucide-react";

interface ChessAppProps {
  onClose?: () => void;
}

type Piece = string | null;

export function ChessApp({ onClose }: ChessAppProps) {
  // 8x8 board representation initialized with a tactical DSO puzzle position: White to play and mate in 1
  // Tactical position: White Queen on f6, White Bishop on c4, White King on g1, Black King on g8, Black Pawn on h7/f7
  const initialBoard: Piece[][] = [
    ["♜", null, "♝", "♛", "♚", null, null, "♜"], // 8: Black backrank
    ["♟", "♟", "♟", null, null, "♟", null, "♟"], // 7: g7 is open target!
    [null, null, "♞", null, null, null, "♟", null], // 6
    [null, null, null, "♟", "♟", null, null, null], // 5
    [null, null, "♗", null, null, null, null, null], // 4: White Bishop eyeing f7/g8
    [null, null, null, null, null, "♕", null, null], // 3: Queen on f3 -> moves to g7#
    ["♙", "♙", "♙", null, null, "♙", "♙", "♙"], // 2
    ["♖", "♘", "♗", null, "♔", null, "♘", "♖"], // 1
  ];

  const [board, setBoard] = useState<Piece[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [isMate, setIsMate] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("White to move • Mate in 1 (Queen attack)");

  const handleSquareClick = (r: number, c: number) => {
    soundEngine.playChessMove();

    // If already checkmated
    if (isMate) return;

    // If Queen on [5, 5] is selected, and clicking on [1, 6] (which is g7) -> MATE IN 1!
    if (selectedSquare && selectedSquare[0] === 5 && selectedSquare[1] === 5 && r === 1 && c === 6) {
      const newBoard = board.map((row) => [...row]);
      newBoard[1][6] = "♕";
      newBoard[5][5] = null;
      setBoard(newBoard);
      setSelectedSquare(null);
      setIsMate(true);
      setMoveCount(1);
      setStatusMessage("CHECKMATE! ♕xg7# • DSO Tournament Victory");

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#F59E0B", "#38BDF8", "#FFFFFF", "#10B981"],
      });
      return;
    }

    // Selecting White Queen
    if (r === 5 && c === 5) {
      setSelectedSquare([r, c]);
      setStatusMessage("Queen selected: Click g7 to execute checkmate!");
      return;
    }

    // Deselect or general select
    if (selectedSquare) {
      setSelectedSquare(null);
      setStatusMessage("White to move • Find the checkmate on g7");
    } else if (board[r][c]) {
      setSelectedSquare([r, c]);
    }
  };

  const handleReset = () => {
    soundEngine.playChessMove();
    setBoard(initialBoard);
    setSelectedSquare(null);
    setIsMate(false);
    setMoveCount(0);
    setStatusMessage("White to move • Mate in 1 (Queen attack)");
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#18181F] text-zinc-200 rounded-lg overflow-hidden select-none font-sans shadow-2xl border border-white/10">
      {/* Title Bar */}
      <div className="h-10 bg-[#252530] border-b border-black/40 flex items-center justify-between px-3.5 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80"
              aria-label="Close"
            />
          )}
          <span className="text-xs font-semibold text-white tracking-tight ml-2 flex items-center gap-1.5">
            <span>♟️</span>
            <span>Apple Chess — U-19 DSO Strategic Engine</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Chess Arena */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-center gap-6 overflow-y-auto">
        {/* 8x8 Wooden Tournament Board */}
        <div className="relative p-3 rounded-xl bg-gradient-to-b from-[#3D2517] to-[#25150C] shadow-2xl border-4 border-[#5A3822]">
          <div className="grid grid-cols-8 grid-rows-8 w-72 h-72 sm:w-88 sm:h-88 border border-black/60 shadow-inner">
            {board.map((row, r) =>
              row.map((piece, c) => {
                const isDark = (r + c) % 2 === 1;
                const isSelected = selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c;
                const isTarget = selectedSquare && selectedSquare[0] === 5 && selectedSquare[1] === 5 && r === 1 && c === 6;

                return (
                  <div
                    key={`${r}-${c}`}
                    onClick={() => handleSquareClick(r, c)}
                    className={`relative flex items-center justify-center cursor-pointer transition-colors ${
                      isDark ? "bg-[#B58863]" : "bg-[#F0D9B5]"
                    } ${isSelected ? "ring-4 ring-amber-400 z-10" : ""}`}
                  >
                    {/* Legal move target dot */}
                    {isTarget && (
                      <span className="w-3.5 h-3.5 rounded-full bg-red-600/90 animate-ping absolute z-20 shadow-lg" />
                    )}

                    {/* Chess Piece Symbol */}
                    {piece && (
                      <span
                        className={`text-2xl sm:text-3xl select-none filter drop-shadow ${
                          piece === "♕" || piece === "♗" || piece === "♔" || piece === "♖" || piece === "♘" || piece === "♙"
                            ? "text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                            : "text-zinc-950 font-bold"
                        }`}
                      >
                        {piece}
                      </span>
                    )}

                    {/* Coordinates on edge */}
                    {c === 0 && (
                      <span
                        className={`absolute top-0.5 left-1 text-[8px] font-mono ${
                          isDark ? "text-[#F0D9B5]" : "text-[#B58863]"
                        }`}
                      >
                        {8 - r}
                      </span>
                    )}
                    {r === 7 && (
                      <span
                        className={`absolute bottom-0.5 right-1 text-[8px] font-mono ${
                          isDark ? "text-[#F0D9B5]" : "text-[#B58863]"
                        }`}
                      >
                        {String.fromCharCode(97 + c)}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Info & DSO Credentials */}
        <div className="flex flex-col gap-3 max-w-xs w-full">
          <div className="bg-[#121217] p-4 rounded-xl border border-white/10 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>DSO CHESS QUALIFICATION</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Represented school for 3 consecutive years in the U-19 DSO Chess Championship. Trained in calculating multi-ply tactical combinations under competitive clock pressure.
            </p>
          </div>

          <div
            className={`p-3.5 rounded-xl border transition-all ${
              isMate
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                : "bg-white/5 border-white/10 text-zinc-200"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold">
              {isMate ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Sparkles className="w-4 h-4 text-sky-400" />
              )}
              <span>{statusMessage}</span>
            </div>
            <div className="mt-2 text-[11px] font-mono text-zinc-400 flex justify-between">
              <span>Moves: {moveCount}</span>
              <span>Target: ♕xg7#</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 bg-black/30 p-2.5 rounded-lg border border-white/5">
            💡 <strong>Hint:</strong> Select the White Queen at <code>f3</code>, then click the Black square at <code>g7</code> beside the King to deliver checkmate!
          </div>
        </div>
      </div>
    </div>
  );
}
