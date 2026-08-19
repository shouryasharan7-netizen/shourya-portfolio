"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { motion } from "framer-motion";

interface AudioContextType {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType>({
  play: () => {},
  pause: () => {},
  toggle: () => {},
  isPlaying: false,
});

export const useAudio = () => useContext(AudioContext);

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Load YouTube IFrame API
  useEffect(() => {
    // Avoid loading twice
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("youtube-audio", {
        height: "0",
        width: "0",
        videoId: "NDT6k7_y3AY", // Amour Plastique (slowed + reverb)
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: "NDT6k7_y3AY", // required for loop
          controls: 0,
          showinfo: 0,
          wmode: "transparent",
        },
        events: {
          onReady: () => setPlayerReady(true),
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, []);

  const play = () => {
    if (playerReady && playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const pause = () => {
    if (playerReady && playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  const toggle = () => {
    if (isPlaying) pause();
    else play();
  };

  return (
    <AudioContext.Provider value={{ play, pause, toggle, isPlaying }}>
      {/* Hidden YouTube Player */}
      <div id="youtube-audio" className="hidden absolute opacity-0 pointer-events-none" />
      
      {children}

      {/* Audio Visualizer / Toggle Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-[150] w-12 h-12 rounded-full border border-[var(--color-rule)] bg-[var(--color-imperial-surface)] flex items-center justify-center gap-1 hover:border-[var(--color-gold-glow)] transition-colors"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        title={isPlaying ? "Pause Ambient Audio" : "Play Ambient Audio"}
      >
        {[1, 2, 3].map((bar) => (
          <motion.div
            key={bar}
            className="w-1 bg-[var(--color-gold)]"
            animate={{
              height: isPlaying ? ["8px", "16px", "8px"] : "4px",
            }}
            transition={{
              repeat: Infinity,
              duration: 0.8 + bar * 0.2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
            }}
          />
        ))}
      </motion.button>
    </AudioContext.Provider>
  );
}
