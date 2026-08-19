"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [input, setInput] = useState("");
  const [isOpening, setIsOpening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the hidden input on mount and on click anywhere
  useEffect(() => {
    inputRef.current?.focus();
    const handleGlobalClick = () => inputRef.current?.focus();
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    // Target is "1. e4" but we can be forgiving: "1.e4", "1 e4", "e4", "1. E4"
    const normalized = val.toLowerCase().replace(/\s+/g, "");
    if (normalized === "1.e4" || normalized === "1e4" || normalized === "e4") {
      triggerOpening();
    }
  };

  const triggerOpening = () => {
    if (isOpening) return;
    setIsOpening(true);
    setInput("1. e4"); // standardize display
    
    // Animate board opening sequence, then call onComplete
    setTimeout(() => {
      onComplete();
    }, 1600); // Wait for transition animation
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[var(--color-imperial-navy)] flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 chess-grid-bg opacity-30" />
      <div className="vignette" />

      {/* Hidden input for capturing keyboard */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        className="opacity-0 absolute w-0 h-0"
        autoFocus
        autoComplete="off"
        autoCorrect="off"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -20 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[var(--color-muted-dark)] text-xs tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "var(--font-mono)" }}>
            Awaiting Command
          </p>
        </motion.div>

        {/* Display area for input */}
        <div 
          className="relative text-4xl md:text-6xl font-bold tracking-[0.1em] text-[var(--color-ivory)] h-20 flex items-center justify-center cursor-text"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {input.length === 0 && !isOpening && (
            <span className="opacity-20 absolute pointer-events-none">1. e4</span>
          )}
          <span className="relative z-10">{input}</span>
          {!isOpening && (
            <motion.span 
              className="inline-block w-3 h-10 md:w-5 md:h-14 bg-[var(--color-gold)] ml-2 relative z-10"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear", times: [0, 0.5, 1] }}
            />
          )}
        </div>

        <motion.div
          className="mt-8 relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 0 : 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <button 
            onClick={triggerOpening}
            className="text-[0.65rem] tracking-[0.2em] text-[var(--color-gold)] border border-[var(--color-gold-dim)] px-6 py-3 hover:bg-[var(--color-gold-glow)] transition-colors rounded-sm uppercase bg-transparent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Execute Opening
          </button>
        </motion.div>
      </div>

      {/* Board Transition effect when opening */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div 
              className="w-full h-px bg-[var(--color-gold)] shadow-[0_0_20px_var(--color-gold)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div 
              className="absolute w-px h-full bg-[var(--color-gold)] shadow-[0_0_20px_var(--color-gold)]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />
            <motion.div
              className="absolute inset-0 bg-[var(--color-gold)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
