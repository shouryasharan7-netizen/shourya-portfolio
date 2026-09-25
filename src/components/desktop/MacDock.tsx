"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { soundEngine } from "@/components/audio/SoundEffects";

export interface DockItem {
  id: string;
  name: string;
  iconSrc: string;
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
      iconSrc: "/icons/mac/finder.png",
      isOpen: openAppIds.includes("finder"),
    },
    {
      id: "preview",
      name: "Preview (Shourya_Resume.pdf)",
      iconSrc: "/icons/mac/preview.png",
      isOpen: openAppIds.includes("preview"),
      isSpecial: true,
    },
    {
      id: "safari",
      name: "Safari (Projects & Lab)",
      iconSrc: "/icons/mac/safari.png",
      isOpen: openAppIds.includes("safari"),
    },
    {
      id: "chrome",
      name: "Google Chrome",
      iconSrc: "/icons/mac/chrome.png",
      isOpen: openAppIds.includes("chrome"),
    },
    {
      id: "guitar",
      name: "GarageBand (Acoustic Studio)",
      iconSrc: "/icons/mac/garageband.png",
      isOpen: openAppIds.includes("guitar"),
      isSpecial: true,
    },
    {
      id: "chess",
      name: "Chess (U-19 DSO Engine)",
      iconSrc: "/icons/mac/chess.png",
      isOpen: openAppIds.includes("chess"),
      isSpecial: true,
    },
    {
      id: "motocard",
      name: "Wallet (316L Stainless Card)",
      iconSrc: "/icons/mac/wallet.png",
      isOpen: openAppIds.includes("motocard"),
      isSpecial: true,
    },
    {
      id: "flag",
      name: "Grapher (Liquid Silk Shader)",
      iconSrc: "/icons/mac/grapher.png",
      isOpen: openAppIds.includes("flag"),
      isSpecial: true,
    },
    {
      id: "terminal",
      name: "Terminal (zsh)",
      iconSrc: "/icons/mac/terminal.png",
      isOpen: openAppIds.includes("terminal"),
    },
    {
      id: "notes",
      name: "Notes (Engineering Logs)",
      iconSrc: "/icons/mac/notes.png",
      isOpen: openAppIds.includes("notes"),
    },
    {
      id: "photos",
      name: "Photos & Honors",
      iconSrc: "/icons/mac/photos.png",
      isOpen: openAppIds.includes("photos"),
    },
    {
      id: "messages",
      name: "Messages",
      iconSrc: "/icons/mac/messages.png",
      isOpen: openAppIds.includes("messages"),
    },
    {
      id: "mail",
      name: "Mail (Contact Shourya)",
      iconSrc: "/icons/mac/mail.png",
      isOpen: openAppIds.includes("mail"),
    },
    {
      id: "settings",
      name: "System Settings",
      iconSrc: "/icons/mac/settings.png",
      badge: 1,
      isOpen: openAppIds.includes("settings"),
    },
    {
      id: "appstore",
      name: "App Store (Tech Stack)",
      iconSrc: "/icons/mac/appstore.png",
      isOpen: openAppIds.includes("appstore"),
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      iconSrc: "/icons/mac/chatgpt.png",
      isOpen: openAppIds.includes("chatgpt"),
    },
    {
      id: "claude",
      name: "Claude AI",
      iconSrc: "/icons/mac/claude.png",
      isOpen: openAppIds.includes("claude"),
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      iconSrc: "/icons/mac/whatsapp.png",
      badge: 49,
      isOpen: openAppIds.includes("whatsapp"),
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
    <div className="fixed bottom-2 left-0 right-0 z-50 flex justify-center pointer-events-none px-2">
      {/* Ambient Glass Dock Shelf */}
      <div className="relative pointer-events-auto">
        {/* Subtle Ambient Underglow */}
        <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-red-600/20 via-amber-500/20 to-red-600/20 blur-xl opacity-70 pointer-events-none" />

        {/* Authentic Glass Shelf */}
        <div
          ref={dockRef}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative flex items-end gap-1.5 sm:gap-2 px-3 py-2 rounded-[24px] bg-[#14141A]/75 backdrop-blur-3xl border border-white/[0.15] shadow-[0_16px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(255,255,255,0.05)] max-w-full overflow-x-auto scrollbar-none transition-all"
        >
          {DOCK_ITEMS.map((item, index) => {
            // macOS Parabolic Magnification curve
            let scale = 1;
            if (hoveredIndex !== null) {
              const distance = Math.abs(hoveredIndex - index);
              if (distance === 0) scale = 1.38;
              else if (distance === 1) scale = 1.2;
              else if (distance === 2) scale = 1.08;
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
                    ? "translateY(-18px) scale(1.25)"
                    : `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 16 : 0}px)`,
                  transition: isBouncing
                    ? "transform 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                    : "transform 0.16s cubic-bezier(0.2, 0.8, 0.4, 1)",
                }}
                className="relative group flex flex-col items-center cursor-pointer select-none py-0.5 flex-shrink-0"
              >
                {/* Tooltip Bubble */}
                {hoveredIndex === index && (
                  <div className="absolute -top-10 px-2.5 py-1 rounded-md bg-[#16161E]/95 border border-white/20 text-white text-[11px] font-sans font-medium whitespace-nowrap shadow-2xl pointer-events-none z-50 filter drop-shadow">
                    {item.name}
                  </div>
                )}

                {/* Original macOS App Icon */}
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <Image
                    src={item.iconSrc}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] select-none pointer-events-none"
                    priority
                  />

                  {/* Notification Badge */}
                  {item.badge !== undefined && (
                    <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF3B30] border border-white/60 text-white text-[10px] font-bold flex items-center justify-center shadow-lg font-mono">
                      {item.badge}
                    </div>
                  )}
                </div>

                {/* Active Running App Dot Indicator */}
                <div className="h-1 mt-1 flex items-center justify-center">
                  {item.isOpen && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/95 shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                  )}
                </div>
              </div>
            );
          })}

          {/* Dock Separator Bar */}
          <div className="w-[1px] h-9 bg-white/20 mx-1 self-center rounded-full" />

          {/* Trash Icon */}
          <div
            onMouseEnter={() => {
              setHoveredIndex(DOCK_ITEMS.length);
              soundEngine.playDockTick();
            }}
            onClick={() => {
              soundEngine.playWindowClick();
              alert("Trash is empty — Clean Architecture preserved.");
            }}
            style={{
              transform:
                hoveredIndex === DOCK_ITEMS.length
                  ? "scale(1.35) translateY(-6px)"
                  : "scale(1)",
              transition: "transform 0.16s cubic-bezier(0.2, 0.8, 0.4, 1)",
            }}
            className="relative group flex flex-col items-center cursor-pointer select-none py-0.5 flex-shrink-0"
          >
            {hoveredIndex === DOCK_ITEMS.length && (
              <div className="absolute -top-10 px-2.5 py-1 rounded-md bg-[#16161E]/95 border border-white/20 text-white text-[11px] font-sans font-medium whitespace-nowrap shadow-2xl pointer-events-none z-50">
                Trash
              </div>
            )}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <Image
                src="/icons/mac/trash.png"
                alt="Trash"
                width={48}
                height={48}
                className="w-full h-full object-contain filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] select-none pointer-events-none"
              />
            </div>
            <div className="h-1 mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
