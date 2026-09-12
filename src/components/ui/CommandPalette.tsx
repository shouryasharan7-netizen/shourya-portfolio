"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ArrowRight,
  Briefcase,
  Code2,
  Trophy,
  Mail,
  Phone,
  Github,
  FileText,
  X,
  Compass,
  Check,
  Sparkles,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import confetti from "canvas-confetti";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  category: "Navigation" | "Quick Actions" | "Projects";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const copyItem = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
      onClose();
    }, 1200);
  };

  const jumpTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      category: "Navigation",
      title: "Hero Overview",
      subtitle: "Jump to introduction & live status",
      icon: <Compass className="w-4 h-4 text-zinc-400" />,
      action: () => jumpTo("hero"),
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "Work & Leadership Appointments",
      subtitle: "7 verified roles (Walnut, STEMinate, Descreened...)",
      icon: <Briefcase className="w-4 h-4 text-zinc-400" />,
      action: () => jumpTo("experience"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Featured Projects & Blueprints",
      subtitle: "Ignicion, Project Cenquity & Biosand Filter",
      icon: <Code2 className="w-4 h-4 text-zinc-400" />,
      action: () => jumpTo("projects"),
    },
    {
      id: "nav-honors",
      category: "Navigation",
      title: "Honors, Certifications & Pedagogy",
      subtitle: "CBSE Heritage Quiz, IIT Madras AI, $1K Grant...",
      icon: <Trophy className="w-4 h-4 text-zinc-400" />,
      action: () => jumpTo("recognitions"),
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Cognitive Matrix & Technical Skills",
      subtitle: "Python, TensorFlow, React, Next.js, UI/UX",
      icon: <Sparkles className="w-4 h-4 text-zinc-400" />,
      action: () => jumpTo("about"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Contact Coordinates",
      subtitle: "Email, phone, location & transmission",
      icon: <Mail className="w-4 h-4 text-zinc-400" />,
      action: () => jumpTo("contact"),
    },

    // Quick Actions
    {
      id: "act-email",
      category: "Quick Actions",
      title: "Copy Email Address",
      subtitle: PERSONAL_INFO.email,
      icon: <Mail className="w-4 h-4 text-amber-400" />,
      action: () => copyItem(PERSONAL_INFO.email, "Email copied!"),
    },
    {
      id: "act-phone",
      category: "Quick Actions",
      title: "Copy Phone Number",
      subtitle: PERSONAL_INFO.phone,
      icon: <Phone className="w-4 h-4 text-emerald-400" />,
      action: () => copyItem(PERSONAL_INFO.phone, "Phone copied!"),
    },
    {
      id: "act-github",
      category: "Quick Actions",
      title: "Open GitHub Profile",
      subtitle: "github.com/shouryasharan7-netizen",
      icon: <Github className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        window.open(PERSONAL_INFO.github, "_blank");
      },
    },
    {
      id: "act-hire",
      category: "Quick Actions",
      title: "Celebrate Collaboration",
      subtitle: "Trigger confetti & celebration",
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      action: () => {
        onClose();
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
          });
        } catch {}
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(search.toLowerCase())) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global keydown listeners for keyboard navigation and ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-zinc-800 bg-[#0E0E12] shadow-2xl animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800/80 bg-zinc-900/50">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search sections..."
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 rounded">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="sm:hidden p-1 text-zinc-400 hover:text-white"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feedback Alert for Clipboard Copy */}
        {copiedText && (
          <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{copiedText}</span>
          </div>
        )}

        {/* List of Results */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-900">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500 font-mono">
              No matching commands or sections found.
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                  selectedIndex === index
                    ? "bg-zinc-800/90 text-white"
                    : "text-zinc-300 hover:bg-zinc-800/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-medium block text-zinc-200">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-[11px] text-zinc-500 block font-mono">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                  <span>{item.category}</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800/80 bg-zinc-950 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Shourya Sharan // Linear Edition</span>
        </div>
      </div>
    </div>
  );
}
