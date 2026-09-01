"use client";

import React, { useState } from "react";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Mail, Github, Phone, Terminal, ArrowUp, Send, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

export function ContactSection() {
  const [inputVal, setInputVal] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; res: string }>>([
    {
      cmd: "system --status",
      res: "SPATIAL MATRIX ONLINE. TYPE 'help' FOR AVAILABLE COMMANDS.",
    },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    audioEngine.playClick();
    const cleanCmd = inputVal.trim().toLowerCase();
    let response = "";

    switch (cleanCmd) {
      case "help":
        response =
          "AVAILABLE COMMANDS: 'bio', 'roles', 'projects', 'skills', 'contact', 'hire', 'audio', 'clear'";
        break;
      case "bio":
        response =
          "Shourya Sharan: Researcher · Builder · Designer. Chief Science Officer at The Walnut Initiative & Computational Researcher at STEMinate.";
        break;
      case "roles":
        response =
          "1. Chief Science Officer (@ Walnut Initiative)\n2. Web Architect (@ Descreened)\n3. Computational Researcher (@ STEMinate)\n4. Head of Tech (@ ThinkEconomics)";
        break;
      case "projects":
        response =
          "1. Ignicion (Heritage Mobile Tech)\n2. Project Cenquity (AR Smart Glasses)\n3. TGELF Biosand Filter (Water Tech)";
        break;
      case "skills":
        response = "Python, TensorFlow, Next.js, React, Three.js, TypeScript, Scikit-Learn, Figma, Pandas";
        break;
      case "contact":
        response = "Email: shouryasharan27@gmail.com | Phone: +91 766 665 6784 | GitHub: shouryasharan7-netizen";
        break;
      case "hire":
      case "yes":
        response = "SIGNAL BROADCAST CONFIRMED! INITIATING COLLABORATION SEQUENCE...";
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.8 },
            colors: ["#D4AF37", "#00F0FF", "#FFFFFF"],
          });
        } catch {}
        break;
      case "audio":
        audioEngine.toggleMusic();
        response = "TOGGLED SYNTH SOUNDTRACK PLAYBACK STATE.";
        break;
      case "clear":
        setTerminalHistory([]);
        setInputVal("");
        return;
      default:
        response = `COMMAND '${cleanCmd}' NOT RECOGNIZED. TYPE 'help' FOR ASSISTANCE.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: inputVal, res: response }]);
    setInputVal("");
  };

  const scrollToTop = () => {
    audioEngine.playWarp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-gold-400 tracking-[0.3em] uppercase bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20 mb-3">
            // 05. TRANSMIT SIGNAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            GOT A WILD IDEA? <br />
            <span className="text-gold-400 font-sans">LET&apos;S MAKE IT INEVITABLE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Interactive Cyber Terminal */}
          <div className="lg:col-span-7 glass-card p-6 rounded-sm flex flex-col font-mono text-xs border border-gold-500/30">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 tracking-wider">
                  SHOURYA_CLI_v2.0 [MATRIX NODE]
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Terminal Output */}
            <div className="flex-1 space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto mb-4 pr-2">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-gold-300 flex items-center gap-1.5">
                    <span className="text-cyan-neon">visitor@shourya-matrix:~$</span>
                    <span>{item.cmd}</span>
                  </div>
                  <div className="text-gray-300 whitespace-pre-line pl-4 border-l border-gold-500/30 font-sans text-xs">
                    {item.res}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <span className="text-cyan-neon font-bold">&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help' or 'hire'..."
                className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-gray-600 font-mono text-xs"
              />
              <button
                type="submit"
                className="p-1.5 rounded bg-gold-500/20 text-gold-400 hover:bg-gold-500 hover:text-black transition-colors"
                aria-label="Send Command"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Column: Direct Contact Channel Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email Card */}
            <a
              href="mailto:shouryasharan27@gmail.com"
              onClick={() => audioEngine.playClick()}
              onMouseEnter={() => audioEngine.playHover()}
              className="glass-card p-5 rounded-sm flex items-center justify-between group hover:border-gold-400 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded bg-black/60 border border-gold-500/30 text-gold-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gold-400 tracking-widest uppercase block">
                    ELECTRONIC MAIL
                  </span>
                  <span className="text-sm font-bold font-mono text-white group-hover:text-gold-300">
                    shouryasharan27@gmail.com
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-gold-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/shouryasharan7-netizen"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine.playClick()}
              onMouseEnter={() => audioEngine.playHover()}
              className="glass-card p-5 rounded-sm flex items-center justify-between group hover:border-cyan-neon transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded bg-black/60 border border-cyan-neon/30 text-cyan-neon group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-neon tracking-widest uppercase block">
                    CODE REPOSITORY
                  </span>
                  <span className="text-sm font-bold font-mono text-white group-hover:text-cyan-200">
                    shouryasharan7-netizen
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-cyan-neon group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+917666656784"
              onClick={() => audioEngine.playClick()}
              onMouseEnter={() => audioEngine.playHover()}
              className="glass-card p-5 rounded-sm flex items-center justify-between group hover:border-amber-400 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded bg-black/60 border border-amber-400/30 text-amber-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase block">
                    VOICE // CELLULAR
                  </span>
                  <span className="text-sm font-bold font-mono text-white group-hover:text-amber-200">
                    +91 766 665 6784
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            <span>SHOURYA SHARAN // © 2026 CYBER-IMPERIAL MATRIX</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gold-400/80">BUILT WITH NEXT.JS 15 & THREE.JS</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full border border-gold-500/30 bg-black/80 text-gold-400 hover:bg-gold-500 hover:text-black transition-all flex items-center gap-1"
              title="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
