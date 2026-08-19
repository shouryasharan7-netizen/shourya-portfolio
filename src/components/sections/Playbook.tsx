"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    name: "Ignicion",
    role: "UI/UX Design Lead",
    desc: "Heritage-preservation mobile application presented at the IGNICION summit in Mumbai. Designed the complete user experience for documenting and protecting cultural heritage sites through community-driven technology.",
    tags: ["Figma", "UI/UX", "Mobile", "Heritage Tech", "Design Systems"],
    accent: "amber",
    icon: "🏛",
    gradient: "from-amber-600 to-amber-800",
  },
  {
    name: "Project Cenquity",
    role: "Hardware · Tech Ideator",
    desc: "Augmented Reality smart glasses concept pitched at Cenference Shark Tank. Envisioned a wearable device for real-time contextual information overlay, bridging the physical and digital worlds.",
    tags: ["AR/VR", "Hardware", "Innovation", "IoT", "Pitch"],
    accent: "emerald",
    icon: "👓",
    gradient: "from-emerald-600 to-emerald-800",
  },
];

export function Playbook() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="playbook" ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 chess-grid-bg opacity-20" />

      <div className="section-wrap relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-60 block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            VI. The Playbook
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[var(--color-ivory)]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            STRATEGIC <span className="text-[var(--color-gold)]">DEPLOYMENTS</span>
          </h2>
        </motion.div>

        {/* Project tactical formation grid */}
        <div className="flex flex-col gap-12 max-w-5xl mx-auto relative">
          {/* Central pitch line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[var(--color-rule)] -translate-x-1/2 hidden md:block" />
          
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              className={`group relative overflow-hidden border border-[var(--color-rule)] rounded-sm bg-[var(--color-imperial-surface)] w-full md:w-[65%] ${
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
                  project.accent === "amber"
                    ? "rgba(245, 158, 11, 0.3)"
                    : "rgba(16, 185, 129, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  project.accent === "amber"
                    ? "bg-gradient-to-br from-amber-500/5 to-transparent"
                    : "bg-gradient-to-br from-emerald-500/5 to-transparent"
                }`}
              />

              {/* Tactical Vectors (Football passing lanes / chess moves) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <motion.path
                  d={i % 2 === 0 ? "M -20 150 Q 150 20 450 100" : "M 450 150 Q 150 20 -20 100"}
                  fill="none"
                  stroke={project.accent === "amber" ? "rgba(245, 158, 11, 0.3)" : "rgba(16, 185, 129, 0.3)"}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0 }}
                  whileHover={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <circle cx={i % 2 === 0 ? "450" : "-20"} cy="100" r="4" fill={project.accent === "amber" ? "rgba(245, 158, 11, 0.5)" : "rgba(16, 185, 129, 0.5)"} />
              </svg>

              {/* Tactical texture */}
              <div className="absolute inset-0 chess-grid-bg opacity-10" />

              {/* Accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 transition-all duration-300 bg-gradient-to-b ${project.gradient}`}
              />

              <div className="relative z-10 p-8">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-sm flex items-center justify-center text-2xl mb-6 bg-gradient-to-br ${project.gradient} text-white`}
                >
                  {project.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold text-[var(--color-ivory)] mb-1 group-hover:text-[var(--color-gold)] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {project.name}
                </h3>
                <span
                  className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-muted-dark)] block mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {project.role}
                </span>

                {/* Description */}
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <motion.span
                      key={tag}
                      className={`text-[0.6rem] tracking-[0.05em] uppercase px-2 py-1 border rounded-sm transition-colors duration-200 ${
                        project.accent === "amber"
                          ? "border-amber-500/20 text-amber-500/70 group-hover:border-amber-500/50 group-hover:text-amber-400"
                          : "border-emerald-500/20 text-emerald-500/70 group-hover:border-emerald-500/50 group-hover:text-emerald-400"
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
