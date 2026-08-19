"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EDUCATION = [
  {
    school: "Centre Point School, Katol Road",
    period: "Class 11–12 · CBSE",
    detail: "87% · 50% Academic Scholarship",
  },
  {
    school: "Centre Point School, Amravati Road Bypass",
    period: "Class 9–10 · CBSE",
    detail: "97% (Top 1%)",
  },
];

export function General() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="general"
      ref={ref}
      className="relative py-32 md:py-40 bg-black/80 backdrop-blur-md overflow-hidden border-t border-[var(--color-gold-dim)]"
    >
      <div className="section-wrap relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-80 block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            0x01. NEURAL ARCHIVE (CLASSIFIED)
          </span>
        </motion.div>

        {/* Editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left: Portrait / Silhouette area */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Stylized silhouette frame */}
            <div className="relative aspect-[3/4] bg-black border border-[var(--color-gold)] shadow-[0_0_30px_rgba(0,240,255,0.15)] rounded-sm overflow-hidden">
              {/* Abstract silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Cyber grid bg inside frame */}
                  <div className="absolute inset-[-50%] chess-grid-bg opacity-40 animate-[spin_60s_linear_infinite]" />
                  
                  {/* Overlay text */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                  >
                    <span
                      className="text-8xl font-bold text-transparent opacity-80"
                      style={{ 
                        fontFamily: "var(--font-mono)",
                        WebkitTextStroke: "1px var(--color-gold)",
                        textShadow: "0 0 20px rgba(0,240,255,0.5)"
                      }}
                    >
                      01
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom info strip */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent border-t border-[var(--color-gold-dim)]">
                <p
                  className="text-sm italic text-[var(--color-ivory)] leading-relaxed"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  &ldquo;Power is my mistress. I have worked too hard at her conquest to allow anyone to take her away from me.&rdquo;
                </p>
                <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-gold)] opacity-80 mt-2 block">
                  — COMMAND OVERRIDE AUTHORIZED
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--color-ivory)] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              I don&apos;t navigate the matrix.
              <br />
              <span className="text-[var(--color-gold)]" style={{ textShadow: "0 0 15px rgba(0,240,255,0.4)" }}>I engineer its source code.</span>
            </h2>

            <div className="space-y-6 text-sm text-[var(--color-muted)] leading-relaxed font-mono">
              <p>
                <strong className="text-[var(--color-gold)] tracking-wider uppercase block mb-1">Layer 1: Structural Integrity</strong>
                At 17, I command seven concurrent operational threads. From maintaining digital hygiene as a Cyber Congress Ambassador to steering community stability, I view defense as the prerequisite to ambition. You cannot scale a vulnerable system.
              </p>
              <p>
                <strong className="text-[var(--color-gold)] tracking-wider uppercase block mb-1">Layer 2: Information Arbitrage</strong>
                Directing research at The Walnut Initiative and architecting infrastructure for ThinkEconomics Club. Strategy is simply the optimization of data packets. I locate the latency, map the terrain, and construct the pipeline.
              </p>
              <p>
                <strong className="text-[var(--color-gold)] tracking-wider uppercase block mb-1">Layer 3: Decisive Execution</strong>
                Deploying TensorFlow models at STEMinate or engineering heritage-preservation platforms. Theory is useless without computational velocity. The most dangerous entity in any network isn&apos;t the one who writes the cleanest code—it&apos;s the one who controls the synergy between systems, strategy, and time.
              </p>
            </div>

            {/* Education */}
            <div className="mt-10">
              <h3
                className="text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] opacity-80 mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                TRAINING PROTOCOLS
              </h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, i) => (
                  <motion.div
                    key={edu.school}
                    className="pl-4 border-l-2 border-[var(--color-gold)]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  >
                    <h4
                      className="text-sm font-bold text-[var(--color-ivory)] font-mono"
                    >
                      {edu.school}
                    </h4>
                    <p
                      className="text-[0.65rem] tracking-[0.05em] text-[var(--color-gold)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {edu.period}
                    </p>
                    <p className="text-xs text-[var(--color-muted)] font-mono">
                      {edu.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Currently exploring pills */}
            <div className="mt-8">
              <h3
                className="text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] opacity-80 mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ACTIVE COMPILATIONS
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Neural Architectures", "Web3 Economics", "Behavioral ML"].map(
                  (topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1.5 text-[0.65rem] font-mono tracking-[0.05em] border border-[var(--color-gold-glow)] rounded-sm text-[var(--color-gold)] hover:bg-[var(--color-gold-dim)] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300 cursor-default"
                    >
                      {topic}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
