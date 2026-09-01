"use client";

import React, { useState } from "react";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Card3D } from "@/components/ui/Card3D";
import { Mail, Github, Phone, Terminal, ArrowUp, Send, Zap, Cpu, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactSectionProps {
  onToggleHologram?: () => void;
  onTriggerEMP?: () => void;
}

export function ContactSection({ onToggleHologram, onTriggerEMP }: ContactSectionProps) {
  const [inputVal, setInputVal] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; res: string }>>([
    {
      cmd: "jarvis --diagnostics",
      res: "STARK-CLASS HOLOGRAPHIC DOMAIN ONLINE. TYPE 'help' FOR TACTICAL PROTOCOLS.",
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
          "AVAILABLE PROTOCOLS:\n• 'bio': Tactical biography & credentials\n• 'roles': Active research & leadership appointments\n• 'projects': 3D schematic index\n• 'skills': Machine learning & software stack\n• 'emp': Discharge 3D EMP Shockwave\n• 'hologram': Toggle Holographic CAD wireframe\n• 'audio': Toggle authentic HIMYM soundtrack\n• 'hire': Initiate collaboration sequence\n• 'clear': Wipe terminal buffer";
        break;
      case "bio":
        response =
          "Shourya Sharan: Researcher · Builder · Designer. Chief Science Officer at The Walnut Initiative & Computational Researcher at STEMinate.";
        break;
      case "roles":
        response =
          "1. Chief Science Officer (@ Walnut Initiative)\n2. Web Architect & UI Lead (@ Descreened)\n3. Computational Researcher (@ STEMinate)\n4. Head of Tech & Operations (@ ThinkEconomics)";
        break;
      case "projects":
        response =
          "1. Ignicion (Heritage Tech & UI/UX)\n2. Project Cenquity (AR Smart Glasses Hardware)\n3. TGELF Biosand Filter (Water Engineering)";
        break;
      case "skills":
        response =
          "Python, TensorFlow, Scikit-Learn, Next.js 15, React 19, Three.js, TypeScript, Figma, Pandas, WebGL";
        break;
      case "contact":
        response =
          "Email: shouryasharan27@gmail.com | Phone: +91 766 665 6784 | GitHub: shouryasharan7-netizen";
        break;
      case "emp":
        if (onTriggerEMP) onTriggerEMP();
        response = "DISCHARGED 3D ARC REACTOR EMP SHOCKWAVE. PARTICLE ACCELERATION DETECTED.";
        break;
      case "hologram":
      case "holo":
        if (onToggleHologram) onToggleHologram();
        response = "TOGGLED JARVIS HOLOGRAPHIC CAD REALITY SHIELD.";
        break;
      case "audio":
      case "music":
        audioEngine.toggleMusic();
        response = "TOGGLED HIMYM SOUNDTRACK PLAYBACK.";
        break;
      case "hire":
      case "yes":
        response = "COLLABORATION PROTOCOL CONFIRMED. TRANSMITTING COGNITIVE CORE...";
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.75 },
            colors: ["#D4AF37", "#00F0FF", "#FFFFFF", "#FFB703"],
          });
        } catch {}
        break;
      case "clear":
        setTerminalHistory([]);
        setInputVal("");
        return;
      default:
        response = `PROTOCOL '${cleanCmd}' UNRECOGNIZED. TYPE 'help' FOR SYSTEM DIRECTORY.`;
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
          <span className="text-xs font-mono text-cyan-neon tracking-[0.3em] uppercase bg-cyan-neon/10 px-3.5 py-1 rounded-full border border-cyan-neon/30 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            // 05. TRANSMIT SIGNAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            GOT A WILD IDEA? <br />
            <span className="text-gold-400 font-sans">LET&apos;S MAKE IT INEVITABLE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left Column: Interactive Cyber Terminal in Card3D */}
          <div className="lg:col-span-7 h-full">
            <Card3D glowColor="cyan" className="p-6 sm:p-8 flex flex-col font-mono text-xs h-full">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-neon" />
                  <span className="text-cyan-neon tracking-wider font-semibold">
                    JARVIS_CORE_CLI // STARK_NET
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-neon/80" />
                </div>
              </div>

              {/* Terminal Output */}
              <div className="flex-1 space-y-3 min-h-[220px] max-h-[300px] overflow-y-auto mb-4 pr-2">
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-gold-300 flex items-center gap-1.5">
                      <span className="text-cyan-neon">stark@matrix:~$</span>
                      <span>{item.cmd}</span>
                    </div>
                    <div className="text-gray-300 whitespace-pre-line pl-4 border-l border-cyan-neon/30 font-sans text-xs">
                      {item.res}
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleCommand} className="flex items-center gap-2 pt-3 border-t border-zinc-800">
                <span className="text-cyan-neon font-bold">&gt;</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="type 'help', 'emp', or 'hire'..."
                  className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-gray-600 font-mono text-xs"
                />
                <button
                  type="submit"
                  className="p-2 rounded bg-cyan-neon/20 text-cyan-neon hover:bg-cyan-neon hover:text-black transition-colors"
                  aria-label="Transmit Command"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </Card3D>
          </div>

          {/* Right Column: Direct Contact Channels in Card3D */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email Card */}
            <a
              href="mailto:shouryasharan27@gmail.com"
              onClick={() => audioEngine.playClick()}
              className="block"
            >
              <Card3D glowColor="gold" className="p-5 flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded bg-black/70 border border-gold-500/30 text-gold-400 group-hover:scale-105 transition-transform">
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
              </Card3D>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/shouryasharan7-netizen"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine.playClick()}
              className="block"
            >
              <Card3D glowColor="cyan" className="p-5 flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded bg-black/70 border border-cyan-neon/30 text-cyan-neon group-hover:scale-105 transition-transform">
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
              </Card3D>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+917666656784"
              onClick={() => audioEngine.playClick()}
              className="block"
            >
              <Card3D glowColor="amber" className="p-5 flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded bg-black/70 border border-amber-400/30 text-amber-400 group-hover:scale-105 transition-transform">
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
              </Card3D>
            </a>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            <span>SHOURYA SHARAN // © 2026 JARVIS HOLOGRAPHIC MATRIX</span>
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
