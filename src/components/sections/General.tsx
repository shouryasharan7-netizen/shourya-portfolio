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
      className="relative py-32 md:py-40 bg-[var(--color-imperial-dark)] overflow-hidden"
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
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-60 block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            VII. The Dossier (Strategic Brief)
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
            <div className="relative aspect-[3/4] bg-gradient-to-b from-[var(--color-imperial-surface)] to-[var(--color-imperial-navy)] border border-[var(--color-rule)] rounded-sm overflow-hidden">
              {/* Gold frame corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[var(--color-gold)] opacity-40" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[var(--color-gold)] opacity-40" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[var(--color-gold)] opacity-40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[var(--color-gold)] opacity-40" />

              {/* Abstract silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Chess knight silhouette */}
                  <svg
                    width="120"
                    height="160"
                    viewBox="0 0 120 160"
                    fill="none"
                    className="opacity-10"
                  >
                    <path
                      d="M60 10 C30 10 20 30 25 50 L20 70 C15 80 20 100 30 110 L25 140 L95 140 L90 110 C100 100 105 80 100 70 L95 50 C100 30 90 10 60 10Z"
                      stroke="var(--color-gold)"
                      strokeWidth="1"
                    />
                    <path
                      d="M40 50 Q50 35 60 40 Q70 45 65 55"
                      stroke="var(--color-gold)"
                      strokeWidth="0.5"
                    />
                  </svg>

                  {/* Overlay text */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                  >
                    <span
                      className="text-6xl font-bold text-[var(--color-gold)] opacity-[0.08]"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                    >
                      SS
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom info strip */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--color-imperial-navy)] to-transparent">
                <p
                  className="text-sm italic text-[var(--color-muted)] leading-relaxed"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  &ldquo;A leader is a dealer in hope.&rdquo;
                </p>
                <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-gold)] opacity-40">
                  — Napoleon Bonaparte
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
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              I don&apos;t fit in a box.
              <br />
              <span className="text-[var(--color-gold)]">I build them.</span>
            </h2>

            <div className="space-y-6 text-sm text-[var(--color-muted)] leading-relaxed">
              <p>
                <strong className="text-[var(--color-gold)] font-mono text-xs tracking-wider uppercase block mb-1">Defense (Foundation)</strong>
                At 17, I operate across seven concurrent roles. Whether it's securing community stability as Blue House Captain or maintaining digital hygiene as a Cyber Congress Ambassador, defense requires foresight and structure.
              </p>
              <p>
                <strong className="text-[var(--color-gold)] font-mono text-xs tracking-wider uppercase block mb-1">Midfield Control (Systems & Logistics)</strong>
                Directing research at The Walnut Initiative and architecting infrastructure for ThinkEconomics Club means controlling the flow of information. It's about finding the problem, studying the terrain, and building the pipelines.
              </p>
              <p>
                <strong className="text-[var(--color-gold)] font-mono text-xs tracking-wider uppercase block mb-1">Counter-Attack (Execution)</strong>
                Training TensorFlow models at STEMinate or designing a heritage-preservation app for the IGNICION summit represents the decisive strike. I believe the most dangerous person in any room is the one who understands systems — not just code, but people, strategy, and time.
              </p>
            </div>

            {/* Education */}
            <div className="mt-10">
              <h3
                className="text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] opacity-60 mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Education
              </h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, i) => (
                  <motion.div
                    key={edu.school}
                    className="pl-4 border-l-2 border-[var(--color-rule)]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  >
                    <h4
                      className="text-sm font-bold text-[var(--color-ivory)]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {edu.school}
                    </h4>
                    <p
                      className="text-[0.65rem] tracking-[0.05em] text-[var(--color-muted-dark)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {edu.period}
                    </p>
                    <p className="text-xs text-[var(--color-muted)]">
                      {edu.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Currently exploring pills */}
            <div className="mt-8">
              <h3
                className="text-xs tracking-[0.15em] uppercase text-[var(--color-gold)] opacity-60 mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Currently Exploring
              </h3>
              <div className="flex flex-wrap gap-2">
                {["AI Policy", "Heritage Preservation via Tech", "Behavioral Economics"].map(
                  (topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1.5 text-[0.65rem] tracking-[0.05em] border border-[var(--color-gold-dim)] rounded-full text-[var(--color-gold)] hover:bg-[var(--color-gold-dim)] hover:shadow-[0_0_15px_rgba(201,162,39,0.1)] transition-all duration-300 cursor-default"
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
