"use client";

import React, { useState, useRef } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";

export interface DockItem {
  id: string;
  name: string;
  icon: string | React.ReactNode;
  badge?: number;
  isOpen: boolean;
  isSpecial?: boolean;
}

interface MacDockProps {
  openAppIds: string[];
  onOpenApp: (appId: string) => void;
}

export function MacDock({ openAppIds, onOpenApp }: MacDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bouncingAppId, setBouncingAppId] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const DOCK_ITEMS: DockItem[] = [
    {
      id: "finder",
      name: "Finder",
      icon: "📁",
      isOpen: openAppIds.includes("finder"),
    },
    {
      id: "preview",
      name: "Preview (Resume.pdf)",
      icon: "🔍",
      isOpen: openAppIds.includes("preview"),
      isSpecial: true,
    },
    {
      id: "safari",
      name: "Safari",
      icon: "🧭",
      isOpen: openAppIds.includes("safari"),
    },
    {
      id: "chrome",
      name: "Google Chrome",
      icon: "🌐",
      isOpen: openAppIds.includes("chrome"),
    },
    {
      id: "guitar",
      name: "Acoustic Guitar Studio",
      icon: "🎸",
      isOpen: openAppIds.includes("guitar"),
      isSpecial: true,
    },
    {
      id: "chess",
      name: "Apple Chess (DSO)",
      icon: "♟️",
      isOpen: openAppIds.includes("chess"),
      isSpecial: true,
    },
    {
      id: "motocard",
      name: "3D Stainless Steel Card",
      icon: "💳",
      isOpen: openAppIds.includes("motocard"),
      isSpecial: true,
    },
    {
      id: "maps",
      name: "Maps (Nagpur, India)",
      icon: "🗺️",
      isOpen: openAppIds.includes("maps"),
    },
    {
      id: "photos",
      name: "Photos & Honors",
      icon: "🖼️",
      isOpen: openAppIds.includes("photos"),
    },
    {
      id: "notes",
      name: "Notes & Thesis",
      icon: "📝",
      isOpen: openAppIds.includes("notes"),
    },
    {
      id: "numbers",
      name: "Numbers (Metrics)",
      icon: "📊",
      isOpen: openAppIds.includes("numbers"),
    },
    {
      id: "keynote",
      name: "Keynote (Inventions)",
      icon: "💡",
      isOpen: openAppIds.includes("keynote"),
    },
    {
      id: "settings",
      name: "System Settings",
      icon: "⚙️",
      badge: 1,
      isOpen: openAppIds.includes("settings"),
    },
    {
      id: "appstore",
      name: "App Store (Tech Stack)",
      icon: "🛍️",
      isOpen: openAppIds.includes("appstore"),
    },
    {
      id: "whatsapp",
      name: "WhatsApp (Contact)",
      icon: "💬",
      badge: 49,
      isOpen: openAppIds.includes("whatsapp"),
    },
    {
      id: "terminal",
      name: "Terminal",
      icon: "💻",
      isOpen: openAppIds.includes("terminal"),
    },
    {
      id: "chatgpt",
      name: "ChatGPT AI",
      icon: "🤖",
      isOpen: openAppIds.includes("chatgpt"),
    },
    {
      id: "audio",
      name: "Music (HIMYM OST)",
      icon: "🎵",
      isOpen: openAppIds.includes("audio"),
    },
    {
      id: "trash",
      name: "Trash",
      icon: "🗑️",
      isOpen: false,
    },
  ];

  const handleItemClick = (item: DockItem) => {
    soundEngine.playDockTick();
    setBouncingAppId(item.id);
    setTimeout(() => {
      setBouncingAppId(null);
      soundEngine.playAppLaunch();
      onOpenApp(item.id);
    }, 450);
  };

  return (
    <div className="fixed bottom-2.5 left-0 right-0 z-50 flex justify-center pointer-events-none px-2">
      {/* Red/Crimson Ambient Underglow as in screenshot */}
      <div className="relative pointer-events-auto">
        {/* Glow backdrop matching user's red dock bar */}
        <div className="absolute -inset-1.5 rounded-[26px] bg-gradient-to-r from-red-600/30 via-red-500/40 to-red-700/30 blur-xl opacity-80 pointer-events-none" />

        {/* Translucent Glass Dock Shelf */}
        <div
          ref={dockRef}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative flex items-end gap-1.5 sm:gap-2 px-3 py-2 rounded-[22px] bg-[#16080B]/80 backdrop-blur-2xl border border-red-500/30 shadow-[0_12px_45px_rgba(220,38,38,0.35),0_0_25px_rgba(185,28,28,0.2)] max-w-full overflow-x-auto scrollbar-none transition-all"
        >
          {DOCK_ITEMS.map((item, index) => {
            // Parabolic magnification effect on hover
            let scale = 1;
            if (hoveredIndex !== null) {
              const distance = Math.abs(hoveredIndex - index);
              if (distance === 0) scale = 1.35;
              else if (distance === 1) scale = 1.18;
              else if (distance === 2) scale = 1.07;
            }

            const isBouncing = bouncingAppId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  soundEngine.playDockTick();
                }}
                onClick={() => handleItemClick(item)}
                style={{
                  transform: isBouncing
                    ? "translateY(-16px) scale(1.2)"
                    : `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 14 : 0}px)`,
                  transition: isBouncing
                    ? "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    : "transform 0.16s cubic-bezier(0.2, 0.8, 0.4, 1)",
                }}
                className="relative group flex flex-col items-center cursor-pointer select-none py-0.5 flex-shrink-0"
              >
                {/* Tooltip Label */}
                {hoveredIndex === index && (
                  <div className="absolute -top-9 px-2.5 py-1 rounded-md bg-[#16161D]/95 border border-white/15 text-white text-[11px] font-sans font-medium whitespace-nowrap shadow-xl pointer-events-none z-50">
                    {item.name}
                  </div>
                )}

                {/* App Icon Container */}
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-lg sm:text-2xl shadow-md transition-shadow relative overflow-hidden ${
                    item.isSpecial
                      ? "ring-1 ring-amber-400/40 bg-gradient-to-b from-zinc-800 to-zinc-900"
                      : "bg-gradient-to-b from-white/10 to-white/5 border border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="drop-shadow-sm">{item.icon}</span>

                  {/* Specular glass sheen highlight */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent pointer-events-none" />

                  {/* Notification Badge (e.g. Settings: 1, WhatsApp: 49) */}
                  {item.badge !== undefined && (
                    <div className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-500 border border-white/40 text-white text-[9px] font-bold flex items-center justify-center shadow-lg font-mono">
                      {item.badge}
                    </div>
                  )}
                </div>

                {/* Active Running App Dot Indicator */}
                <div className="h-1 mt-1 flex items-center justify-center">
                  {item.isOpen && (
                    <span className="w-1 h-1 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
