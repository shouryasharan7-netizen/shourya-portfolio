"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { COMMAND_STATIONS } from "@/data/portfolioData";
import {
  Code2,
  Shield,
  Brain,
  TrendingUp,
  Users,
  ExternalLink,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={22} />,
  Shield: <Shield size={22} />,
  Brain: <Brain size={22} />,
  TrendingUp: <TrendingUp size={22} />,
  Users: <Users size={22} />,
};

const TYPE_COLOR: Record<string, string> = {
  Engineering: "#00F5D4",
  Cybersecurity: "#10B981",
  Science: "#7B2CBF",
  Economics: "#F59E0B",
  Governance: "#EA580C",
};

export default function ActIIICommandCenter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="leadership"
      ref={ref}
      className="relative py-32 px-6"
      style={{
        background: "linear-gradient(180deg, #050508 0%, #070810 50%, #050508 100%)",
      }}
    >
      {/* Top divider */}
      <div className="act-divider mb-20" />

      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="section-label mb-3">ACT III · THE COMMAND CENTER</div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-tight">
            <span className="text-white">Leadership &</span>{" "}
            <span className="text-gradient-emerald">Impact</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Five concurrent command stations. Each lighting up the frontier of engineering, cybersecurity, science, and governance.
          </p>
        </motion.div>

        {/* Vertical mission control timeline */}
        <div className="relative">
          {/* Central line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(0,245,212,0.2) 20%, rgba(0,245,212,0.2) 80%, transparent)",
              transform: "translateX(-50%)",
            }}
          />

          <div className="space-y-16">
            {COMMAND_STATIONS.map((station, i) => {
              const isLeft = i % 2 === 0;
              const stationInView = useInView(
                { current: null } as React.RefObject<Element>,
                { once: true }
              );

              return (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`relative flex items-center gap-8 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Card — takes ~half width */}
                  <div className="w-full lg:w-[calc(50%-40px)]">
                    <div
                      className="spotlight-card glass-card glass-card-hover rounded-2xl p-7 relative overflow-hidden group"
                      data-cursor="VIEW"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        e.currentTarget.style.setProperty(
                          "--mouse-x",
                          `${((e.clientX - rect.left) / rect.width) * 100}%`
                        );
                        e.currentTarget.style.setProperty(
                          "--mouse-y",
                          `${((e.clientY - rect.top) / rect.height) * 100}%`
                        );
                      }}
                    >
                      {/* Telemetry line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${station.accent}, transparent)`,
                        }}
                      />

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: `${station.accent}12`, color: station.accent }}
                        >
                          {ICON_MAP[station.icon]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[10px] font-mono-custom tracking-wider px-2 py-0.5 rounded border"
                              style={{
                                borderColor: `${station.accent}30`,
                                color: station.accent,
                                background: `${station.accent}10`,
                              }}
                            >
                              {station.type}
                            </span>
                          </div>
                          <div className="text-lg font-display font-bold text-white leading-tight">{station.org}</div>
                          <div className="text-sm font-semibold text-zinc-300 mt-0.5">{station.role}</div>
                        </div>
                      </div>

                      {/* Period */}
                      <div className="text-[10px] font-mono-custom text-zinc-600 mb-4 tracking-widest uppercase">
                        {station.period}
                      </div>

                      {/* Impact */}
                      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{station.impact}</p>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-2">
                        {station.metrics.map((m) => (
                          <span
                            key={m}
                            className="text-[10px] font-mono-custom px-2 py-1 rounded border border-white/[0.06] text-zinc-500"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden lg:flex flex-shrink-0 flex-col items-center gap-2 w-20">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: station.accent, boxShadow: `0 0 16px ${station.accent}40` }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: station.accent }}
                      />
                    </div>
                    <div
                      className="text-[8px] font-mono-custom tracking-widest text-center"
                      style={{ color: `${station.accent}70` }}
                    >
                      0{i + 1}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="act-divider mt-20" />
    </section>
  );
}
