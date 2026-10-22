"use client";

import { useState } from "react";
import { meta } from "@/lib/data";
import { ArrowUpRight, Github } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(meta.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      id="contact"
      className="py-20 px-6 max-w-[900px] mx-auto"
      aria-labelledby="contact-heading"
    >
      <div className="divider mb-16" />

      <p className="label mb-3">Contact</p>
      <h2
        id="contact-heading"
        className="text-2xl font-semibold text-[--text] mb-4"
      >
        Let&apos;s talk
      </h2>

      <p className="text-[--muted] text-base max-w-[48ch] leading-relaxed mb-10">
        Whether it&apos;s a collaboration, a question, or just to say hi —
        email is the best way to reach me.
      </p>

      {/* Email — big and clickable */}
      <div className="mb-10">
        <button
          onClick={copyEmail}
          className="group flex items-baseline gap-3 text-left"
          aria-label="Copy email address"
        >
          <span className="text-[clamp(1.1rem,3.5vw,1.6rem)] font-medium text-[--text] group-hover:text-[--accent] transition-colors duration-150 border-b border-[--border] group-hover:border-[--accent] pb-0.5">
            {meta.email}
          </span>
          <span className="mono text-xs text-[--muted] group-hover:text-[--accent] transition-colors duration-150">
            {copied ? "copied ✓" : "copy"}
          </span>
        </button>
      </div>

      {/* Other links */}
      <div className="flex flex-wrap gap-5 text-sm">
        <a
          href={meta.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[--muted] hover:text-[--text] transition-colors duration-150"
        >
          <Github size={14} strokeWidth={1.5} />
          GitHub
          <ArrowUpRight size={12} strokeWidth={1.5} />
        </a>

        <a
          href={`tel:${meta.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-1.5 text-[--muted] hover:text-[--text] transition-colors duration-150"
        >
          {meta.phone}
        </a>
      </div>
    </section>
  );
}
