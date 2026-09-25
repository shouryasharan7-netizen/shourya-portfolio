"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundEngine } from "@/components/audio/SoundEffects";
import { Terminal, Sparkles } from "lucide-react";
import { PERSONAL_INFO, ROLES_DATA, PROJECTS_DATA } from "@/data/portfolioData";

interface TerminalAppProps {
  onClose?: () => void;
  onOpenApp?: (appId: string) => void;
}

export function TerminalApp({ onClose, onOpenApp }: TerminalAppProps) {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: "welcome",
      output: (
        <div className="text-zinc-400 space-y-1">
          <p className="text-amber-400 font-bold">
            ShouryaOS Darwin Kernel Version 25.1.0: root:xnu-10063.141.2/RELEASE_ARM64_T8132
          </p>
          <p>Type <span className="text-sky-400 font-bold">'help'</span> to see available commands or <span className="text-sky-400 font-bold">'cat resume.md'</span>.</p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    soundEngine.playWindowClick();

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-zinc-300">
            <div>Available Commands:</div>
            <div>• <span className="text-amber-400 font-mono">whoami</span> — Display executive bio & roles</div>
            <div>• <span className="text-amber-400 font-mono">cat resume.md</span> — Open Preview.app with full CV</div>
            <div>• <span className="text-amber-400 font-mono">projects</span> — List verified inventions & patents</div>
            <div>• <span className="text-amber-400 font-mono">skills</span> — List computational & engineering stack</div>
            <div>• <span className="text-amber-400 font-mono">guitar</span> — Open Acoustic Guitar Studio</div>
            <div>• <span className="text-amber-400 font-mono">chess</span> — Open Apple Chess DSO Championship</div>
            <div>• <span className="text-amber-400 font-mono">motocard</span> — Render 3D Stainless Steel Card</div>
            <div>• <span className="text-amber-400 font-mono">contact</span> — Email and communication endpoints</div>
            <div>• <span className="text-amber-400 font-mono">clear</span> — Clear terminal output</div>
            <div>• <span className="text-amber-400 font-mono">sudo hire-shourya</span> — Fast-track recruiter onboarding</div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-zinc-200 space-y-1">
            <p><span className="text-amber-400 font-bold">{PERSONAL_INFO.name}</span> — {PERSONAL_INFO.title}</p>
            <p className="text-zinc-400">{PERSONAL_INFO.bio}</p>
            <p className="text-zinc-500 font-mono text-[11px]">Location: {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case "cat resume.md":
        output = (
          <div className="text-emerald-400">
            Launching native macOS Preview.app to display Shourya_Sharan_Resume_Official.pdf...
          </div>
        );
        onOpenApp?.("preview");
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-zinc-300">
            {PROJECTS_DATA.map((p) => (
              <div key={p.id}>
                <span className="text-amber-400 font-bold">{p.title}</span> ({p.category}) — <span className="text-emerald-400">{p.impact}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-zinc-300 space-y-1">
            <div>• Core: Next.js, React 19, TypeScript, Tailwind CSS, Python, C++, TensorFlow</div>
            <div>• Spatial & Visual: WebGL, Three.js, Canvas Shader Physics, UI Architecture</div>
            <div>• Systems: Edge Lidar Processing, Cognitive Neural Networks, Fluid Filtration Modeling</div>
          </div>
        );
        break;

      case "guitar":
        output = "Opening Acoustic Guitar Studio...";
        onOpenApp?.("guitar");
        break;

      case "chess":
        output = "Opening Apple Chess Engine...";
        onOpenApp?.("chess");
        break;

      case "motocard":
        output = "Rendering 3D Stainless Steel Moto Card...";
        onOpenApp?.("motocard");
        break;

      case "contact":
        output = (
          <div className="text-zinc-300 space-y-1">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-zinc-400">{PERSONAL_INFO.phone}</span></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.github}</a></div>
          </div>
        );
        break;

      case "sudo hire-shourya":
        output = (
          <div className="text-emerald-400 font-bold space-y-1">
            <p>[ACCESS GRANTED] Initiating direct executive outreach protocol...</p>
            <p>Please mail directly to: <a href={`mailto:${PERSONAL_INFO.email}`} className="underline text-white">{PERSONAL_INFO.email}</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        output = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { cmd: inputVal, output }]);
    setInputVal("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0C0C10] text-zinc-100 rounded-lg overflow-hidden select-none font-mono shadow-2xl border border-white/10">
      {/* Title Bar */}
      <div className="h-10 bg-[#16161D] border-b border-black/40 flex items-center justify-between px-3.5 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80"
              aria-label="Close"
            />
          )}
          <span className="text-xs font-semibold text-white tracking-tight ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            <span>shourya@macbook-pro — zsh — 80x24</span>
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 overflow-y-auto text-xs sm:text-[13px] leading-relaxed select-text space-y-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-emerald-400 font-bold">shourya@macbook</span>
              <span className="text-sky-400 font-bold">~ %</span>
              <span className="text-white">{item.cmd}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}

        {/* Active Prompt Input */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">shourya@macbook</span>
          <span className="text-sky-400 font-bold">~ %</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-[13px] caret-amber-400"
            autoFocus
          />
        </form>

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
