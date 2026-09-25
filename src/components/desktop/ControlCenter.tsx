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
  Waves,
} from "lucide-react";
import { WallpaperTheme } from "./LiveWallpaper";

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: WallpaperTheme;
  onChangeTheme: (theme: WallpaperTheme) => void;
  brightness?: number;
  onChangeBrightness?: (val: number) => void;
  volume?: number;
  onChangeVolume?: (val: number) => void;
}

export function ControlCenter({
  isOpen,
  onClose,
  currentTheme,
  onChangeTheme,
  brightness = 100,
  onChangeBrightness,
  volume = 85,
  onChangeVolume,
}: ControlCenterProps) {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [focusMode, setFocusMode] = useState(true);

  if (!isOpen) return null;

  const handleBrightnessChange = (val: number) => {
    if (onChangeBrightness) {
      onChangeBrightness(val);
    }
  };

  const handleVolumeChange = (val: number) => {
    if (onChangeVolume) {
      onChangeVolume(val);
    }
    soundEngine.setMasterVolume(val / 100);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-transparent pointer-events-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-8 right-3 w-80 rounded-2xl bg-[#141419]/92 backdrop-blur-2xl border border-white/15 p-3.5 text-white font-sans text-xs shadow-[0_20px_50px_rgba(0,0,0,0.85)] select-none space-y-3 animate-fadeIn"
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
                className={`p-1.5 rounded-full transition-colors ${
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
                className={`p-1.5 rounded-full transition-colors ${
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
            <div
              onClick={() => {
                setFocusMode(!focusMode);
                soundEngine.playWindowClick();
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  focusMode ? "bg-purple-500 text-white" : "bg-white/10 text-zinc-400"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-[11px]">Focus</div>
                <div className="text-[9px] text-zinc-400">
                  {focusMode ? "Research Mode" : "Off"}
                </div>
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

        {/* Display Brightness Slider (Controls Live Hardware Screen Dimming) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-zinc-300">
            <span className="font-medium">Display Brightness</span>
            <span className="font-mono text-[10px]">{brightness}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="range"
              min="25"
              max="100"
              value={brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              className="w-full accent-white h-1.5 rounded-lg cursor-pointer bg-zinc-700"
              aria-label="Display Brightness"
            />
          </div>
        </div>

        {/* Sound Volume Slider (Controls Web Audio Master Gain) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-zinc-300">
            <span className="font-medium">Sound Volume</span>
            <span className="font-mono text-[10px]">{volume}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-zinc-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-full accent-white h-1.5 rounded-lg cursor-pointer bg-zinc-700"
              aria-label="Sound Volume"
            />
          </div>
        </div>

        {/* Live Wallpaper Theme Selector (4 Options) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
            <Image className="w-3.5 h-3.5 text-red-400" />
            <span>Live Wallpaper</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                onChangeTheme("ironman");
                soundEngine.playWindowClick();
              }}
              className={`p-2 rounded-lg border text-[10px] font-mono text-center transition-all cursor-pointer ${
                currentTheme === "ironman"
                  ? "bg-red-500/25 border-red-500 text-red-300 font-bold shadow-md shadow-red-950/50"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              Iron Man Snap
            </button>
            <button
              onClick={() => {
                onChangeTheme("flag");
                soundEngine.playWindowClick();
              }}
              className={`p-2 rounded-lg border text-[10px] font-mono text-center transition-all cursor-pointer ${
                currentTheme === "flag"
                  ? "bg-amber-500/25 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-950/50"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              Liquid Silk
            </button>
            <button
              onClick={() => {
                onChangeTheme("sonoma");
                soundEngine.playWindowClick();
              }}
              className={`p-2 rounded-lg border text-[10px] font-mono text-center transition-all cursor-pointer ${
                currentTheme === "sonoma"
                  ? "bg-purple-500/25 border-purple-500 text-purple-300 font-bold shadow-md shadow-purple-950/50"
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
              className={`p-2 rounded-lg border text-[10px] font-mono text-center transition-all cursor-pointer ${
                currentTheme === "nebula"
                  ? "bg-cyan-500/25 border-cyan-500 text-cyan-300 font-bold shadow-md shadow-cyan-950/50"
                  : "bg-black/30 border-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              Cosmic Nebula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
