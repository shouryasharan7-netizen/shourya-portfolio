"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, FastForward, Globe, Volume2, VolumeX, Sparkles } from "lucide-react";

interface AppleHelloIntroProps {
  onComplete: () => void;
  onUnlocking?: () => void;
}

interface GreetingItem {
  text: string;
  lang: string;
  nativeScript: string;
  isCursive?: boolean;
}

const GREETINGS: GreetingItem[] = [
  { text: "hello", lang: "English", nativeScript: "English", isCursive: true },
  { text: "hola", lang: "Spanish", nativeScript: "Español" },
  { text: "bonjour", lang: "French", nativeScript: "Français", isCursive: true },
  { text: "ciao", lang: "Italian", nativeScript: "Italiano", isCursive: true },
  { text: "hallo", lang: "German", nativeScript: "Deutsch" },
  { text: "olá", lang: "Portuguese", nativeScript: "Português", isCursive: true },
  { text: "こんにちは", lang: "Japanese", nativeScript: "日本語" },
  { text: "你好", lang: "Mandarin", nativeScript: "中文" },
  { text: "नमस्ते", lang: "Hindi", nativeScript: "हिन्दी" },
  { text: "안녕하세요", lang: "Korean", nativeScript: "한국어" },
  { text: "مرحبا", lang: "Arabic", nativeScript: "العربية" },
  { text: "வணக்கம்", lang: "Tamil", nativeScript: "தமிழ்" },
  { text: "สวัสดี", lang: "Thai", nativeScript: "ไทย" },
  { text: "স্বাগতম", lang: "Bengali", nativeScript: "বাংলা" },
  { text: "स्वागतम्", lang: "Sanskrit", nativeScript: "संस्कृतम्" },
  { text: "hello", lang: "English", nativeScript: "English", isCursive: true },
];

