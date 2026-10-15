"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { INNOVATION_VAULT, type ProjectDossier } from "@/data/portfolioData";
import {
  X,
  ExternalLink,
  Lock,
  Cpu,
  Globe,
  Layers,
  Code,
  Wifi,
  Droplets,
  Zap,
} from "lucide-react";

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  RESEARCH: <Cpu size={14} />,
  "HERITAGE-TECH": <Layers size={14} />,
  "ED-TECH": <Zap size={14} />,
  "WEB-ARCH": <Globe size={14} />,
  HARDWARE: <Wifi size={14} />,
  COMMUNITY: <Droplets size={14} />,
};

// Terminal simulation for the LLM research card
function ThreatTerminal() {
  const packets = [
    { ip: "192.168.1.14", flag: "THREAT", label: "SQL Injection", color: "#FF4444" },
    { ip: "10.0.0.23", flag: "CLEAN", label: "HTTP/GET", color: "#10B981" },
    { ip: "172.16.0.5", flag: "THREAT", label: "XSS Payload", color: "#FF4444" },
    { ip: "192.168.0.88", flag: "CLEAN", label: "DNS Query", color: "#10B981" },
    { ip: "10.0.1.7", flag: "THREAT", label: "Port Scan", color: "#F59E0B" },
  ];

  return (
    <div className="bg-[#020204] rounded-xl p-4 font-mono-custom text-xs border border-white/[0.05] overflow-hidden">
      <div className="text-zinc-600 mb-3 text-[10px] tracking-widest">LIVE THREAT DETECTION SIMULATION</div>
      {packets.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3, repeat: Infinity, repeatDelay: packets.length * 0.3 + 1 }}
          className="flex items-center gap-3 py-1.5 border-b border-white/[0.03]"
        >
          <span className="text-zinc-600">{p.ip}</span>
          <span className="text-zinc-700">→</span>
          <span style={{ color: p.color }} className="font-bold">
            [{p.flag}]
          </span>
          <span className="text-zinc-500">{p.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function DossierModal({
  project,
  onClose,
}: {
  project: ProjectDossier;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="dossier-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto m-6 glass-card rounded-2xl p-8"
          style={{ border: `1px solid ${project.accent}30` }}
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            data-cursor="VIEW"
          >
            <X size={14} />
          </button>

          {/* Category */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="flex items-center gap-1.5 text-[10px] font-mono-custom tracking-wider px-2 py-1 rounded border"
              style={{ borderColor: `${project.accent}40`, color: project.accent, background: `${project.accent}10` }}
            >
              {CATEGORY_ICON[project.category]}
              {project.category}
            </span>
            {project.classified && (
              <span className="flex items-center gap-1 text-[10px] font-mono-custom text-amber-400 border border-amber-400/30 px-2 py-1 rounded">
                <Lock size={10} />
                CLASSIFIED
              </span>
            )}
          </div>

          <h3 className="font-display font-black text-2xl text-white mb-1">{project.title}</h3>
          <div className="text-sm text-zinc-500 font-mono-custom mb-6">{project.subtitle}</div>

          {/* Terminal for research project */}
          {project.id === "llm-cyber" && (
            <div className="mb-6">
              <ThreatTerminal />
            </div>
          )}

          <p className="text-sm text-zinc-300 leading-relaxed mb-6">{project.description}</p>

          {/* Tech stack */}
          <div className="mb-6">
            <div className="text-[10px] font-mono-custom text-zinc-600 tracking-wider mb-3">TECH STACK</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono-custom border border-white/[0.06] text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div
            className="p-4 rounded-xl border text-sm font-mono-custom"
            style={{ borderColor: `${project.accent}20`, background: `${project.accent}06`, color: project.accent }}
          >
            <span className="text-zinc-600 mr-2 text-[10px]">IMPACT</span>
            {project.impact}
          </div>

          {/* Link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-sm font-mono-custom transition-colors"
              style={{ color: project.accent }}
              data-cursor="VIEW"
            >
              <ExternalLink size={14} />
              Visit Live Project
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ActIVVault() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<ProjectDossier | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6 max-w-7xl mx-auto">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="section-label mb-3">ACT IV · THE INNOVATION VAULT</div>
        <h2 className="font-display font-black text-4xl md:text-6xl leading-tight">
          <span className="text-white">Projects &</span>{" "}
          <span className="text-gradient-gold">Research</span>
        </h2>
        <p className="text-zinc-500 mt-4 max-w-lg mx-auto text-sm">
          Six classified dossiers — from LLM-powered cybersecurity research to heritage-tech and deployed production platforms.
        </p>
      </motion.div>

      {/* Project grid — stacked card style */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {INNOVATION_VAULT.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => setSelected(project)}
            data-cursor="VIEW"
            className="spotlight-card glass-card glass-card-hover rounded-2xl p-6 cursor-pointer relative overflow-hidden group"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
              e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
            }}
          >
            {/* Accent top border on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
            />

            {/* Category badge */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="flex items-center gap-1.5 text-[10px] font-mono-custom tracking-wider px-2 py-1 rounded border"
                style={{ borderColor: `${project.accent}30`, color: project.accent, background: `${project.accent}10` }}
              >
                {CATEGORY_ICON[project.category]}
                {project.category}
              </span>
              {project.classified && (
                <Lock size={12} className="text-amber-400/60" />
              )}
            </div>

            <h3 className="font-display font-bold text-lg text-white mb-1 leading-tight">{project.title}</h3>
            <div className="text-xs font-mono-custom text-zinc-600 mb-3">{project.subtitle}</div>
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{project.description}</p>

            {/* Tech pills — first 3 */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[9px] font-mono-custom border border-white/[0.05] text-zinc-600"
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono-custom border border-white/[0.05] text-zinc-700">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* Open dossier CTA */}
            <div
              className="mt-5 flex items-center gap-1.5 text-xs font-mono-custom opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: project.accent }}
            >
              <Code size={12} />
              OPEN DOSSIER
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <DossierModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
