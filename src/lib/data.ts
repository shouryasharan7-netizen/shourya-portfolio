// All the facts. Kept exactly as they are. No buzzwords.

export const meta = {
  name:     "Shourya Sharan",
  location: "Nagpur, India",
  email:    "shouryasharan27@gmail.com",
  github:   "https://github.com/shouryasharan7-netizen",
  phone:    "+91 76666 56784",
};

// What I'm doing right now
export const status: { org: string; role: string; url?: string }[] = [
  { org: "Zo Initiative",        role: "Software Engineering Lead"         },
  { org: "bits&bytes Nagpur",    role: "Fork Lead, City Operations"        },
  { org: "The Walnut Initiative",role: "Chief Science Officer"             },
  { org: "ThinkEconomics Club",  role: "Head of Tech & Operations"         },
];

// Projects — real ones, with real links where they exist
export const projects: {
  num:    string;
  title:  string;
  desc:   string;
  tech:   string[];
  link?:  string;
  year:   string;
  note?:  string;
}[] = [
  {
    num:   "01",
    title: "LLM Cybersecurity Threat Detection",
    desc:  "Co-authoring a research paper on using LLMs for real-time network threat classification. Part of STEMinate's computational research track.",
    tech:  ["Python", "TensorFlow", "Scikit-Learn", "LLM Integration"],
    year:  "2026",
  },
  {
    num:   "02",
    title: "SAT Vocabulary Platform",
    desc:  "Spaced-repetition web app for SAT vocab. Built solo — active recall, progress tracking, gamified streaks. 350+ sessions.",
    tech:  ["React", "Next.js", "Tailwind CSS"],
    link:  "https://satvocab.xyz",
    year:  "2025",
  },
  {
    num:   "03",
    title: "Ignicion App",
    desc:  "Mobile app concept that turns static heritage content into interactive experiences. Pitched at IGNICION Innovation Conclave 2025 in Mumbai.",
    tech:  ["Figma", "Product Design", "User Research"],
    year:  "2025",
  },
  {
    num:   "04",
    title: "Production Web Platforms",
    desc:  "Full-stack platforms for Shourya Roof, Descreened, and The Walnut Initiative. Built with React and Next.js, using Anthropic Claude MCP for internal workflows.",
    tech:  ["React", "Next.js", "Anthropic MCP", "TypeScript", "Vercel"],
    year:  "2025–26",
  },
  {
    num:   "05",
    title: "Project Cenquity",
    desc:  "AR wearables concept aimed at making smart glasses viable for budget-constrained markets. Pitched at Cenference 2025.",
    tech:  ["Product Strategy", "AR/XR Concepts", "Hardware Ideation"],
    year:  "2025",
    note:  "conceptual",
  },
  {
    num:   "06",
    title: "TGELF Biosand Filter",
    desc:  "Low-cost biosand water filters deployed to households in Nagpur. No electricity required. National Finalist — top 3% of 130 teams.",
    tech:  ["Community Engineering", "Social Impact", "Field Deployment"],
    year:  "2024",
  },
];

// Academic record
export const academics: { label: string; value: string; detail: string }[] = [
  {
    label:  "CBSE Class X",
    value:  "97%",
    detail: "Sanskrit Merit · IT Merit · Centre Point School, 2023",
  },
  {
    label:  "CBSE Class XI",
    value:  "87%",
    detail: "50% Merit Scholarship · AI & Math Merit · 2024",
  },
  {
    label:  "IIT Madras School Connect",
    value:  "Certified",
    detail: "Data Science & AI under Prof. Andrew Thangaraj",
  },
];

// Recognitions that are worth mentioning
export const recognitions: { what: string; detail: string }[] = [
  {
    what:   "National Heritage Quiz — Rank 2 & Rank 5",
    detail: "CBSE Heritage India Quiz · 2,300+ schools · Televised on History TV18",
  },
  {
    what:   "Published Author — 'A Soldier's Story'",
    detail: "Selected at the National Young Author's Fair from 200,000+ submissions",
  },
  {
    what:   "3× DSO U-19 Chess Representative",
    detail: "Consecutive years · also U-19 Football Player",
  },
  {
    what:   "Resera Hackathon — Runner-Up (2nd Place)",
    detail: "2026",
  },
];

// Certifications
export const certifications: string[] = [
  "IIT Madras — Data Science & AI",
  "Anthropic Claude 101",
  "Anthropic Claude Platform 101",
  "Anthropic Intro to MCP",
  "HackerRank Python (Gold)",
  "HackerRank CSS (Gold)",
  "Lighthouse Pathways 2.0 AI Bootcamp",
];

// Skills — just list them, no levels, no graphs
export const skills: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "AI & Data",
    items: ["TensorFlow", "Scikit-Learn", "Pandas", "LLM Integration", "Anthropic MCP"],
  },
  {
    category: "Tools",
    items: ["Git", "Figma", "Vercel", "VS Code", "Claude"],
  },
];
