"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PERSONAL_INFO } from "@/data/portfolioData";

const NAV_ITEMS = [
  { id: "hero", label: "Origin" },
  { id: "about", label: "Duality" },
  { id: "leadership", label: "Command" },
  { id: "projects", label: "Vault" },
  { id: "skills", label: "Arsenal" },
  { id: "contact", label: "Uplink" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 200) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.8, duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[8000] transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
      style={{
        background: scrolled
          ? "rgba(5,5,8,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => scrollTo("hero")}
          data-cursor="VIEW"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
            <span className="text-[10px] font-display font-black text-white">SS</span>
          </div>
          <span className="hidden sm:block text-xs font-mono-custom text-zinc-500 tracking-widest uppercase">
            Shourya Sharan
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              data-cursor="VIEW"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-custom tracking-wider transition-all duration-200 ${
                activeSection === item.id
                  ? "text-cyan-400 bg-cyan-400/10"
                  : "text-zinc-600 hover:text-zinc-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          data-cursor="VIEW"
          className="text-[10px] font-mono-custom tracking-wider px-3.5 py-2 rounded-lg border transition-all duration-200"
          style={{
            borderColor: "rgba(0,245,212,0.25)",
            color: "#00F5D4",
            background: "rgba(0,245,212,0.05)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,245,212,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,245,212,0.05)";
          }}
        >
          CONTACT
        </a>
      </div>
    </motion.header>
  );
}
