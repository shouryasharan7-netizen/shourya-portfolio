import { projects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 px-6 max-w-[900px] mx-auto"
      aria-labelledby="projects-heading"
    >
      <div className="divider mb-16" />

      <p className="label mb-3">Projects</p>
      <h2
        id="projects-heading"
        className="text-2xl font-semibold text-[--text] mb-10"
      >
        Things I&apos;ve built
      </h2>

      {/* List — not a card grid */}
      <ol className="space-y-0" aria-label="Project list">
        {projects.map((p, i) => (
          <li
            key={p.num}
            className={`group py-6 flex gap-6 items-start text-sm ${
              i < projects.length - 1 ? "border-b border-[--border-soft]" : ""
            }`}
          >
            {/* Number */}
            <span className="mono text-xs text-[--muted-2] w-6 flex-shrink-0 pt-0.5">
              {p.num}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 justify-between mb-1.5">
                <h3 className="font-medium text-[--text] leading-snug">
                  {p.title}
                  {p.note && (
                    <span className="mono text-[10px] text-[--muted-2] ml-2 align-middle">
                      [{p.note}]
                    </span>
                  )}
                </h3>

                {/* Year + optional link */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="mono text-xs text-[--muted-2]">{p.year}</span>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[--muted] hover:text-[--accent] transition-colors duration-150"
                      aria-label={`Visit ${p.title}`}
                    >
                      <ArrowUpRight size={14} strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-[--muted] text-sm leading-relaxed mb-3">
                {p.desc}
              </p>

              {/* Tech — inline tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
