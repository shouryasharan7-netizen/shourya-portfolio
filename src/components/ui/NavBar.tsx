"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

const NAV_LINKS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Campaign", href: "#campaign" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Victories", href: "#victories" },
  { label: "Dispatch", href: "#dispatch" },
];

export function NavBar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > lastScrollY && current > 100);
      setLastScrollY(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 w-full z-[100] flex items-center justify-between px-6 py-4 border-b border-[var(--color-rule)]"
        style={{
          background: "rgba(10, 14, 26, 0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <MagneticButton
          className="font-[var(--font-cinzel)] font-bold text-sm w-8 h-8 flex items-center justify-center border border-[var(--color-gold)] text-[var(--color-gold)] tracking-wider hover:bg-[var(--color-gold-dim)] transition-colors duration-200"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          SS
        </MagneticButton>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-gold)] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-1 z-[101]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-[1.5px] bg-[var(--color-warm-white)] transition-all duration-300"
            style={{
              transform: mobileOpen
                ? "rotate(45deg) translate(2.3px, 2.3px)"
                : "none",
            }}
          />
          <span
            className="block w-5 h-[1.5px] bg-[var(--color-warm-white)] transition-all duration-300"
            style={{
              transform: mobileOpen
                ? "rotate(-45deg) translate(2.3px, -2.3px)"
                : "none",
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-[var(--color-imperial-navy)] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-[var(--font-cinzel)] text-3xl font-bold text-[var(--color-muted)] hover:text-[var(--color-gold)] transition-colors tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
