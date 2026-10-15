// ============================================================
// SHOURYA SHARAN — CHRONO-CYBERNETIC PORTFOLIO DATA
// ============================================================

export const PERSONAL_INFO = {
  name: "Shourya Sharan",
  title: "AI Researcher · Full-Stack Architect · Cybersecurity Leader",
  tagline: "Architecting at the intersection of Cultural Heritage, Neural Intelligence & Cyber Defense.",
  email: "shouryasharan27@gmail.com",
  phone: "+91 7666656784",
  location: "Nagpur, Maharashtra, India",
  coordinates: "21.1458° N, 79.0882° E",
  github: "https://github.com/shouryasharan7-netizen",
  portfolioUrl: "https://www.shouryasharan.xyz",
};

// ============================================================
// ACT I — HERO
// ============================================================
export const HERO_SUBTITLE_WORDS = [
  "ARCHITECTING",
  "AT THE INTERSECTION OF",
  "CULTURAL HERITAGE,",
  "NEURAL INTELLIGENCE",
  "& CYBER DEFENSE.",
];

// ============================================================
// ACT II — DUALITY ENGINE (Academic Pedigree)
// ============================================================
export const CLASSICAL_MIND = [
  {
    id: "cbse10",
    label: "CBSE Class X · 2023",
    value: "97%",
    sub: "Top 0.1% Nationally",
    certs: ["Sanskrit Merit Certificate", "Information Technology Merit Certificate"],
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "cbse11",
    label: "CBSE Class XI · 2024",
    value: "87%",
    sub: "Top 1% of Cohort",
    certs: ["Mathematics Merit Certificate", "AI Merit Certificate", "50% Academic Merit Scholarship"],
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: "iitm",
    label: "IIT Madras School Connect",
    value: "AI/DS",
    sub: "Under Prof. Andrew Thangaraj",
    certs: ["Data Science & AI Certification", "Python · Pandas · Scikit-Learn · TensorFlow · Neural Networks"],
    color: "from-cyan-400 to-teal-500",
  },
];

export const STRATEGIST_CARDS = [
  {
    id: "author",
    icon: "BookOpen",
    label: "Published Author",
    title: "\"A Soldier's Story\"",
    detail: "Selected from 200,000+ authors at the National Young Author's Fair.",
    tag: "Heritage",
    accent: "#F59E0B",
  },
  {
    id: "quiz",
    icon: "Trophy",
    label: "National Heritage Quiz Titan",
    title: "National Rank 2 (Gr.9) · Rank 5 (Gr.10)",
    detail: "CBSE Heritage India Quiz out of 2,300+ schools. Televised on History TV18 — 50,000+ viewers.",
    tag: "Competitive",
    accent: "#EA580C",
  },
  {
    id: "athlete",
    icon: "Swords",
    label: "Varsity Athlete & Tactician",
    title: "3× DSO U-19 Chess Rep · U-19 Football",
    detail: "3-time consecutive DSO U-19 Chess Representative and U-19 Football Player.",
    tag: "Sport",
    accent: "#7B2CBF",
  },
];

// ============================================================
// ACT III — COMMAND CENTER (Leadership & Impact)
// ============================================================
export interface CommandStation {
  id: string;
  org: string;
  role: string;
  period: string;
  type: "Engineering" | "Cybersecurity" | "Science" | "Economics" | "Governance";
  impact: string;
  metrics: string[];
  accent: string;
  icon: string;
}

export const COMMAND_STATIONS: CommandStation[] = [
  {
    id: "zo",
    org: "Zo Initiative",
    role: "Software Engineering Lead",
    period: "July 2026 – Present",
    type: "Engineering",
    impact: "Architecting full-stack solutions, directing cross-functional engineering teams, and managing global technical roadmaps.",
    metrics: ["Full-Stack Architecture", "Cross-Functional Teams", "Global Roadmaps"],
    accent: "#00F5D4",
    icon: "Code2",
  },
  {
    id: "bitsnbytes",
    org: "bits&bytes — Nagpur Fork",
    role: "Fork Lead · City Operations",
    period: "June 2026 – Present",
    type: "Cybersecurity",
    impact: "Leading city operations for the 501(c)(3) cybersecurity nonprofit; curating city-wide hackathons and cybersecurity workshops.",
    metrics: ["1,400+ Beneficiaries", "501(c)(3) Nonprofit", "City-wide Hackathons"],
    accent: "#10B981",
    icon: "Shield",
  },
  {
    id: "walnut",
    org: "The Walnut Initiative",
    role: "Chief Science Officer",
    period: "June 2026 – Present",
    type: "Science",
    impact: "Directing scientific content strategy, peer-review processes, and localized neuroscience pedagogy reports for regional schools.",
    metrics: ["Peer-Review Oversight", "Neuroscience Pedagogy", "Regional School Outreach"],
    accent: "#7B2CBF",
    icon: "Brain",
  },
  {
    id: "thinkeco",
    org: "ThinkEconomics Club",
    role: "Head of Tech & Operations",
    period: "May 2026 – Present",
    type: "Economics",
    impact: "Merging economic frameworks with automated technical workflows for a 50+ member community.",
    metrics: ["50+ Members", "Automated Workflows", "Economic × Tech Fusion"],
    accent: "#F59E0B",
    icon: "TrendingUp",
  },
  {
    id: "cps",
    org: "Centre Point School",
    role: "Blue House Captain · Cyber Congress Ambassador",
    period: "2023 – 2026",
    type: "Governance",
    impact: "Directed a 7-member council for 200+ students; mentored 100+ peers on phishing vectors and digital security.",
    metrics: ["200+ Students", "100+ Mentored", "Phishing & Cyber Defense"],
    accent: "#EA580C",
    icon: "Users",
  },
];

