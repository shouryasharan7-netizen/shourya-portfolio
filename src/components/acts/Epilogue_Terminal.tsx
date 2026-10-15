"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL_INFO, TERMINAL_COMMANDS } from "@/data/portfolioData";
import { Github, Mail, Phone, MapPin, ArrowUpRight, Send } from "lucide-react";

function EncryptedTerminal() {
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; text: string }>>([
    { type: "output", text: "CHRONO-TERMINAL v3.0 — Encrypted Uplink Active" },
    { type: "output", text: "Type 'help' to see available commands." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [
      ...history,
      { type: "input" as const, text: `> ${cmd}` },
    ];

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const response = TERMINAL_COMMANDS[trimmed];
    if (response) {
      if (trimmed === "email") {
        navigator.clipboard?.writeText(PERSONAL_INFO.email).catch(() => {});
      }
      if (trimmed === "github") {
        setTimeout(() => window.open(PERSONAL_INFO.github, "_blank"), 500);
      }
      response.forEach((line) => {
        newHistory.push({ type: "output" as const, text: line });
      });
    } else if (trimmed !== "") {
      newHistory.push({
        type: "output" as const,
        text: `Command not found: '${trimmed}'. Type 'help' for options.`,
      });
    }

    newHistory.push({ type: "output" as const, text: "" });
    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/[0.05]">
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-[#0a0a10]">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-[10px] font-mono-custom text-zinc-600 tracking-widest">
          ENCRYPTED-UPLINK — shouryasharan.xyz
        </span>
      </div>

      {/* Output */}
      <div className="p-5 h-52 overflow-y-auto font-mono-custom text-sm space-y-0.5">
        {history.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "input"
                ? "text-cyan-300"
                : line.text.startsWith("Command not found")
                ? "text-red-400"
                : line.text === ""
                ? "h-2"
                : "text-zinc-400"
            }
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-white/[0.05] bg-[#070710]">
        <span className="text-cyan-400 font-mono-custom text-sm">{">"}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommand(input);
          }}
          placeholder="type a command..."
          className="flex-1 bg-transparent text-sm font-mono-custom text-zinc-200 outline-none placeholder:text-zinc-700"
          autoFocus
        />
        <button
          onClick={() => handleCommand(input)}
          className="text-cyan-500 hover:text-cyan-300 transition-colors"
          data-cursor="VIEW"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

export default function EpilogueTerminal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Message from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-6"
      style={{ background: "#050508" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-3">EPILOGUE · TRANSMISSION TERMINAL</div>
          <h2 className="font-display font-black text-4xl md:text-6xl leading-tight">
            <span className="text-white">Open a</span>{" "}
            <span className="text-gradient-cyber">Channel</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Encrypted uplink active. Send a transmission or explore the terminal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — terminal + contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-6"
          >
            <EncryptedTerminal />

            {/* Direct contact */}
            <div className="space-y-3">
              {[
                { icon: <Mail size={14} />, label: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}`, color: "#00F5D4" },
                { icon: <Phone size={14} />, label: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}`, color: "#10B981" },
                { icon: <MapPin size={14} />, label: PERSONAL_INFO.location, href: "#", color: "#F59E0B" },
                { icon: <Github size={14} />, label: "github.com/shouryasharan7-netizen", href: PERSONAL_INFO.github, color: "#7B2CBF" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-cursor="VIEW"
                  className="flex items-center gap-3 p-3 rounded-xl glass-card glass-card-hover group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-sm font-mono-custom text-zinc-400 group-hover:text-zinc-200 transition-colors flex-1">
                    {item.label}
                  </span>
                  <ArrowUpRight size={12} className="text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — glassmorphic contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-5"
            >
              <div className="text-sm font-mono-custom text-zinc-500 tracking-widest uppercase mb-2">
                Send a Transmission
              </div>

              {[
                { id: "name", label: "Name", placeholder: "Your name", type: "text" },
                { id: "email", label: "Email", placeholder: "your@email.com", type: "email" },
              ].map(({ id, label, placeholder, type }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-mono-custom text-zinc-600 mb-2 tracking-wider uppercase">
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    required
                    value={formState[id as keyof typeof formState]}
                    onChange={(e) => setFormState({ ...formState, [id]: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono-custom text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-xs font-mono-custom text-zinc-600 mb-2 tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your message..."
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono-custom text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-cyan-400/40 focus:bg-white/[0.05] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor="VIEW"
                className="w-full py-3.5 rounded-xl text-sm font-mono-custom font-semibold tracking-wider flex items-center justify-center gap-2 transition-all"
                style={{
                  background: sent
                    ? "rgba(16,185,129,0.15)"
                    : "linear-gradient(135deg, rgba(0,245,212,0.15), rgba(123,44,191,0.15))",
                  border: sent ? "1px solid rgba(16,185,129,0.3)" : "1px solid rgba(0,245,212,0.25)",
                  color: sent ? "#10B981" : "#00F5D4",
                }}
              >
                {sent ? (
                  <>✓ TRANSMISSION SENT</>
                ) : (
                  <>
                    <Send size={14} />
                    TRANSMIT MESSAGE
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono-custom text-zinc-700"
        >
          <div>© 2026 SHOURYA SHARAN — ALL RIGHTS RESERVED</div>
          <div>{PERSONAL_INFO.coordinates} — NAGPUR, INDIA</div>
          <div>CHRONO-CYBERNETIC PORTFOLIO v3.0</div>
        </motion.div>
      </div>
    </section>
  );
}
