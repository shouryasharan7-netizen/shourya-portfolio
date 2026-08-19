"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrambleText } from "@/components/ui/ScrambleText";

const PILLARS = [
  {
    icon: "⚡",
    title: "NEURAL VELOCITY",
    subtitle: "AI Architect · Tensor Engineering",
    description: "I don't just write code. I train systems to outthink the baseline. Speed is the ultimate weapon.",
  },
  {
    icon: "👁",
    title: "OMNISCIENT SCOPE",
    subtitle: "National Rank 2 Heritage Quiz · Author",
    description: "Competing against 2,300+ nodes. Publishing among 200,000+ entries. Data is useless without vision.",
  },
  {
    icon: "♜",
    title: "KINETIC DOMINANCE",
    subtitle: "DSO Football Captain · Chess Strategist",
    description: "Momentum is mass times velocity. Leading 300+ units on the physical plane. Calculate, then conquer.",
  },
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 chess-grid-bg opacity-30" />

      <div className="section-wrap relative z-10">
        {/* The Proclamation */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Cyber logo */}
          <motion.div
            className="w-16 h-16 mx-auto mb-8 border border-[var(--color-gold)] flex items-center justify-center text-[var(--color-gold)] font-mono font-bold text-xl shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            SS
          </motion.div>

          {/* Quote frame */}
          <div className="border border-[var(--color-gold)] px-8 py-12 md:px-16 md:py-16 bg-black/60 backdrop-blur-sm shadow-[0_0_40px_rgba(0,240,255,0.1)]">
            <motion.p
              className="text-2xl md:text-4xl lg:text-5xl leading-[1.2] font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-ivory)",
                textShadow: "0 0 10px rgba(0,240,255,0.3)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              &ldquo;I don&apos;t play the game.
              <br />
              I architect the <ScrambleText text="neural network" className="text-[var(--color-gold)]" /> that runs it.&rdquo;
            </motion.p>
          </div>

          {/* Decorative line */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent mt-12 mx-auto max-w-xs shadow-[0_0_10px_rgba(0,240,255,0.5)]"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="group relative p-8 border border-[var(--color-rule)] hover:border-[var(--color-gold)] transition-colors duration-500 rounded-sm overflow-hidden bg-black/40 backdrop-blur-sm"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 1.2 + i * 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                rotateX: -2,
                rotateY: 3,
                borderColor: "rgba(201, 162, 39, 0.3)",
                transition: { duration: 0.3 },
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-dim)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Background chess piece silhouette */}
              <div
                className="absolute right-4 bottom-4 text-8xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {pillar.icon}
              </div>

              <div className="relative z-10">
                <span className="text-3xl mb-4 block">{pillar.icon}</span>
                <h3
                  className="text-lg font-bold tracking-[0.15em] mb-2 text-[var(--color-gold)]"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-xs tracking-[0.05em] text-[var(--color-muted)] mb-4"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {pillar.subtitle}
                </p>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Napoleon quote */}
        <motion.p
          className="text-center mt-16 text-xs tracking-[0.1em] text-[var(--color-muted-dark)] italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
        >
          &ldquo;Victory belongs to the most persevering.&rdquo; — Napoleon
        </motion.p>
      </div>
    </section>
  );
}
