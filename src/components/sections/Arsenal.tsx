"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const SKILLS = [
  { name: "Python", icon: "🐍", quote: "Impossible is a word to be found only in the dictionary of fools." },
  { name: "JavaScript", icon: "⚡", quote: "In war, moral power is to physical as three parts out of four." },
  { name: "React", icon: "⚛", quote: "If you want a thing done well, do it yourself." },
  { name: "Next.js", icon: "▲", quote: "An army marches on its stomach." },
  { name: "TensorFlow", icon: "🧠", quote: "The battlefield is a scene of constant chaos." },
  { name: "Pandas", icon: "📊", quote: "Take time to deliberate, but when the time for action has arrived, stop thinking and go in." },
  { name: "Scikit-Learn", icon: "⚙", quote: "Strategy is the art of making use of time and space." },
  { name: "K-means", icon: "🎯", quote: "The whole art of war consists in getting at what is on the other side of the hill." },
  { name: "Neural Nets", icon: "🔮", quote: "A leader is a dealer in hope." },
  { name: "Figma", icon: "🎨", quote: "Imagination rules the world." },
  { name: "UI/UX", icon: "✦", quote: "The strong man is the one who is able to intercept at will the communication between the senses and the mind." },
  { name: "AI Dev", icon: "🤖", quote: "Glory is fleeting, but obscurity is forever." },
];

function SkillCard({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full aspect-square"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-4 border border-[var(--color-rule)] rounded-sm bg-[var(--color-imperial-surface)] hover:border-[rgba(201,162,39,0.2)] transition-colors duration-300"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-2xl mb-2">{skill.icon}</span>
          <span
            className="text-xs font-bold tracking-[0.1em] uppercase text-[var(--color-ivory)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {skill.name}
          </span>
          {/* Subtle chess square pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(45deg, var(--color-gold) 25%, transparent 25%), linear-gradient(-45deg, var(--color-gold) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--color-gold) 75%), linear-gradient(-45deg, transparent 75%, var(--color-gold) 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-4 border border-[var(--color-gold-dim)] rounded-sm bg-[var(--color-imperial-dark)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p
            className="text-[0.65rem] text-center text-[var(--color-muted)] italic leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;{skill.quote}&rdquo;
          </p>
          <span className="mt-2 text-[0.5rem] tracking-[0.1em] uppercase text-[var(--color-gold)] opacity-50">
            — Napoleon
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Arsenal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="arsenal"
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background massive outlined text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(5rem,18vw,16rem)] font-bold tracking-[0.08em] whitespace-nowrap pointer-events-none z-0"
        style={{
          fontFamily: "var(--font-cinzel)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(201, 162, 39, 0.03)",
        }}
      >
        THE ARSENAL
      </div>

      <div className="section-wrap relative z-10">
        {/* Section label */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-60 block mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            IV. The Arsenal
          </span>
          <h2
            className="text-3xl md:text-5xl font-bold text-[var(--color-ivory)]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            WEAPONS OF <span className="text-[var(--color-gold)]">CHOICE</span>
          </h2>
        </motion.div>

        {/* Skill grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Currently exploring */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-xs text-[var(--color-muted-dark)] mb-3 tracking-[0.1em] uppercase">
            Currently Exploring
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["AI Policy", "Heritage Preservation", "Behavioral Economics"].map(
              (topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 text-[0.65rem] tracking-[0.05em] border border-[var(--color-gold-dim)] rounded-full text-[var(--color-gold)] hover:bg-[var(--color-gold-dim)] transition-colors duration-200 cursor-default"
                >
                  {topic}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
