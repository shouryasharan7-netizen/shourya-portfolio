"use client";

import React, { useState, useEffect } from "react";
import { audioEngine } from "./AudioEngine";
import { Volume2, VolumeX, Play, Pause, Radio } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
    return unsub;
  }, []);

  const handleTogglePlay = () => {
    audioEngine.playClick();
    audioEngine.toggleMusic();
  };

  const handleToggleMute = () => {
    audioEngine.playClick();
    audioEngine.toggleMute();
  };

  return (
    <div className="flex items-center gap-3 px-3.5 py-2 rounded-full border border-gold-500/25 bg-obsidian-900/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {/* Visualizer EQ Bars */}
      <div className="flex items-end gap-0.5 h-4 w-6 px-0.5">
        {[0.6, 0.9, 0.4, 0.8, 0.5].map((height, i) => (
          <span
            key={i}
            className={`w-1 rounded-full transition-all duration-150 ${
              isPlaying && !isMuted
                ? "bg-gold-400 animate-pulse"
                : "bg-zinc-700 h-1"
            }`}
            style={{
              height: isPlaying && !isMuted ? `${height * 100}%` : "3px",
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <div className="hidden sm:flex flex-col">
        <span className="text-[9px] font-mono tracking-widest text-gold-400/90 uppercase flex items-center gap-1">
          <Radio className="w-2.5 h-2.5 text-gold-400 animate-pulse" />
          <span>SYNTH SOUNDTRACK</span>
        </span>
        <span className="text-[10px] font-sans font-medium text-gray-300">
          {isPlaying ? "HIMYM Acoustic Theme" : "Audio Suspended"}
        </span>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={handleTogglePlay}
        className="w-7 h-7 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition-all duration-200"
        title={isPlaying ? "Pause Music" : "Play Music"}
        aria-label="Toggle Music"
      >
        {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
      </button>

      {/* Mute Button */}
      <button
        onClick={handleToggleMute}
        className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
          isMuted
            ? "border-red-500/40 bg-red-500/10 text-red-400"
            : "border-gold-500/20 bg-black/40 text-gray-400 hover:text-white"
        }`}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
        aria-label="Toggle Mute"
      >
        {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
      </button>
    </div>
  );
}
