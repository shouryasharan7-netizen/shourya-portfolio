"use client";

import React, { useState, useEffect } from "react";
import { EraPreloader } from "@/components/intro/EraPreloader";
import { LiveWallpaper, WallpaperTheme } from "@/components/desktop/LiveWallpaper";
import { MacMenuBar } from "@/components/desktop/MacMenuBar";
import { MacDock } from "@/components/desktop/MacDock";
import { MacWindow } from "@/components/desktop/MacWindow";
import { ControlCenter } from "@/components/desktop/ControlCenter";
import { SpotlightModal } from "@/components/desktop/SpotlightModal";
import { DesktopHangingGuitar } from "@/components/desktop/DesktopHangingGuitar";

// Native macOS Applications
import { PreviewApp } from "@/components/apps/PreviewApp";
import { HangingGuitar } from "@/components/apps/HangingGuitar";
import { ChessApp } from "@/components/apps/ChessApp";
import { MotoCard3D } from "@/components/apps/MotoCard3D";
import { RippleFlagCanvas } from "@/components/apps/RippleFlagCanvas";
import { VideoHeroApp } from "@/components/apps/VideoHeroApp";
import { SafariApp } from "@/components/apps/SafariApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { NotesApp } from "@/components/apps/NotesApp";
import { SettingsApp } from "@/components/apps/SettingsApp";

