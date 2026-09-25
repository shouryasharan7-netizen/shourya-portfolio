"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import {
  Wifi,
  Battery,
  Search,
  Sliders,
  Sparkles,
  Command,
  Moon,
  Sun,
  Volume2,
  X,
  Check,
} from "lucide-react";

interface MacMenuBarProps {
  activeAppTitle: string;
  onOpenApp: (appId: string) => void;
  onToggleControlCenter: () => void;
  onOpenSpotlight: () => void;
}

export function MacMenuBar({
  activeAppTitle = "Finder",
  onOpenApp,
  onToggleControlCenter,
  onOpenSpotlight,
}: MacMenuBarProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [batteryLevel] = useState(98);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(now.toLocaleString("en-US", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 h-7 z-50 bg-[#09090D]/75 backdrop-blur-2xl border-b border-white/[0.08] flex items-center justify-between px-3 select-none text-white text-xs font-sans shadow-sm"
    >
      {/* Left Menu Items: Apple Logo + Dynamic App Menu */}
      <div className="flex items-center gap-4">
        {/* Apple Logo Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setAppleMenuOpen(!appleMenuOpen);
              soundEngine.playWindowClick();
            }}
            className="p-1 rounded hover:bg-white/10 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
            aria-label="Apple Menu"
          >
            {/* Apple Silhouette SVG */}
            <svg
              className="w-3.5 h-3.5 fill-current text-white/95"
              viewBox="0 0 170 170"
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.71-7.92-12.02-14.52-5.74-8.8-10.22-18.73-13.43-28.79-3.21-10.05-4.82-19.98-4.82-29.77 0-14.73 3.79-26.68 11.38-35.85 7.58-9.17 16.94-13.88 28.08-14.13 4.89 0 10.33 1.25 16.32 3.75 5.99 2.5 9.77 3.82 11.33 3.96 1.25-.14 5.25-1.52 12.01-4.14 6.76-2.62 12.56-3.8 17.4-3.53 13.06.82 23.36 5.66 30.91 14.52-11.44 6.94-17.04 16.5-16.79 28.68.25 9.8 4.09 17.97 11.53 24.52 7.44 6.54 16.27 10.15 26.49 10.83-2.3 7.37-5.27 15.17-8.91 23.41zM119.22 31.74c0-7.72 2.76-14.89 8.27-21.52 5.51-6.62 12.27-10.22 20.29-10.22.13 1.08.19 2.04.19 2.87 0 7.61-2.91 14.85-8.73 21.72-5.82 6.87-12.63 10.53-20.43 10.97-.08-1.28-.12-2.55-.12-3.82z" />
            </svg>
          </button>

          {/* Apple Dropdown Menu */}
          {appleMenuOpen && (
            <div
              onClick={() => setAppleMenuOpen(false)}
              className="absolute left-0 top-7 w-56 rounded-lg bg-[#141419]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-1 z-50 text-xs font-sans text-zinc-200"
            >
              <div className="px-3 py-1.5 font-semibold text-white border-b border-white/[0.08] mb-1">
                About Shourya Sharan
              </div>
              <button
                onClick={() => onOpenApp("preview")}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
              >
                <span>Preview Resume.pdf</span>
                <span className="text-[10px] font-mono text-zinc-400">⌘O</span>
              </button>
              <button
                onClick={() => onOpenApp("chess")}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
              >
                <span>Play Apple Chess</span>
                <span className="text-[10px] font-mono text-zinc-400">DSO</span>
              </button>
              <button
                onClick={() => onOpenApp("guitar")}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
              >
                <span>Hanging Guitar Studio</span>
                <span className="text-[10px] font-mono text-zinc-400">6-Str</span>
              </button>
              <button
                onClick={() => onOpenApp("motocard")}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 flex items-center justify-between"
              >
                <span>3D Stainless Steel Card</span>
                <span className="text-[10px] font-mono text-zinc-400">MOTO</span>
              </button>
              <div className="my-1 border-t border-white/[0.08]" />
              <button
                onClick={() => onOpenApp("settings")}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10"
              >
                System Settings...
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-white/10 text-red-400"
              >
                Restart Session...
              </button>
            </div>
          )}
        </div>

        {/* Active Application Name */}
        <span className="font-semibold text-white tracking-tight">
          {activeAppTitle}
        </span>

        {/* Dynamic Contextual Menus */}
        <nav aria-label="Application Menu" className="hidden sm:flex items-center gap-3.5 text-zinc-300">
          <button
            onClick={() => onOpenApp("preview")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            File
          </button>
          <button
            onClick={() => onOpenApp("terminal")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onOpenApp("motocard")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            View
          </button>
          <button
            onClick={() => onOpenApp("chess")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Window
          </button>
          <button
            onClick={() => onOpenApp("notes")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Help
          </button>
        </nav>
      </div>

      {/* Right Menu Items: Status Icons + Date/Time */}
      <div className="flex items-center gap-3 text-zinc-300">
        {/* Battery with 98% percentage */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300">
          <span className="hidden xs:inline">{batteryLevel}%</span>
          <div className="w-5 h-2.5 rounded-[3px] border border-white/70 p-[1.5px] flex items-center">
            <div className="w-full h-full bg-emerald-500 rounded-[1px]" />
          </div>
        </div>

        {/* Wi-Fi Icon */}
        <div title="Wi-Fi: Connected to Shourya-Fiber (5GHz)">
          <Wifi className="w-3.5 h-3.5 text-white/90" />
        </div>

        {/* Spotlight Search (Cmd + K) */}
        <button
          onClick={() => {
            onOpenSpotlight();
            soundEngine.playWindowClick();
          }}
          className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer text-zinc-300 hover:text-white"
          title="Spotlight Search (⌘K)"
          aria-label="Spotlight Search"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center Toggle */}
        <button
          onClick={() => {
            onToggleControlCenter();
            soundEngine.playWindowClick();
          }}
          className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer text-zinc-300 hover:text-white"
          title="Control Center"
          aria-label="Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Siri Icon */}
        <div
          title="Siri"
          className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-amber-400 flex items-center justify-center opacity-90 shadow-sm"
        >
          <Sparkles className="w-2 h-2 text-white" />
        </div>

        {/* Live Date & Time */}
        <span className="text-[11px] font-sans font-medium text-white/95 whitespace-nowrap ml-1">
          {currentTime || "Fri Sep 25 11:15 PM"}
        </span>
      </div>
    </header>
  );
}
