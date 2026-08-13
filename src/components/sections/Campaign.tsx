"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    role: "Chief Science Officer",
    org: "The Walnut Initiative",
    period: "Jun 2026 — Present",
    desc: "Directing research strategy across AI/ML and sustainability initiatives. Building computational models for scalable impact.",
    metric: "Research Lead",
  },
  {
    role: "Tech & Outreach Intern",
    org: "bits&bytes",
    period: "Jun 2026",
    desc: "Drove technology outreach campaigns and community engagement for an emerging tech platform.",
    metric: "Tech Evangelist",
  },
  {
    role: "Computational Researcher",
    org: "STEMinate",
    period: "May 2026 — Present",
    desc: "Applying TensorFlow and Scikit-Learn to structured data problems. Building neural network pipelines for STEM education analytics.",
    metric: "ML Pipelines",
  },
  {
    role: "Head of Tech & Operations",
    org: "ThinkEconomics Club",
    period: "Apr 2026 — Present",
    desc: "Architecting digital infrastructure and event logistics for economics-focused student organization.",
    metric: "100+ Members",
  },
  {
    role: "Web Architect & UI Lead",
    org: "Descreened · The Walnut Initiative",
    period: "Jun 2025 — Present",
    desc: "Designing and building production web experiences with React, Next.js, and Figma. 200+ user interactions driven.",
    metric: "200+ Interactions",
  },
  {
    role: "Blue House Captain",
    org: "Centre Point School",
    period: "Jun 2023 — Jun 2025",
    desc: "Led 300+ students across academics, sports, and cultural events. Managed inter-house competitions and mentored junior students.",
    metric: "300+ Students",
  },
  {
    role: "Cyber Congress Ambassador",
    org: "Centre Point School",
    period: "Jun 2023 — Jun 2025",
    desc: "Spearheaded cyber awareness campaigns. Led 100+ peer workshops on phishing detection and digital safety.",
    metric: "100+ Mentored",
  },
];

export function Campaign() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Only use horizontal scroll on desktop
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate the golden path
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: 1,
          },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="campaign"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-imperial-dark)]"
    >
      {/* Section title */}
      <div className="absolute top-8 left-8 z-20">
        <h2
          className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-60"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          III. The Campaign
        </h2>
      </div>

      {/* Background massive text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(6rem,15vw,14rem)] font-bold tracking-[0.1em] whitespace-nowrap pointer-events-none z-0"
        style={{
          fontFamily: "var(--font-cinzel)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(201, 162, 39, 0.04)",
        }}
      >
        CAMPAIGN
      </div>

      {/* Horizontal scrolling track (desktop) */}
      <div
        ref={trackRef}
        className="flex items-center min-h-screen px-16 gap-0"
        style={{ width: "fit-content" }}
      >
        {/* Golden path SVG */}
        <svg
          className="absolute top-1/2 left-0 -translate-y-1/2 h-2 pointer-events-none z-10 hidden md:block"
          style={{ width: `${EXPERIENCES.length * 450 + 200}px` }}
        >
          <path
            ref={pathRef}
            d={`M 0 1 L ${EXPERIENCES.length * 450 + 200} 1`}
            stroke="var(--color-gold)"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </svg>

        {/* Lead-in space */}
        <div className="w-[200px] md:w-[300px] flex-shrink-0" />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-[85vw] md:w-[400px] px-4 md:px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.2 + i * 0.1,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Battle marker dot */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[var(--color-gold)] shadow-[0_0_12px_rgba(201,162,39,0.5)]" />
              <span
                className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--color-gold)] opacity-60"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {exp.period}
              </span>
            </div>

            {/* Card */}
            <div className="group relative p-6 border border-[var(--color-rule)] rounded-sm hover:border-[rgba(201,162,39,0.2)] transition-colors duration-300">
              {/* Hover spotlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold-dim)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />

              <div className="relative z-10">
                <h3
                  className="text-xl font-bold mb-1 text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {exp.role}
                </h3>
                <p
                  className="text-xs tracking-[0.05em] text-[var(--color-muted)] mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {exp.org}
                </p>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                  {exp.desc}
                </p>

                {/* Medal */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-gold-dim)] flex items-center justify-center text-[0.5rem] text-[var(--color-gold)]">
                    ★
                  </div>
                  <span className="text-[0.65rem] tracking-[0.1em] uppercase text-[var(--color-gold)] opacity-70">
                    {exp.metric}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Trail-off space */}
        <div className="w-[200px] md:w-[300px] flex-shrink-0" />
      </div>
    </section>
  );
}