// ============================================================
// ACT IV — INNOVATION VAULT (Projects)
// ============================================================
export interface ProjectDossier {
  id: string;
  category: "RESEARCH" | "HERITAGE-TECH" | "ED-TECH" | "WEB-ARCH" | "HARDWARE" | "COMMUNITY";
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  impact: string;
  link?: string;
  accent: string;
  classified: boolean;
}

export const INNOVATION_VAULT: ProjectDossier[] = [
  {
    id: "llm-cyber",
    category: "RESEARCH",
    title: "LLM Cybersecurity Threat Detection",
    subtitle: "STEMinate Computational Researcher",
    description: "Co-authoring \"How Can LLMs Enhance Cybersecurity Intelligent Systems for Real-Time Threat Detection?\" — a research paper exploring multi-layer threat classification using large language models fused with classical ML pipelines.",
    tech: ["Python", "Pandas", "Scikit-Learn", "LLM Integration", "Threat Vector Analysis"],
    impact: "Real-time packet threat detection simulation with neural classification layers.",
    accent: "#00F5D4",
    classified: false,
  },
  {
    id: "ignicion",
    category: "HERITAGE-TECH",
    title: "Ignicion Mobile App",
    subtitle: "UI/UX & Product Strategy",
    description: "Bridging the youth-heritage knowledge gap by turning static history into interactive digital experiences. Designed end-to-end UI/UX and product strategy from zero-to-one. Presented at IGNICION Innovation Conclave 2025, Mumbai.",
    tech: ["Figma", "UI/UX Design", "Product Strategy", "Heritage Tech", "Interactive Storytelling"],
    impact: "Presented at IGNICION Innovation Conclave 2025, Mumbai. Recognized as a top innovative heritage-tech solution.",
    accent: "#F59E0B",
    classified: false,
  },
  {
    id: "sat-vocab",
    category: "ED-TECH",
    title: "SAT Vocabulary Gamification Platform",
    subtitle: "Sole Developer · Full-Stack Web App",
    description: "Interactive web application engineered for active recall and spaced repetition. Built entirely solo with a gamified UX that transforms rote memorization into progressive skill-building challenges.",
    tech: ["React", "Next.js", "Tailwind CSS", "Game Design Patterns", "Active Recall UX"],
    impact: "350+ unique user sessions. Live at satvocab.xyz.",
    link: "https://www.satvocab.xyz",
    accent: "#7B2CBF",
    classified: false,
  },
  {
    id: "web-arch",
    category: "WEB-ARCH",
    title: "Production Web Architecture Portfolio",
    subtitle: "Shourya Roof · Descreened · The Walnut Initiative",
    description: "Full-stack responsive production platforms engineered with React, Next.js, and AI-assisted workflows (Claude MCP, Anthropic APIs). Each platform serves live enterprise customer pipelines with measurable impact.",
    tech: ["React", "Next.js", "Claude MCP", "Anthropic APIs", "Vercel Edge", "TypeScript"],
    impact: "500+ unique user interactions across live production deployments.",
    accent: "#10B981",
    classified: false,
  },
  {
    id: "cenquity",
    category: "HARDWARE",
    title: "Project Cenquity — Smart AR Wearables",
    subtitle: "Hardware Ideation · Cenference 2025",
    description: "Conceptual AR smart glasses pitch focused on accessible wearable computing for developing markets. Challenged the paradigm of exclusivity in AR hardware by designing for cost-constrained environments.",
    tech: ["AR/XR Concepts", "Hardware Prototyping", "Market Research", "Pitch Design"],
    impact: "Pitched at Cenference 2025. Conceptually validated for developing-market accessibility.",
    accent: "#EA580C",
    classified: true,
  },
  {
    id: "biosand",
    category: "COMMUNITY",
    title: "TGELF Biosand Filter Initiative",
    subtitle: "National Finalist · Top 3% · Social Impact",
    description: "Developed and deployed low-cost biosand water filtration systems to local households. Engineered for zero-electricity operation in resource-constrained communities using locally-available materials.",
    tech: ["Social Engineering", "Water Filtration", "Community Deployment", "Impact Measurement"],
    impact: "National Finalist — Top 3% out of 130 teams. Deployed to local households in Nagpur.",
    accent: "#F59E0B",
    classified: false,
  },
];

