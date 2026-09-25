"use client";

import React, { useState } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import {
  Wifi,
  Bluetooth,
  Airplay,
  Moon,
  Sun,
  Volume2,
  Sliders,
  Image,
  Sparkles,
  Zap,
} from "lucide-react";
import { WallpaperTheme } from "./LiveWallpaper";

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: WallpaperTheme;
  onChangeTheme: (theme: WallpaperTheme) => void;
}

export function ControlCenter({
  isOpen,
  onClose,
  currentTheme,
  onChangeTheme,
}: ControlCenterProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(85);
  const [displayBrightness, setDisplayBrightness] = useState(100);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-transparent pointer-events-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-8 right-3 w-80 rounded-2xl bg-[#141419]/90 backdrop-blur-2xl border border-white/15 p-3.5 text-white font-sans text-xs shadow-[0_20px_50px_rgba(0,0,0,0.8)] select-none space-y-3"
      >
        {/* Top 2x2 Toggle Modules */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Wi-Fi & Bluetooth Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-2">
            <div
              onClick={() => {
                setWifiEnabled(!wifiEnabled);
                soundEngine.playWindowClick();
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`p-1.5 rounded-full ${
                  wifiEnabled ? "bg-blue-500 text-white" : "bg-white/10 text-zinc-400"
                }`}
              >
                <Wifi className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="font-semibold text-[11px]">Wi-Fi</div>
                <div className="text-[9px] text-zinc-400">
                  {wifiEnabled ? "Shourya-Fiber" : "Off"}
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                setBluetoothEnabled(!bluetoothEnabled);
                soundEngine.playWindowClick();
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`p-1.5 rounded-full ${
                  bluetoothEnabled ? "bg-blue-500 text-white" : "bg-white/10 text-zinc-400"
                }`}
              >
                <Bluetooth className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="font-semibold text-[11px]">Bluetooth</div>
                <div className="text-[9px] text-zinc-400">
                  {bluetoothEnabled ? "AirPods Pro" : "Off"}
                </div>
              </div>
            </div>
          </div>

          {/* Do Not Disturb & Screen Mirroring */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-purple-500/80 text-white">
                <Moon className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-[11px]">Focus</div>
                <div className="text-[9px] text-zinc-400">Research Mode</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
              <div className="p-1.5 rounded-full bg-white/10 text-zinc-300">
                <Airplay className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-[11px]">Mirroring</div>
                <div className="text-[9px] text-zinc-400">Studio Display</div>
              </div>
            </div>
          </div>
        </div>

        {/* Display Brightness Slider */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-zinc-300">
            <span className="font-medium">Display Brightness</span>
            <span className="font-mono text-[10px]">{displayBrightness}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="range"
              min="20"
              max="100"
              value={displayBrightness}
              onChange={(e) => setDisplayBrightness(Number(e.target.value))}
              className="w-full accent-white h-1.5 rounded-lg cursor-pointer bg-zinc-700"
            />
          </div>
        </div>

        {/* Sound Volume Slider */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-zinc-300">
            <span className="font-medium">Sound Volume</span>
            <span className="font-mono text-[10px]">{soundVolume}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={soundVolume}
              onChange={(e) => setSoundVolume(Number(e.target.value))}
              className="w-full accent-white h-1.5 rounded-lg cursor-pointer bg-zinc-700"
            />
          </div>
        </div>

        {/* Live Wallpaper Picker */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
            <Image className="w-3.5 h-3.5 text-red-400" />
            <span>Live Wallpaper</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => {
                onChangeTheme("ironman");
                soundEngine.playWindowClick();
              }}
              className={`p-1.5 rounded-lg border text-[10px] font-mono text-center transition-all cursor-pointer ${
                currentTheme === "ironman"
                  ? "bg-red-500/20 border-red-500 text-red-300 font-bold"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              Iron Man
            </button>
            <button
              onClick={() => {
                onChangeTheme("sonoma");
                soundEngine.playWindowClick();
              }}
              className={`p-1.5 rounded-lg border text-[10px] font-mono text-center transition-all cursor-pointer ${
                currentTheme === "sonoma"
                  ? "bg-purple-500/20 border-purple-500 text-purple-300 font-bold"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              Sonoma
            </button>
            <button
              onClick={() => {
                onChangeTheme("nebula");
                soundEngine.playWindowClick();
              }}
              className={`p-1.5 rounded-lg border text-[10px] font-mono text-center transition-all cursor-pointer ${
                currentTheme === "nebula"
                  ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              Nebula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