import { soundEngine } from "@/components/audio/SoundEffects";

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
}

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [wallpaperTheme, setWallpaperTheme] = useState<WallpaperTheme>("ironman");
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [topZIndex, setTopZIndex] = useState(10);
  const [activeAppId, setActiveAppId] = useState<string>("preview");

  // Window State Registry
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    preview: {
      id: "preview",
      title: "Shourya_Sharan_Resume.pdf — Preview",
      isOpen: true, // Default open for recruiters & visitors!
      isMinimized: false,
      zIndex: 10,
      initialX: 90,
      initialY: 55,
      initialWidth: 920,
      initialHeight: 620,
    },
    guitar: {
      id: "guitar",
      title: "GarageBand — Acoustic Guitar Physical Modeling Studio",
      isOpen: false,
      isMinimized: false,
      zIndex: 9,
      initialX: 180,
      initialY: 70,
      initialWidth: 780,
      initialHeight: 560,
    },
    chess: {
      id: "chess",
      title: "Apple Chess — U-19 DSO Strategic Engine",
      isOpen: false,
      isMinimized: false,
      zIndex: 8,
      initialX: 220,
      initialY: 85,
      initialWidth: 760,
      initialHeight: 540,
    },
    motocard: {
      id: "motocard",
      title: "Wallet — 316L Stainless Steel Identity Card",
      isOpen: false,
      isMinimized: false,
      zIndex: 7,
      initialX: 260,
      initialY: 95,
      initialWidth: 720,
      initialHeight: 520,
    },
    flag: {
      id: "flag",
      title: "Grapher — Liquid Silk Wave Shader (Pensatori Irrazionali)",
      isOpen: false,
      isMinimized: false,
      zIndex: 6,
      initialX: 150,
      initialY: 80,
      initialWidth: 740,
      initialHeight: 500,
    },
    video: {
      id: "video",
      title: "Hobro Cinema Reel — Creative Engineering",
      isOpen: false,
      isMinimized: false,
      zIndex: 5,
      initialX: 120,
      initialY: 60,
      initialWidth: 880,
      initialHeight: 580,
    },
    safari: {
      id: "safari",
      title: "Safari — Inventions & Systems Showcase",
      isOpen: false,
      isMinimized: false,
      zIndex: 4,
      initialX: 140,
      initialY: 65,
      initialWidth: 860,
      initialHeight: 580,
    },
    terminal: {
      id: "terminal",
      title: "shourya@macbook-pro — zsh — 80x24",
      isOpen: false,
      isMinimized: false,
      zIndex: 3,
      initialX: 200,
      initialY: 100,
      initialWidth: 700,
      initialHeight: 460,
    },
    notes: {
      id: "notes",
      title: "Notes — iCloud",
      isOpen: false,
      isMinimized: false,
      zIndex: 2,
      initialX: 240,
      initialY: 90,
      initialWidth: 740,
      initialHeight: 500,
    },
    settings: {
      id: "settings",
      title: "System Settings — MacBook Pro",
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      initialX: 280,
      initialY: 110,
      initialWidth: 640,
      initialHeight: 480,
    },
  });

  // Global Cmd+K / Ctrl+K listener for Spotlight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
        soundEngine.playWindowClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bringToFront = (appId: string) => {
    setActiveAppId(appId);
    setTopZIndex((prev) => {
      const nextZ = prev + 1;
      setWindows((w) => ({
        ...w,
        [appId]: {
          ...w[appId],
          zIndex: nextZ,
          isMinimized: false,
        },
      }));
      return nextZ;
    });
  };

  const handleOpenApp = (appId: string) => {
    soundEngine.playWindowClick();

    // Map dock IDs to window targets
    let targetId = appId;
    if (appId === "finder" || appId === "keynote" || appId === "numbers") targetId = "safari";
    if (appId === "chrome") targetId = "safari";
    if (appId === "chatgpt" || appId === "claude") targetId = "terminal";
    if (appId === "photos") targetId = "video";
    if (appId === "maps" || appId === "appstore") targetId = "settings";
    if (appId === "mail" || appId === "messages") {
      window.location.href = "mailto:shouryasharan27@gmail.com?subject=Inquiry%20from%20Portfolio";
      return;
    }
    if (appId === "whatsapp") {
      window.open("https://wa.me/919322830883?text=Hi%20Shourya,%20saw%20your%20portfolio!", "_blank");
      return;
    }

    if (windows[targetId]) {
      setWindows((w) => ({
        ...w,
        [targetId]: {
          ...w[targetId],
          isOpen: true,
          isMinimized: false,
        },
      }));
      bringToFront(targetId);
    }
  };

  const handleCloseApp = (appId: string) => {
    soundEngine.playWindowClick();
    setWindows((w) => ({
      ...w,
      [appId]: {
        ...w[appId],
        isOpen: false,
      },
    }));
  };

  const handleMinimizeApp = (appId: string) => {
    soundEngine.playWindowClick();
    setWindows((w) => ({
      ...w,
      [appId]: {
        ...w[appId],
        isMinimized: true,
      },
    }));
  };

  const openAppIds = Object.keys(windows).filter((k) => windows[k].isOpen && !windows[k].isMinimized);

  const getActiveTitle = () => {
    if (!windows[activeAppId]?.isOpen || windows[activeAppId]?.isMinimized) {
      return "Finder";
    }
    const map: Record<string, string> = {
      preview: "Preview",
      guitar: "GarageBand",
      chess: "Chess",
      motocard: "Wallet",
      flag: "Grapher",
      video: "Hobro Cinema",
      safari: "Safari",
      terminal: "Terminal",
      notes: "Notes",
      settings: "System Settings",
    };
    return map[activeAppId] || "Finder";
  };

  return (
    <main
      id="main-content"
      role="main"
      className="relative h-screen w-screen bg-black text-white overflow-hidden select-none font-sans"
    >
      {/* 1. Luxury Architectural Welcome Preloader (era-residence.com inspired) */}
      {showPreloader && <EraPreloader onComplete={() => setShowPreloader(false)} />}

      {/* 2. Authentic Original Live Iron Man Wallpaper ("I am Iron Man" Avengers: Endgame) */}
      <LiveWallpaper
        theme={wallpaperTheme}
        onSnapTriggered={() => {
          // Snap triggered
        }}
      />

      {/* 3. macOS Top Menu Bar */}
      <MacMenuBar
        activeAppTitle={getActiveTitle()}
        onOpenApp={handleOpenApp}
        onToggleControlCenter={() => setControlCenterOpen(!controlCenterOpen)}
        onOpenSpotlight={() => setSpotlightOpen(true)}
      />

      {/* 4. Realistic Suspended Hanging Guitar (Interactive on Desktop) */}
      <DesktopHangingGuitar onOpenStudio={() => handleOpenApp("guitar")} />

      {/* 5. Window Manager (Active Applications Layer) */}
      <div className="absolute inset-0 pt-7 pb-16 pointer-events-none z-20">
        {/* Preview App (Resume.pdf Viewer Placeholder) */}
        <MacWindow
          id="preview"
          title={windows.preview.title}
          isOpen={windows.preview.isOpen}
          isMinimized={windows.preview.isMinimized}
          isActive={activeAppId === "preview"}
          zIndex={windows.preview.zIndex}
          initialX={windows.preview.initialX}
          initialY={windows.preview.initialY}
          initialWidth={windows.preview.initialWidth}
          initialHeight={windows.preview.initialHeight}
          onClose={() => handleCloseApp("preview")}
          onMinimize={() => handleMinimizeApp("preview")}
          onFocus={() => bringToFront("preview")}
        >
          <PreviewApp
            onClose={() => handleCloseApp("preview")}
            onMinimize={() => handleMinimizeApp("preview")}
          />
        </MacWindow>

        {/* Acoustic Guitar Studio (GarageBand) */}
        <MacWindow
          id="guitar"
          title={windows.guitar.title}
          isOpen={windows.guitar.isOpen}
          isMinimized={windows.guitar.isMinimized}
          isActive={activeAppId === "guitar"}
          zIndex={windows.guitar.zIndex}
          initialX={windows.guitar.initialX}
          initialY={windows.guitar.initialY}
          initialWidth={windows.guitar.initialWidth}
          initialHeight={windows.guitar.initialHeight}
          onClose={() => handleCloseApp("guitar")}
          onMinimize={() => handleMinimizeApp("guitar")}
          onFocus={() => bringToFront("guitar")}
        >
          <HangingGuitar onClose={() => handleCloseApp("guitar")} isWindow={true} />
        </MacWindow>

        {/* Apple Chess Game */}
        <MacWindow
          id="chess"
          title={windows.chess.title}
          isOpen={windows.chess.isOpen}
          isMinimized={windows.chess.isMinimized}
          isActive={activeAppId === "chess"}
          zIndex={windows.chess.zIndex}
          initialX={windows.chess.initialX}
          initialY={windows.chess.initialY}
          initialWidth={windows.chess.initialWidth}
          initialHeight={windows.chess.initialHeight}
          onClose={() => handleCloseApp("chess")}
          onMinimize={() => handleMinimizeApp("chess")}
          onFocus={() => bringToFront("chess")}
        >
          <ChessApp onClose={() => handleCloseApp("chess")} />
        </MacWindow>

        {/* 3D Stainless Steel Moto Card */}
        <MacWindow
          id="motocard"
          title={windows.motocard.title}
          isOpen={windows.motocard.isOpen}
          isMinimized={windows.motocard.isMinimized}
          isActive={activeAppId === "motocard"}
          zIndex={windows.motocard.zIndex}
          initialX={windows.motocard.initialX}
          initialY={windows.motocard.initialY}
          initialWidth={windows.motocard.initialWidth}
          initialHeight={windows.motocard.initialHeight}
          onClose={() => handleCloseApp("motocard")}
          onMinimize={() => handleMinimizeApp("motocard")}
          onFocus={() => bringToFront("motocard")}
        >
          <MotoCard3D onClose={() => handleCloseApp("motocard")} isWindow={true} />
        </MacWindow>

        {/* Fluid Ripple Flag Shader */}
        <MacWindow
          id="flag"
          title={windows.flag.title}
          isOpen={windows.flag.isOpen}
          isMinimized={windows.flag.isMinimized}
          isActive={activeAppId === "flag"}
          zIndex={windows.flag.zIndex}
          initialX={windows.flag.initialX}
          initialY={windows.flag.initialY}
          initialWidth={windows.flag.initialWidth}
          initialHeight={windows.flag.initialHeight}
          onClose={() => handleCloseApp("flag")}
          onMinimize={() => handleMinimizeApp("flag")}
          onFocus={() => bringToFront("flag")}
        >
          <RippleFlagCanvas onClose={() => handleCloseApp("flag")} isWindow={true} />
        </MacWindow>

        {/* Hobro Video Hero Reel */}
        <MacWindow
          id="video"
          title={windows.video.title}
          isOpen={windows.video.isOpen}
          isMinimized={windows.video.isMinimized}
          isActive={activeAppId === "video"}
          zIndex={windows.video.zIndex}
          initialX={windows.video.initialX}
          initialY={windows.video.initialY}
          initialWidth={windows.video.initialWidth}
          initialHeight={windows.video.initialHeight}
          onClose={() => handleCloseApp("video")}
          onMinimize={() => handleMinimizeApp("video")}
          onFocus={() => bringToFront("video")}
        >
          <VideoHeroApp
            onClose={() => handleCloseApp("video")}
            onOpenApp={handleOpenApp}
            isWindow={true}
          />
        </MacWindow>

        {/* Safari Browser */}
        <MacWindow
          id="safari"
          title={windows.safari.title}
          isOpen={windows.safari.isOpen}
          isMinimized={windows.safari.isMinimized}
          isActive={activeAppId === "safari"}
          zIndex={windows.safari.zIndex}
          initialX={windows.safari.initialX}
          initialY={windows.safari.initialY}
          initialWidth={windows.safari.initialWidth}
          initialHeight={windows.safari.initialHeight}
          onClose={() => handleCloseApp("safari")}
          onMinimize={() => handleMinimizeApp("safari")}
          onFocus={() => bringToFront("safari")}
        >
          <SafariApp onClose={() => handleCloseApp("safari")} onOpenApp={handleOpenApp} />
        </MacWindow>

        {/* Terminal App */}
        <MacWindow
          id="terminal"
          title={windows.terminal.title}
          isOpen={windows.terminal.isOpen}
          isMinimized={windows.terminal.isMinimized}
          isActive={activeAppId === "terminal"}
          zIndex={windows.terminal.zIndex}
          initialX={windows.terminal.initialX}
          initialY={windows.terminal.initialY}
          initialWidth={windows.terminal.initialWidth}
          initialHeight={windows.terminal.initialHeight}
          onClose={() => handleCloseApp("terminal")}
          onMinimize={() => handleMinimizeApp("terminal")}
          onFocus={() => bringToFront("terminal")}
        >
          <TerminalApp onClose={() => handleCloseApp("terminal")} onOpenApp={handleOpenApp} />
        </MacWindow>

        {/* Notes App */}
        <MacWindow
          id="notes"
          title={windows.notes.title}
          isOpen={windows.notes.isOpen}
          isMinimized={windows.notes.isMinimized}
          isActive={activeAppId === "notes"}
          zIndex={windows.notes.zIndex}
          initialX={windows.notes.initialX}
          initialY={windows.notes.initialY}
          initialWidth={windows.notes.initialWidth}
          initialHeight={windows.notes.initialHeight}
          onClose={() => handleCloseApp("notes")}
          onMinimize={() => handleMinimizeApp("notes")}
          onFocus={() => bringToFront("notes")}
        >
          <NotesApp onClose={() => handleCloseApp("notes")} />
        </MacWindow>

        {/* System Settings App */}
        <MacWindow
          id="settings"
          title={windows.settings.title}
          isOpen={windows.settings.isOpen}
          isMinimized={windows.settings.isMinimized}
          isActive={activeAppId === "settings"}
          zIndex={windows.settings.zIndex}
          initialX={windows.settings.initialX}
          initialY={windows.settings.initialY}
          initialWidth={windows.settings.initialWidth}
          initialHeight={windows.settings.initialHeight}
          onClose={() => handleCloseApp("settings")}
          onMinimize={() => handleMinimizeApp("settings")}
          onFocus={() => bringToFront("settings")}
        >
          <SettingsApp onClose={() => handleCloseApp("settings")} />
        </MacWindow>
      </div>

      {/* 6. Genuine macOS Dock with Official App PNG Icons & Magnification */}
      <MacDock openAppIds={openAppIds} onOpenApp={handleOpenApp} />

      {/* 7. macOS Control Center Dropdown */}
      <ControlCenter
        isOpen={controlCenterOpen}
        onClose={() => setControlCenterOpen(false)}
        currentTheme={wallpaperTheme}
        onChangeTheme={(th) => setWallpaperTheme(th)}
      />

      {/* 8. Spotlight Search Modal */}
      <SpotlightModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onSelectApp={handleOpenApp}
      />
    </main>
  );
}