// ============================================================
// ACT V — NEURAL ARSENAL (Skills)
// ============================================================
export interface SkillNode {
  id: string;
  label: string;
  category: "Core Stack" | "AI & Data Science" | "Tools & Infra" | "Cybersecurity";
  level: number; // 1–10
  connections: string[]; // IDs of connected nodes
  accent: string;
}

export const SKILL_NODES: SkillNode[] = [
  // Core Stack
  { id: "python", label: "Python", category: "Core Stack", level: 9, connections: ["tensorflow", "scikit", "pandas", "llm"], accent: "#00F5D4" },
  { id: "js", label: "JavaScript", category: "Core Stack", level: 9, connections: ["react", "nextjs", "html"], accent: "#00F5D4" },
  { id: "react", label: "React", category: "Core Stack", level: 9, connections: ["nextjs", "tailwind", "js"], accent: "#00F5D4" },
  { id: "nextjs", label: "Next.js", category: "Core Stack", level: 9, connections: ["react", "ts", "tailwind"], accent: "#00F5D4" },
  { id: "ts", label: "TypeScript", category: "Core Stack", level: 8, connections: ["react", "nextjs"], accent: "#00F5D4" },
  { id: "html", label: "HTML/CSS", category: "Core Stack", level: 9, connections: ["tailwind", "js"], accent: "#00F5D4" },
  { id: "tailwind", label: "Tailwind CSS", category: "Core Stack", level: 9, connections: ["react", "html"], accent: "#00F5D4" },
  // AI & DS
  { id: "tensorflow", label: "TensorFlow", category: "AI & Data Science", level: 8, connections: ["python", "scikit", "llm"], accent: "#7B2CBF" },
  { id: "scikit", label: "Scikit-Learn", category: "AI & Data Science", level: 8, connections: ["python", "pandas", "tensorflow"], accent: "#7B2CBF" },
  { id: "pandas", label: "Pandas", category: "AI & Data Science", level: 8, connections: ["python", "scikit"], accent: "#7B2CBF" },
  { id: "llm", label: "LLM Integration", category: "AI & Data Science", level: 8, connections: ["python", "mcp", "tensorflow"], accent: "#7B2CBF" },
  { id: "mcp", label: "Anthropic MCP", category: "AI & Data Science", level: 8, connections: ["llm", "python"], accent: "#7B2CBF" },
  { id: "nn", label: "Neural Networks", category: "AI & Data Science", level: 7, connections: ["tensorflow", "scikit", "llm"], accent: "#7B2CBF" },
  // Cybersecurity
  { id: "cyber", label: "Cybersecurity", category: "Cybersecurity", level: 8, connections: ["phishing", "threatvec"], accent: "#10B981" },
  { id: "phishing", label: "Phishing Defense", category: "Cybersecurity", level: 8, connections: ["cyber"], accent: "#10B981" },
  { id: "threatvec", label: "Threat Vectors", category: "Cybersecurity", level: 7, connections: ["cyber", "llm"], accent: "#10B981" },
];

export const CERTIFICATIONS = [
  { label: "IIT Madras — Data Science & AI", issuer: "IIT Madras", accent: "#00F5D4" },
  { label: "Anthropic Claude 101", issuer: "Anthropic", accent: "#7B2CBF" },
  { label: "Anthropic Claude Platform 101", issuer: "Anthropic", accent: "#7B2CBF" },
  { label: "Anthropic Intro to MCP", issuer: "Anthropic", accent: "#7B2CBF" },
  { label: "HackerRank Python (Gold)", issuer: "HackerRank", accent: "#10B981" },
  { label: "HackerRank CSS (Gold)", issuer: "HackerRank", accent: "#10B981" },
  { label: "Lighthouse Pathways 2.0 AI Bootcamp", issuer: "Lighthouse", accent: "#F59E0B" },
  { label: "Resera Hackathon — Runner-Up (2nd Place)", issuer: "Resera", accent: "#EA580C" },
];

// ============================================================
// TERMINAL COMMANDS (Epilogue)
// ============================================================
export const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  skills     — View full tech arsenal",
    "  email      — Copy email to clipboard",
    "  github     — Open GitHub profile",
    "  chess      — Let's play (coming soon)",
    "  location   — Nagpur, India coordinates",
    "  clear      — Clear terminal",
  ],
  skills: [
    "CORE STACK: Python · JS · React · Next.js · TypeScript · Tailwind CSS",
    "AI & DATA:  TensorFlow · Scikit-Learn · Pandas · LLM Integration · Anthropic MCP",
    "SECURITY:   Threat Vector Analysis · Phishing Defense · Cybersecurity Ops",
  ],
  email: ["📧 shouryasharan27@gmail.com", "✓  Copied to clipboard."],
  github: ["Opening github.com/shouryasharan7-netizen..."],
  chess: ["♟  Chess mode: Coming in the next deploy. Watch this space."],
  location: [
    "📍 Nagpur, Maharashtra, India",
    "   21.1458° N, 79.0882° E",
    "   UTC+5:30 · IST",
  ],
  clear: [],
};