export function AppleHelloIntro({ onComplete, onUnlocking }: AppleHelloIntroProps) {
  const [index, setIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [dynamicIslandExpanded, setDynamicIslandExpanded] = useState(false);

  const startYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragYRef = useRef(0);

  // Play subtle Apple tactile haptic unlock sound via Web Audio API
  const playAppleHaptic = useCallback(() => {
    if (!audioEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.055);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // AudioContext blocked by browser policy
    }
  }, [audioEnabled]);

  // Execute the official Apple iOS Unlock Sequence
  const handleUnlock = useCallback(() => {
    if (isUnlocking) return;
    setIsUnlocking(true);
    playAppleHaptic();
    
    // Notify parent to start zooming in the portfolio underneath
    if (onUnlocking) {
      onUnlocking();
    }

    setTimeout(() => {
      onComplete();
    }, 650);
  }, [isUnlocking, playAppleHaptic, onUnlocking, onComplete]);

  // Cycle through greetings with Apple's serene 1.8s cadence
  useEffect(() => {
    if (isUnlocking || showLanguagePicker) return;

    const interval = setInterval(() => {
      // Fade out
      setTextVisible(false);

      setTimeout(() => {
        setIndex((prev) => {
          if (prev < GREETINGS.length - 1) {
            return prev + 1;
          } else {
            return 0; // Seamless loop or keep on hello
          }
        });
        // Fade in
        setTextVisible(true);
      }, 320);
    }, 1800);

    return () => clearInterval(interval);
  }, [isUnlocking, showLanguagePicker]);

  // Keyboard shortcut listener: Space, Enter, Escape, or Up Arrow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === "Space" ||
        e.key === "Enter" ||
        e.key === "Escape" ||
        e.key === "ArrowUp"
      ) {
        e.preventDefault();
        handleUnlock();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUnlock]);

  // Touch Gesture Listeners (Real swipe-up to unlock)
  const onTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const currentY = e.touches[0].clientY;
    const diff = startYRef.current - currentY;
    if (diff > 0) {
      dragYRef.current = diff;
      setDragY(diff);
    }
  };

  const onTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (dragYRef.current > 60) {
      handleUnlock();
    } else {
      setDragY(0);
      dragYRef.current = 0;
    }
  };

  // Mouse Drag / Click Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    // Only drag on primary click and if not clicking interactive buttons
    if (e.button !== 0) return;
    startYRef.current = e.clientY;
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const diff = startYRef.current - e.clientY;
    if (diff > 0) {
      dragYRef.current = diff;
      setDragY(diff);
    }
  };

  const onMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (dragYRef.current > 50) {
      handleUnlock();
    } else {
      setDragY(0);
      dragYRef.current = 0;
    }
  };

  const currentGreeting = GREETINGS[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Apple iPhone Welcome Showcase"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={(e) => {
        // If user simply clicked without significant drag, trigger unlock
        if (dragYRef.current < 10) {
          handleUnlock();
        }
      }}
      style={{
        transform: isUnlocking
          ? "translateY(-100%)"
          : dragY > 0
          ? `translateY(-${dragY}px)`
          : "translateY(0)",
        transition: isUnlocking
          ? "transform 0.65s cubic-bezier(0.32, 0.72, 0, 1)"
          : isDragging
          ? "none"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="fixed inset-0 z-[10000] bg-black flex flex-col justify-between select-none cursor-pointer overflow-hidden"
    >
      {/* Subtle OLED Ambient Radial Glow behind the text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* TOP: Apple iPhone 16 Pro Status Bar & Dynamic Island */}
      <div className="relative z-20 w-full pt-3 sm:pt-4 px-6 sm:px-10 flex items-center justify-between text-white pointer-events-auto">
        {/* Left: 9:41 Keynote Time */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm sm:text-base tracking-tight text-white/95">
            9:41
          </span>
        </div>

        {/* Center: iPhone 16 Pro Dynamic Island */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setDynamicIslandExpanded(!dynamicIslandExpanded);
          }}
          className={`h-7 sm:h-8 rounded-full bg-black border border-white/[0.12] shadow-[0_0_20px_rgba(0,0,0,0.95)] flex items-center justify-between px-3 cursor-pointer transition-all duration-300 ease-out hover:border-white/20 ${
            dynamicIslandExpanded
              ? "w-48 sm:w-56 bg-zinc-950"
              : "w-28 sm:w-32"
          }`}
          title="Dynamic Island"
        >
          {/* Camera Lens with dark blue antireflective coating */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#050510] border border-zinc-800 ring-1 ring-blue-900/30 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-blue-500/30" />
            </span>
            {dynamicIslandExpanded && (
              <span className="text-[10px] font-mono text-zinc-400">
                Shourya OS
              </span>
            )}
          </div>

          {/* Right Island Status or Micro Waveform */}
          <div className="flex items-center gap-1">
            {dynamicIslandExpanded ? (
              <span className="flex items-center gap-1 text-[10px] text-amber-400 font-mono">
                <Sparkles className="w-3 h-3" />
                <span>Ready</span>
              </span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            )}
          </div>
        </div>

        {/* Right: Cellular, 5G, Battery & Skip Tool */}
        <div className="flex items-center gap-3">
          {/* Cellular 4-bars */}
          <div className="hidden xs:flex items-end gap-[2px] h-3">
            <span className="w-[3px] h-1.5 bg-white rounded-xs" />
            <span className="w-[3px] h-2 bg-white rounded-xs" />
            <span className="w-[3px] h-2.5 bg-white rounded-xs" />
            <span className="w-[3px] h-3 bg-white rounded-xs" />
          </div>

          {/* 5G Badge */}
          <span className="hidden xs:inline text-[11px] font-bold text-white tracking-tighter">
            5G
          </span>

          {/* iOS Battery Glyph with 100% Green Fill */}
          <div className="flex items-center gap-[1px]">
            <div className="w-5 h-2.5 rounded-[3px] border border-white/80 p-[1.5px] flex items-center">
              <div className="w-full h-full bg-[#34C759] rounded-[1px]" />
            </div>
            <div className="w-[1px] h-1 bg-white/60 rounded-r-xs" />
          </div>

          {/* Sound Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAudioEnabled(!audioEnabled);
            }}
            className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors focus:outline-none"
            title={audioEnabled ? "Mute haptic sound" : "Enable haptic sound"}
            aria-label="Toggle sound"
          >
            {audioEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-zinc-600" />
            )}
          </button>

          {/* Skip Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUnlock();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-[11px] font-mono transition-all focus:outline-none"
            aria-label="Skip to portfolio"
          >
            <span>Skip</span>
            <FastForward className="w-3 h-3 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* CENTER: The Iconic Apple Multilingual Greetings Showcase */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto min-h-[220px] px-4">
        {/* Animated Greeting Container with Apple Deceleration Curve */}
        <div
          key={index}
          style={{
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className={`text-center flex flex-col items-center ${
            textVisible
              ? "opacity-100 scale-100 filter-none translate-y-0"
              : "opacity-0 scale-[0.96] filter blur-md -translate-y-4"
          }`}
        >
          {currentGreeting.isCursive ? (
            /* Iconic 1984 / 2021 Apple Cursive Calligraphy */
            <span className="font-yellowtail text-7xl sm:text-8xl md:text-9xl tracking-normal text-white drop-shadow-[0_0_45px_rgba(255,255,255,0.45)] select-none">
              {currentGreeting.text}
            </span>
          ) : (
            /* Clean Apple Display Typography */
            <span className="font-sans font-light text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none drop-shadow-[0_0_45px_rgba(255,255,255,0.4)] select-none">
              {currentGreeting.text}
            </span>
          )}

          {/* Discreet Language Indicator */}
          <div className="mt-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
              {currentGreeting.nativeScript} ({currentGreeting.lang})
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM: Shimmering "Swipe up to open" & iOS Home Indicator Bar */}
      <div className="relative z-20 w-full pb-8 sm:pb-10 flex flex-col items-center gap-3 pointer-events-auto">
        {/* Apple's Iconic Specular Shimmer "Swipe up to open" Text */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <ChevronUp className="w-4 h-4 text-white/70 animate-bounce" />
          <span className="apple-shimmer-text text-sm sm:text-base font-normal tracking-wide">
            Swipe up to open
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">
            or click anywhere • press Space
          </span>
        </div>

        {/* The iOS Home Indicator Pill Bar */}
        <div
          className="w-36 sm:w-44 h-1.5 rounded-full bg-white/75 hover:bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleUnlock();
          }}
        />

        {/* Apple Language Selector Pill (Bottom Right Floating) */}
        <div className="absolute right-6 bottom-8 sm:bottom-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowLanguagePicker(!showLanguagePicker);
            }}
            className="p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white transition-all shadow-lg focus:outline-none"
            title="Choose language"
            aria-label="Choose language"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>

        {/* Language Quick-Picker Overlay Sheet */}
        {showLanguagePicker && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-20 right-6 z-30 w-64 max-h-72 overflow-y-auto bg-zinc-950/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl flex flex-col gap-1"
          >
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 border-b border-zinc-800/80 mb-1">
              Select Language
            </div>
            {GREETINGS.slice(0, 15).map((g, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  setTextVisible(true);
                  setShowLanguagePicker(false);
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-sans transition-colors ${
                  index === i
                    ? "bg-white text-black font-semibold"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <span>{g.nativeScript}</span>
                <span className="text-[10px] opacity-70 font-mono">
                  {g.lang}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
