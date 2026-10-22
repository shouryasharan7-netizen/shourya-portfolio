import { academics, recognitions } from "@/lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-6 max-w-[900px] mx-auto"
      aria-labelledby="about-heading"
    >
      <div className="divider mb-16" />

      {/* Narrow prose column */}
      <div className="max-w-[60ch]">
        <p className="label mb-6">About</p>

        <h2 id="about-heading" className="sr-only">About me</h2>

        <div className="space-y-5 text-base text-[--muted] leading-[1.8]">
          <p>
            I&apos;m a high schooler from Nagpur, Maharashtra. Most of my time
            goes into writing code — mostly React and Python — and thinking about
            how AI, cybersecurity, and cultural heritage intersect.
          </p>
          <p>
            Right now I&apos;m leading software engineering at{" "}
            <strong>Zo Initiative</strong>, running the Nagpur chapter of{" "}
            <strong>bits&bytes</strong> (a 501(c)(3) cybersecurity nonprofit),
            and serving as Chief Science Officer at{" "}
            <strong>The Walnut Initiative</strong>. Before all of that, I was
            Blue House Captain and Cyber Congress Ambassador at Centre Point School.
          </p>
          <p>
            Academically, I scored <strong>97%</strong> in CBSE Class X and{" "}
            <strong>87%</strong> in Class XI on a 50% merit scholarship. I&apos;m
            also certified in Data Science and AI through{" "}
            <strong>IIT Madras School Connect</strong> under Prof. Andrew Thangaraj.
          </p>
          <p>
            I also wrote a book — <em>&ldquo;A Soldier&apos;s Story&rdquo;</em>{" "}
            — which was selected at the National Young Author&apos;s Fair from
            200,000+ submissions. And I&apos;ve been a 3× consecutive DSO U-19
            Chess Representative, which I find more interesting to talk about
            than my tech stack.
          </p>
        </div>
      </div>

      {/* Academics — as a simple table, not cards */}
      <div className="mt-16">
        <p className="label mb-6">Academic record</p>
        <div className="space-y-0 border border-[--border] rounded-lg overflow-hidden">
          {academics.map((a, i) => (
            <div
              key={a.label}
              className={`flex items-baseline justify-between gap-4 px-5 py-4 text-sm ${
                i < academics.length - 1 ? "border-b border-[--border-soft]" : ""
              } hover:bg-[--surface] transition-colors duration-150`}
            >
              <div>
                <span className="text-[--text] font-medium">{a.label}</span>
                <span className="block mono text-xs text-[--muted] mt-0.5">{a.detail}</span>
              </div>
              <span className="mono text-[--accent] font-medium text-base flex-shrink-0">
                {a.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recognitions — a plain list */}
      <div className="mt-16">
        <p className="label mb-6">Recognitions</p>
        <ul className="space-y-5">
          {recognitions.map((r) => (
            <li key={r.what} className="flex gap-4 text-sm">
              <span className="text-[--accent] mono mt-0.5 flex-shrink-0">—</span>
              <div>
                <span className="text-[--text] font-medium">{r.what}</span>
                <span className="block text-[--muted] text-xs mono mt-1">{r.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
