import { skills, certifications } from "@/lib/data";

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 px-6 max-w-[900px] mx-auto"
      aria-labelledby="skills-heading"
    >
      <div className="divider mb-16" />

      <p className="label mb-3">Stack</p>
      <h2
        id="skills-heading"
        className="text-2xl font-semibold text-[--text] mb-10"
      >
        What I work with
      </h2>

      {/* Skills by category */}
      <div className="space-y-8 mb-16">
        {skills.map((group) => (
          <div key={group.category} className="flex gap-6 text-sm">
            <span className="mono text-xs text-[--muted-2] w-36 flex-shrink-0 pt-0.5">
              {group.category}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications — just a list, no badges */}
      <div>
        <p className="label mb-5">Certifications</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5">
          {certifications.map((c) => (
            <li key={c} className="flex items-center gap-2.5 text-sm text-[--muted]">
              <span className="text-[--accent] mono text-xs flex-shrink-0">✓</span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
