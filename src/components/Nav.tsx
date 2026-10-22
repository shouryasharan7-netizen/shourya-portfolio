"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about",    label: "About"    },
  { href: "#projects", label: "Projects" },
  { href: "#contact",  label: "Contact"  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-[--border-soft] bg-[--bg]/90 backdrop-blur-sm"
          : ""
      }`}
    >
      <nav
        className="max-w-[900px] mx-auto px-6 h-14 flex items-center justify-between"
        aria-label="Primary"
      >
        {/* Logo — just the initials */}
        <a
          href="#"
          className="mono text-sm font-medium text-[--text] hover:text-[--accent] transition-colors duration-150"
          aria-label="Shourya Sharan — home"
        >
          ss.
        </a>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden sm:block px-3 py-1.5 text-sm text-[--muted] hover:text-[--text] rounded-md hover:bg-[--surface] transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}

          <div className="w-px h-4 bg-[--border] mx-1 hidden sm:block" aria-hidden />

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
