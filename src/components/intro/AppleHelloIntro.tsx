"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, FastForward } from "lucide-react";

interface AppleHelloIntroProps {
  onComplete: () => void;
}

interface Greeting {
  text: string;
  lang: string;
  isCursive?: boolean;
}

const GREETINGS: Greeting[] = [
  { text: "hello", lang: "English", isCursive: true },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "bonjour", lang: "French", isCursive: true },
  { text: "hola", lang: "Spanish" },
  { text: "ciao", lang: "Italian", isCursive: true },
  { text: "こんにちは", lang: "Japanese" },
  { text: "olá", lang: "Portuguese", isCursive: true },
  { text: "hallo", lang: "German" },
  { text: "你好", lang: "Mandarin" },
  { text: "안녕하세요", lang: "Korean" },
  { text: "مرحبا", lang: "Arabic" },
  { text: "स्वागतम्", lang: "Sanskrit" },
  { text: "hello", lang: "English", isCursive: true },
];

export function AppleHelloIntro({ onComplete }: AppleHelloIntroProps) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  // Cycle through greetings with Apple-style smooth tempo
  useEffect(() => {
    if (isExiting) return;

    const timer = setInterval(() => {
      // Step 1: Smooth fade & blur out current word
      setTextVisible(false);

      setTimeout(() => {
        setIndex((prev) => {
          if (prev < GREETINGS.length - 1) {
            return prev + 1;
          } else {
            // Once the full cycle finishes, auto-transition into portfolio
            handleFinish();
            return prev;
          }
        });
        // Step 2: Smooth fade & clarify in next word
        setTextVisible(true);
      }, 350);
    }, 1400);

    return () => clearInterval(timer);
  }, [isExiting]);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  // Keyboard shortcut listener: Space, Enter, or Escape dismisses immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentGreeting = GREETINGS[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Introduction"
      onClick={handleFinish}
      className={`fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-between p-8 select-none cursor-pointer transition-all duration-700 ease-out ${
        isExiting
          ? "opacity-0 scale-105 filter blur-xl pointer-events-none"
          : "opacity-100 scale-100 filter-none pointer-events-auto"
      }`}
    >
      {/* Top Bar: Discreet Skip Button */}
      <div className="w-full max-w-5xl flex items-center justify-between text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" />
          <span className="tracking-wider uppercase text-[10px]">
            {currentGreeting.lang}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all text-xs focus:outline-none"
          aria-label="Skip intro to portfolio"
        >
          <span>Skip</span>
          <FastForward className="w-3 h-3" />
        </button>
      </div>

      {/* Center: The Iconic Apple "Hello" Text */}
      <div className="relative flex flex-col items-center justify-center my-auto min-h-[160px]">
        <div
          className={`transition-all duration-500 ease-out transform text-center ${
            textVisible
              ? "opacity-100 scale-100 filter-none translate-y-0"
              : "opacity-0 scale-95 filter blur-md -translate-y-2"
          }`}
        >
          <span
            className={`block text-6xl sm:text-8xl md:text-9xl text-white tracking-tight leading-none drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] ${
              currentGreeting.isCursive
                ? "font-serif italic font-normal tracking-wide"
                : "font-sans font-light"
            }`}
          >
            {currentGreeting.text}
          </span>
        </div>
      </div>

      {/* Bottom: Apple Home Indicator & Click/Swipe Prompt */}
      <div className="w-full flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-1.5 text-zinc-500 text-[11px] font-mono tracking-widest uppercase animate-bounce">
          <ChevronUp className="w-4 h-4 text-zinc-400" />
          <span>Click or press Space to enter</span>
        </div>

        {/* Apple iOS Style Home Indicator Bar */}
        <div className="w-36 h-1 rounded-full bg-zinc-700/80 hover:bg-white transition-colors" />
      </div>
    </div>
  );
}
