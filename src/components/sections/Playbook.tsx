"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    name: "Ignicion",
    role: "Lead Systems Designer",
    desc: "Architected the complete user experience for a heritage-preservation platform, presented at the IGNICION summit. A masterclass in merging community-driven behavior with cultural safeguarding.",
    tags: ["Figma", "UI/UX", "Mobile", "Heritage Tech", "Design Systems"],
    accent: "cyan",
    icon: "🏛",
    gradient: "from-[#00f0ff] to-blue-900",
  },
  {
    name: "Project Cenquity",
    role: "Hardware · Reality Architect",
    desc: "Conceptualized AR smart glasses bridging physical reality with real-time digital overlays. Pitched at Cenference Shark Tank. The future isn't a screen; it's the air around us.",
    tags: ["AR/VR", "Hardware", "Innovation", "IoT", "Pitch"],
    accent: "crimson",
    icon: "👓",
    gradient: "from-[#ff003c] to-red-900",
  },
];

export function Playbook() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="playbook" ref={ref} className="relative py-32 md:py-40 overflow-hidden border-t border-[var(--color-gold-dim)]">
      <div className="absolute inset-0 chess-grid-bg opacity-30" />

      <div className="section-wrap relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-80 block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            0x02. NEURAL DEPLOYMENTS
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[var(--color-ivory)]"
            style={{ fontFamily: "var(--font-mono)", textShadow: "0 0 20px rgba(0,240,255,0.3)" }}
          >
            SYNAPTIC <span className="text-[var(--color-gold)]">COMPILATIONS</span>
          </h2>
        </motion.div>

        {/* Project tactical formation grid */}
        <div className="flex flex-col gap-12 max-w-5xl mx-auto relative">
          {/* Central pitch line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[var(--color-gold-dim)] shadow-[0_0_10px_rgba(0,240,255,0.5)] -translate-x-1/2 hidden md:block" />
          
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              className={`group relative overflow-hidden border border-[var(--color-gold-glow)] rounded-sm bg-black/60 backdrop-blur-md w-full md:w-[65%] shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] ${
                i % 2 === 0 ? "self-start md:mr-auto" : "self-end md:ml-auto"
              }`}
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                rotateX: -1,
                rotateY: 2,
                borderColor:
                  project.accent === "cyan"
                    ? "rgba(0, 240, 255, 0.5)"
                    : "rgba(255, 0, 60, 0.5)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  project.accent === "cyan"
                    ? "bg-gradient-to-br from-[#00f0ff]/5 to-transparent"
                    : "bg-gradient-to-br from-[#ff003c]/5 to-transparent"
                }`}
              />

              {/* Tactical Vectors */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <motion.path
                  d={i % 2 === 0 ? "M -20 150 Q 150 20 450 100" : "M 450 150 Q 150 20 -20 100"}
                  fill="none"
                  stroke={project.accent === "cyan" ? "rgba(0, 240, 255, 0.5)" : "rgba(255, 0, 60, 0.5)"}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <circle cx={i % 2 === 0 ? "450" : "-20"} cy="100" r="4" fill={project.accent === "cyan" ? "rgba(0, 240, 255, 0.8)" : "rgba(255, 0, 60, 0.8)"} />
              </svg>

              {/* Tactical texture */}
              <div className="absolute inset-0 chess-grid-bg opacity-20" />

              {/* Accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 group-hover:w-2 transition-all duration-300 bg-gradient-to-b ${project.gradient}`}
              />

              <div className="relative z-10 p-8">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-sm flex items-center justify-center text-2xl mb-6 bg-gradient-to-br ${project.gradient} text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]`}
                >
                  {project.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold text-[var(--color-ivory)] mb-1 group-hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {project.name}
                </h3>
                <span
                  className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-gold)] opacity-80 block mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {project.role}
                </span>

                {/* Description */}
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6 font-mono">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <motion.span
                      key={tag}
                      className={`text-[0.6rem] font-mono tracking-[0.05em] uppercase px-2 py-1 border rounded-sm transition-colors duration-200 ${
                        project.accent === "cyan"
                          ? "border-[#00f0ff]/20 text-[#00f0ff]/70 group-hover:border-[#00f0ff]/50 group-hover:text-[#00f0ff]"
                          : "border-[#ff003c]/20 text-[#ff003c]/70 group-hover:border-[#ff003c]/50 group-hover:text-[#ff003c]"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 + j * 0.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
