"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const CONTACTS = [
  {
    label: "Email",
    value: "shouryasharan27@gmail.com",
    href: "mailto:shouryasharan27@gmail.com",
  },
  {
    label: "GitHub",
    value: "shouryasharan7-netizen",
    href: "https://github.com/shouryasharan7-netizen",
    external: true,
  },
  {
    label: "Phone",
    value: "+91 766 665 6784",
    href: "tel:+917666656784",
  },
];

export function Dispatch() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="dispatch"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 chess-grid-bg opacity-20" />

      <div className="section-wrap relative z-10">
        {/* Section label */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] opacity-60"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            VIII. The Dispatch
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] text-[var(--color-ivory)]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            SEND A
            <br />
            DISPATCH
            <span className="text-[var(--color-crimson)]">.</span>
          </span>
        </motion.h2>

        {/* Wax seal */}
        <motion.div
          className="mx-auto mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <div className="wax-seal mx-auto group cursor-pointer hover:scale-110 transition-transform duration-300">
            <span className="group-hover:scale-90 transition-transform duration-200 block">
              ✉
            </span>
          </div>
        </motion.div>

        {/* Contact links */}
        <div className="max-w-md mx-auto">
          {CONTACTS.map((contact, i) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.8 + i * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <MagneticButton
                as="a"
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                className="flex items-center justify-between w-full py-4 border-b border-[var(--color-rule)] group"
                strength={0.15}
              >
                <span
                  className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--color-muted-dark)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {contact.label}
                </span>
                <span className="text-sm text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors duration-200">
                  {contact.value}
                </span>
              </MagneticButton>
            </motion.div>
          ))}
        </div>

        {/* Closing Napoleon quote */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p
            className="text-sm italic text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;Glory is fleeting, but obscurity is forever.&rdquo;
          </p>
          <span className="text-[0.6rem] tracking-[0.1em] uppercase text-[var(--color-gold)] opacity-50 block mt-2">
            — Napoleon Bonaparte
          </span>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-24 pt-8 border-t border-[var(--color-rule)] flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <div className="flex flex-col items-center md:items-start gap-1">
            <span
              className="text-sm font-semibold text-[var(--color-ivory)]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Shourya Sharan
            </span>
            <span className="text-[0.6rem] text-[var(--color-muted-dark)] tracking-[0.1em]">
              Nagpur, India
            </span>
          </div>
          <span className="text-[0.6rem] text-[var(--color-muted-dark)] tracking-[0.05em]">
            © 2026 · Built with Next.js, Three.js & GSAP
          </span>
        </motion.footer>
      </div>
    </section>
  );
}
