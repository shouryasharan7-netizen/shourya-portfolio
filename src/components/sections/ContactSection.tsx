"use client";

import React, { useState } from "react";
import { audioEngine } from "@/components/audio/AudioEngine";
import { Card3D } from "@/components/ui/Card3D";
import {
  Mail,
  Github,
  Phone,
  Terminal,
  ArrowUp,
  Send,
  Zap,
  Cpu,
  Copy,
  Check,
  MapPin,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface ContactSectionProps {
  onToggleHologram?: () => void;
  onTriggerEMP?: () => void;
}

export function ContactSection({ onToggleHologram, onTriggerEMP }: ContactSectionProps) {
  const [inputVal, setInputVal] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; res: string }>>([
    {
      cmd: "jarvis --status",
      res: "TACTICAL REALITY CORE ACTIVE. TYPE 'help' FOR SYSTEM DIRECTORY.",
    },
  ]);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    audioEngine.playClick();
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    audioEngine.playClick();
    const cleanCmd = inputVal.trim().toLowerCase();
    let response = "";

    switch (cleanCmd) {
      case "help":
        response =
          "AVAILABLE PROTOCOLS:\n• 'bio': Biographical profile & core thesis\n• 'roles': All 7 active & past leadership appointments\n• 'projects': Featured inventions & blueprints\n• 'awards': National honors & scholarships\n• 'skills': Machine learning, web, and design stack\n• 'contact': Direct transmission coordinates\n• 'emp': Discharge 3D kinetic shockwave\n• 'hologram': Toggle Holographic CAD mode\n• 'hire': Initiate collaboration sequence\n• 'clear': Flush terminal buffer";
        break;
      case "bio":
        response = `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}.\n"${PERSONAL_INFO.tagline}"\n${PERSONAL_INFO.bio}`;
        break;
      case "roles":
        response =
          "1. Chief Science Officer (@ The Walnut Initiative)\n2. Freelance Web Developer & UI Architect (@ Descreened)\n3. Computational Researcher (@ STEMinate)\n4. Head of Tech & Operations (@ ThinkEconomics Club)\n5. Growth Associate (@ bits&bytes)\n6. Blue House Captain (@ Centre Point School)\n7. Cyber Congress Ambassador (@ Centre Point School)";
        break;
      case "projects":
        response =
          "1. Ignicion (Heritage-Tech Mobile UI/UX Architecture)\n2. Project Cenquity (Augmented Reality Smart Glasses Pitch)\n3. TGELF Biosand Filter Initiative (National Round 3 Finalist)";
        break;
      case "awards":
        response =
          "• CBSE Heritage India Quiz (National Rank 2 & 5)\n• Resera Hackathon 2nd Place ($1,000 Grant)\n• TGELF Biosand Filter (Round 3 Nationally)\n• Published Author (\"A Soldier's Story\")\n• 50% Academic Scholarship (Class 10: 97% Aggregate)\n• U-19 DSO Chess (3 Consecutive Years)";
        break;
      case "skills":
        response =
          "Languages: Python, JavaScript, TypeScript, HTML/CSS, React, Next.js\nAI & ML: TensorFlow, Pandas, Scikit-Learn, K-means, Neural Networks\nDesign: UI/UX Design, Figma, AI-Assisted Workflows";
        break;
      case "contact":
        response = `Email: ${PERSONAL_INFO.email}\nPhone: ${PERSONAL_INFO.phone}\nLocation: ${PERSONAL_INFO.location}\nGitHub: ${PERSONAL_INFO.github}`;
        break;
      case "emp":
        if (onTriggerEMP) onTriggerEMP();
        response = "3D ARC REACTOR EMP SHOCKWAVE DISCHARGED.";
        break;
      case "hologram":
      case "holo":
        if (onToggleHologram) onToggleHologram();
        response = "TOGGLED JARVIS HOLOGRAPHIC CAD VIEWPORT.";
        break;
      case "hire":
      case "collab":
        response = "COLLABORATION SIGNAL CONFIRMED. SENDING CONFETTI TELEMETRY...";
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
        response = `COMMAND '${cleanCmd}' UNRECOGNIZED. TYPE 'help' FOR SYSTEM PROTOCOLS.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: inputVal, res: response }]);
    setInputVal("");
  };

  const scrollToTop = () => {
    audioEngine.playWarp();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Signal Transmission"
      className="py-28 px-4 sm:px-8 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono text-cyan-neon tracking-[0.3em] uppercase bg-cyan-neon/10 px-3.5 py-1 rounded-full border border-cyan-neon/30 mb-3 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            // 05. TRANSMIT SIGNAL
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            GOT A HARD PROBLEM? <br />
            <span className="text-gold-400 font-sans">LET&apos;S ENGINEER THE SOLUTION.</span>
          </h2>
          <p className="text-sm text-gray-400 font-mono mt-2 max-w-lg">
            Open for research collaborations, frontend engineering, UI/UX architecture, and technical leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left Column: Interactive Terminal */}
          <div className="lg:col-span-7 h-full">
            <Card3D glowColor="cyan" className="p-6 sm:p-8 flex flex-col font-mono text-xs h-full">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-neon" />
                  <span className="text-cyan-neon tracking-wider font-semibold">
                    JARVIS_CORE_CLI // STARK_TERMINAL
                  </span>
                </div>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
              </div>

              {/* Terminal Screen Output */}
              <div
                tabIndex={0}
                aria-label="Terminal output log"
                className="flex-1 space-y-3 min-h-[220px] max-h-[280px] overflow-y-auto mb-4 pr-2 focus:outline-none focus:ring-1 focus:ring-cyan-neon rounded-sm"
              >
                {terminalHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-gold-300 flex items-center gap-1.5">
                      <span className="text-cyan-neon">user@shourya:~$</span>
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
                  placeholder="type 'help', 'roles', or 'emp'..."
                  className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-gray-600 font-mono text-xs min-h-[36px]"
                  aria-label="Command input"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded bg-cyan-neon/20 text-cyan-neon hover:bg-cyan-neon hover:text-black transition-colors min-h-[36px] flex items-center gap-1 font-mono text-[11px]"
                  aria-label="Execute command"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>RUN</span>
                </button>
              </form>
            </Card3D>
          </div>

          {/* Right Column: Direct Contact Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email Card with 1-click copy */}
            <div className="relative">
              <Card3D glowColor="gold" className="p-5 flex items-center justify-between group">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => audioEngine.playClick()}
                  className="flex items-center gap-3.5 focus:outline-none"
                >
                  <div className="p-3 rounded bg-black/80 border border-gold-500/30 text-gold-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gold-400 tracking-widest uppercase block">
                      ELECTRONIC MAIL
                    </span>
                    <span className="text-sm font-bold font-mono text-white group-hover:text-gold-300">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, "email")}
                  className="p-2 rounded bg-zinc-800/80 text-gray-300 hover:text-white hover:bg-zinc-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold-400"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </Card3D>
            </div>

            {/* GitHub Card */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioEngine.playClick()}
              className="block focus:outline-none"
            >
              <Card3D glowColor="cyan" className="p-5 flex items-center justify-between group">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded bg-black/80 border border-cyan-neon/30 text-cyan-neon group-hover:scale-105 transition-transform">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-neon tracking-widest uppercase block">
                      CODE REPOSITORY
                    </span>
                    <span className="text-sm font-bold font-mono text-white group-hover:text-cyan-200">
                      {PERSONAL_INFO.githubHandle}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-cyan-neon group-hover:translate-x-1 transition-transform" />
              </Card3D>
            </a>

            {/* Phone Card with 1-click copy */}
            <div className="relative">
              <Card3D glowColor="amber" className="p-5 flex items-center justify-between group">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={() => audioEngine.playClick()}
                  className="flex items-center gap-3.5 focus:outline-none"
                >
                  <div className="p-3 rounded bg-black/80 border border-amber-400/30 text-amber-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase block">
                      CELLULAR // VOICE
                    </span>
                    <span className="text-sm font-bold font-mono text-white group-hover:text-amber-200">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </a>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, "phone")}
                  className="p-2 rounded bg-zinc-800/80 text-gray-300 hover:text-white hover:bg-zinc-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-400"
                  aria-label="Copy phone number"
                  title="Copy phone number to clipboard"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </Card3D>
            </div>

            {/* Location Pill */}
            <div className="p-3 rounded bg-black/60 border border-zinc-800 flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>LOCATION: NAGPUR, MAHARASHTRA, INDIA</span>
              </span>
              <span className="text-emerald-400">IST (UTC +5:30)</span>
            </div>
          </div>
        </div>

        {/* Semantic Footer Landmark */}
        <footer
          role="contentinfo"
          className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500"
        >
          <div>
            <span>SHOURYA SHARAN // © 2026 TACTICAL 3D ECOSYSTEM</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gold-400/80">NEXT.JS 15 · THREE.JS · WCAG 2.2 AA</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full border border-gold-500/30 bg-black/80 text-gold-400 hover:bg-gold-500 hover:text-black transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-gold-400 min-h-[44px]"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
