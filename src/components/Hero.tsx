import { meta, status } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 px-6 max-w-[900px] mx-auto"
      aria-label="Introduction"
    >
      {/* Name */}
      <h1 className="text-[clamp(2.6rem,8vw,5.2rem)] font-semibold tracking-tight text-[--text] mb-4 leading-[1.05]">
        Shourya Sharan
      </h1>

      {/* One-liner */}
      <p className="text-lg sm:text-xl text-[--muted] max-w-[52ch] leading-relaxed mb-8 font-light">
        I&apos;m 18, from Nagpur. I build things on the internet,
        research LLM-based cybersecurity, and play chess obsessively.
      </p>

      {/* Status strip — what I'm doing right now */}
      <div className="mb-10 flex flex-col gap-2">
        {status.map((s) => (
          <div key={s.org} className="flex items-center gap-2.5 text-sm">
            <span className="dot-live" aria-hidden />
            <span className="text-[--muted]">
              {s.role} at{" "}
              <strong className="text-[--text] font-medium">{s.org}</strong>
            </span>
          </div>
        ))}
      </div>

      {/* CTAs — text links, not buttons */}
      <div className="flex flex-wrap items-center gap-5 text-sm">
        <a href="#projects" className="link font-medium text-[--text]">
          See my work
        </a>
        <a href={`mailto:${meta.email}`} className="link font-medium text-[--text]">
          Get in touch
        </a>
        <a
          href={meta.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[--muted] hover:text-[--text] transition-colors duration-150"
        >
          GitHub <ArrowUpRight size={13} strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}
