"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ACHIEVEMENTS = [
  {
    year: "2025",
    title: "50% Academic Scholarship",
    desc: "97% aggregate · Top 1% nationally",
    side: "left" as const,
  },
  {
    year: "2024",
    title: "National Rank 2 & 5",
    desc: "CBSE Heritage India Quiz · 2,300+ schools · History TV18 · 50,000+ viewers",
    side: "right" as const,
  },
  {
    year: "2024",
    title: "National Finalist, Top 3%",
    desc: "TGELF · Biosand Filter project · 10 local households impacted",
    side: "left" as const,
  },
  {
    year: "2023",
    title: 'Published Author — "A Soldier\'s Story"',
    desc: "National Young Author's Fair · 200,000+ entries",
    side: "right" as const,
  },
  {
    year: "2023",
    title: "INTACH Heritage Quiz — 3rd Prize",
    desc: "City Level · Heritage preservation excellence",
    side: "left" as const,
  },
  {
    year: "2022–24",
    title: "District U-19 DSO Chess — 3 Years",
    desc: "Classes 9–11 · Also DSO Shalaya Football",
    side: "right" as const,
  },
];

export function Victories() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="victories"
      ref={ref}
      className="relative py-32 md:py-40 bg-[var(--color-imperial-dark)] overflow-hidden"
    >
      {/* Background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(5rem,16vw,14rem)] font-bold tracking-[0.08em] whitespace-nowrap pointer-events-none z-0"
        style={{
          fontFamily: "var(--font-cinzel)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(201, 162, 39, 0.03)",
        }}
      >
        VICTORIES
      </div>

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
            V. Victories
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[var(--color-ivory)]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            MEDALS OF <span className="text-[var(--color-gold)]">HONOR</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-gold)] via-[rgba(201,162,39,0.3)] to-transparent origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={i}
              className={`relative flex mb-8 ${
                ach.side === "left"
                  ? "md:justify-start md:pr-[50%] pl-12 md:pl-0"
                  : "md:justify-end md:pl-[50%] pl-12 md:pl-0"
              }`}
              initial={{
                opacity: 0,
                x: ach.side === "left" ? -30 : 30,
              }}
              animate={
                isInView
                  ? { opacity: 1, x: 0 }
                  : {}
              }
              transition={{
                delay: 0.3 + i * 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Dot on timeline */}
              <motion.div
                className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[var(--color-gold)] border-2 border-[var(--color-imperial-dark)] z-10"
                style={{ transform: "translate(-50%, 6px)" }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  delay: 0.5 + i * 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              />

              {/* Card */}
              <div
                className={`group relative p-5 border border-[var(--color-rule)] rounded-sm max-w-sm hover:border-[rgba(201,162,39,0.2)] transition-all duration-300 ${
                  ach.side === "left" ? "md:mr-8 md:text-right" : "md:ml-8"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-dim)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />

                <div className="relative z-10">
                  <span
                    className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold)] font-semibold block mb-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {ach.year}
                  </span>
                  <h4
                    className="text-base font-bold text-[var(--color-ivory)] mb-1 group-hover:text-[var(--color-gold)] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {ach.title}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    {ach.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification */}
        <motion.div
          className="max-w-md mx-auto mt-16 p-6 border border-[var(--color-rule)] rounded-sm text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-sm bg-[var(--color-crimson)] flex items-center justify-center">
            <span
              className="text-white text-sm font-bold"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              IIT
            </span>
          </div>
          <h4
            className="text-base font-bold text-[var(--color-ivory)] mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            AI & Data Science
          </h4>
          <p className="text-xs text-[var(--color-muted)]">
            Indian Institute of Technology (IIT) Madras — July 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
