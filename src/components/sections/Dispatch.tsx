"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export function Dispatch() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "cmd" | "response" | "error"; text: string }[]>([
    { type: "response", text: "COMMAND CENTER TERMINAL v1.0.0" },
    { type: "response", text: "Type 'help' to see available commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: "cmd" as const, text: `> ${input}` }];

    if (cmd === "help") {
      newHistory.push({ type: "response", text: "Available commands:" });
      newHistory.push({ type: "response", text: "  connect --email   Open mail client to send a dispatch" });
      newHistory.push({ type: "response", text: "  connect --github  Access GitHub repositories" });
      newHistory.push({ type: "response", text: "  connect --phone   Establish secure voice channel" });
      newHistory.push({ type: "response", text: "  clear             Clear terminal screen" });
    } else if (cmd === "connect --email") {
      newHistory.push({ type: "response", text: "Executing: Opening secure mail channel to shouryasharan27@gmail.com..." });
      setTimeout(() => window.location.href = "mailto:shouryasharan27@gmail.com", 800);
    } else if (cmd === "connect --github") {
      newHistory.push({ type: "response", text: "Executing: Accessing shouryasharan7-netizen on GitHub..." });
      setTimeout(() => window.open("https://github.com/shouryasharan7-netizen", "_blank"), 800);
    } else if (cmd === "connect --phone") {
      newHistory.push({ type: "response", text: "Executing: Establishing voice channel to +91 766 665 6784..." });
      setTimeout(() => window.location.href = "tel:+917666656784", 800);
    } else if (cmd === "clear") {
      setHistory([
        { type: "response", text: "COMMAND CENTER TERMINAL v1.0.0" },
        { type: "response", text: "Type 'help' to see available commands." }
      ]);
      setInput("");
      return;
    } else {
      newHistory.push({ type: "error", text: `Command not recognized: ${cmd}` });
      newHistory.push({ type: "response", text: "Type 'help' to see available commands." });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <section id="dispatch" ref={ref} className="relative py-32 md:py-48 overflow-hidden bg-[var(--color-imperial-navy)]">
      {/* Background grid */}
      <div className="absolute inset-0 chess-grid-bg opacity-10" />

      <div className="section-wrap relative z-10 max-w-3xl mx-auto">
        {/* Section label */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-60" style={{ fontFamily: "var(--font-mono)" }}>
            VIII. The Command Center
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[1] text-[var(--color-ivory)]" style={{ fontFamily: "var(--font-cormorant)" }}>
            ISSUE COMMAND
            <span className="text-[var(--color-crimson)]">_</span>
          </span>
        </motion.h2>

        {/* Terminal Window */}
        <motion.div
          className="bg-[#0a0e17] border border-[var(--color-rule)] rounded-sm overflow-hidden shadow-[0_0_40px_rgba(197,160,89,0.05)] cursor-text"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal Header */}
          <div className="bg-[var(--color-imperial-surface)] border-b border-[var(--color-rule)] px-4 py-2 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-crimson)] opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500 opacity-80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-emerald)] opacity-80" />
            </div>
            <div className="text-[0.65rem] tracking-[0.2em] text-[var(--color-muted-dark)]" style={{ fontFamily: "var(--font-mono)" }}>
              BASH // SECURE
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalRef}
            className="p-6 h-64 overflow-y-auto text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {history.map((line, i) => (
              <div 
                key={i} 
                className={`mb-2 ${
                  line.type === "cmd" ? "text-[var(--color-gold)]" :
                  line.type === "error" ? "text-[var(--color-crimson)]" :
                  "text-[var(--color-muted)]"
                } whitespace-pre-wrap`}
              >
                {line.text}
              </div>
            ))}
            
            <form onSubmit={handleCommand} className="flex items-center mt-4">
              <span className="text-[var(--color-emerald)] mr-2 shrink-0">root@tactician:~#</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[var(--color-ivory)] caret-[var(--color-gold)] min-w-0"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </form>
          </div>
        </motion.div>

        {/* Quick actions for mobile/lazy users */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => { setInput("connect --email"); setTimeout(() => handleCommand({ preventDefault: () => {} } as any), 100); }}
            className="text-[0.65rem] tracking-[0.1em] text-[var(--color-muted)] hover:text-[var(--color-gold)] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [ EMAIL ]
          </button>
          <button 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => { setInput("connect --github"); setTimeout(() => handleCommand({ preventDefault: () => {} } as any), 100); }}
            className="text-[0.65rem] tracking-[0.1em] text-[var(--color-muted)] hover:text-[var(--color-gold)] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [ GITHUB ]
          </button>
        </motion.div>

        {/* Closing Napoleon quote */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-sm italic text-[var(--color-muted)]" style={{ fontFamily: "var(--font-cormorant)" }}>
            &ldquo;Glory is fleeting, but obscurity is forever.&rdquo;
          </p>
          <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-gold)] opacity-50 block mt-2">
            — Napoleon Bonaparte
          </span>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-24 pt-8 border-t border-[var(--color-rule)] flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-sm font-semibold text-[var(--color-ivory)]" style={{ fontFamily: "var(--font-cormorant)" }}>
              Shourya Sharan
            </span>
            <span className="text-[0.6rem] text-[var(--color-muted-dark)] tracking-[0.1em]">
              Nagpur, India
            </span>
          </div>
          <span className="text-[0.6rem] text-[var(--color-muted-dark)] tracking-[0.05em]">
            © 2026 · The Grand Tactician
          </span>
        </motion.footer>
      </div>
    </section>
  );
}
