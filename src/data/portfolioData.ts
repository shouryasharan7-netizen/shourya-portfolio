export interface RoleItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  type: string;
  category: "Engineering & AI" | "Leadership & Science" | "School Governance";
  badge: string;
  glow: "gold" | "cyan" | "purple" | "amber";
  badgeColor: string;
  description: string;
  responsibilities: string[];
  metrics: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  role: string;
  shortDesc: string;
  overview: string;
  impact: string;
  presentationVenue?: string;
  tags: string[];
  glow: "cyan" | "purple" | "amber" | "gold";
  icon: string;
}

export interface RecognitionItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  category: string;
  metric?: string;
  glow: "gold" | "cyan" | "purple" | "amber";
  badge: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  glow: "cyan" | "gold" | "purple";
}

export interface EducationItem {
  institution: string;
  period: string;
  classes: string;
  board: string;
  score: string;
  percentileText: string;
  location: string;
  highlights: string[];
}

export const PERSONAL_INFO = {
  name: "Shourya Sharan",
  title: "Researcher · Builder · UI Architect",
  tagline: "I don't think in disciplines. I think in problems.",
  phone: "+91 7666656784",
  email: "shouryasharan27@gmail.com",
  location: "Nagpur, India",
  github: "https://github.com/shouryasharan7-netizen",
  githubHandle: "shouryasharan7-netizen",
  portfolioUrl: "https://www.shouryasharan.xyz",
  bio: "Confluence of cognitive science, machine computation, and tactile visual design. Dedicated to first-principles problem solving—from training predictive neural networks and architecting responsive web platforms to leading academic initiatives and community operations.",
  stats: [
    { value: "1,400+", label: "STUDENTS REACHED", sub: "Cybersecurity & Digital Literacy" },
    { value: "97%", label: "CBSE BOARD SCORE", sub: "Top 1% Nationwide Cohort" },
    { value: "Top 5", label: "NATIONAL RANK", sub: "CBSE Heritage Quiz (TV Broadcast)" },
    { value: "$1,000", label: "HACKATHON PRIZES", sub: "Resera Runner-Up Grant" },
  ],
};

export const ROLES_DATA: RoleItem[] = [
  {
    id: "walnut-cso",
    role: "Chief Science Officer",
    organization: "The Walnut Initiative",
    period: "June 2026 – Present",
    type: "Independent STEM Publication & Outreach",
    category: "Leadership & Science",
    badge: "EXECUTIVE // SCIENCE",
    glow: "gold",
    badgeColor: "border-gold-500/40 text-gold-400 bg-gold-500/10",
    description:
      "Leading the scientific content strategy and rigorous peer-review pipeline for independent STEM publications, technical blogs, and research reports. Designed and authored comprehensive pedagogical frameworks for localized neuroscience workshops deployed across regional academic institutions in India to elevate cognitive science literacy.",
    responsibilities: [
      "Directed editorial peer-review and technical accuracy verification for all STEM whitepapers and publications.",
      "Designed neuroscience workshop curricula tailored for regional school deployment.",
      "Established pedagogical benchmarks for cognitive science education.",
    ],
    metrics: ["Regional schools reached", "Comprehensive pedagogical reports authored", "Peer-review pipeline established"],
  },
  {
    id: "descreened-web",
    role: "Freelance Web Developer & UI Architect",
    organization: "Descreened & The Walnut Initiative",
    period: "April 2026 – Present",
    type: "Platform Engineering & UI Architecture",
    category: "Engineering & AI",
    badge: "FULL-STACK // NEXT.JS",
    glow: "cyan",
    badgeColor: "border-cyan-neon/40 text-cyan-neon bg-cyan-neon/10",
    description:
      "Architected and deployed responsive, high-performance web platforms for technology and research initiatives utilizing React, Next.js, JavaScript, and HTML/CSS. Integrated AI-assisted engineering workflows (Claude, Qoder) to accelerate frontend prototyping and UI iteration cycles, driving 200+ unique user interactions across both platforms.",
    responsibilities: [
      "Engineered component libraries, tactile interactions, and responsive layouts.",
      "Integrated AI-assisted developer workflows (Claude, Qoder) for rapid UI iteration.",
      "Optimized Core Web Vitals, asset loading, and accessibility across devices.",
    ],
    metrics: ["200+ unique user interactions driven", "Full responsive Next.js deployment", "AI-accelerated design-to-code velocity"],
  },
  {
    id: "steminate-research",
    role: "Computational Researcher",
    organization: "STEMinate",
    period: "May 2026 – Present",
    type: "Machine Learning & Scientific Computing",
    category: "Engineering & AI",
    badge: "RESEARCH // TENSORFLOW",
    glow: "purple",
    badgeColor: "border-purple-400/40 text-purple-300 bg-purple-500/10",
    description:
      "Co-authoring computational research papers leveraging Python, Pandas, and Scikit-Learn for statistical data processing and feature engineering pipelines. Training and evaluating predictive machine learning models in TensorFlow to analyze structured multidimensional datasets.",
    responsibilities: [
      "Developed reproducible data manipulation pipelines using Pandas and NumPy.",
      "Trained and tuned classification/regression models using TensorFlow and Scikit-Learn.",
      "Synthesized empirical findings into rigorous academic manuscripts.",
    ],
    metrics: ["Co-authoring computational research papers", "End-to-end Python ML pipelines", "TensorFlow predictive model evaluation"],
  },
  {
    id: "thinkeconomics-tech",
    role: "Head Of Tech & Operations",
    organization: "ThinkEconomics Club",
    period: "May 2026 – Present",
    type: "Community Scaling & Systems Automation",
    category: "Leadership & Science",
    badge: "OPERATIONS // 50+ MEMBERS",
    glow: "amber",
    badgeColor: "border-amber-400/40 text-amber-300 bg-amber-500/10",
    description:
      "Managing digital infrastructure, technical integrations, and operational scaling for an active community of 50+ members. Streamlined club operations by combining economic frameworks with automated technical workflows for event logistics, communication, and knowledge repositories.",
    responsibilities: [
      "Engineered automated communication and registration workflows.",
      "Managed digital repositories and collaborative infrastructure for 50+ active participants.",
      "Synthesized economic principles into actionable operational roadmaps.",
    ],
    metrics: ["50+ active member community scaled", "Automated operational workflows", "Multi-stakeholder event technical logistics"],
  },
  {
    id: "bits-and-bytes",
    role: "Growth Associate",
    organization: "bits&bytes",
    period: "June 2026",
    type: "Outreach & Strategic Partnerships",
    category: "Leadership & Science",
    badge: "NONPROFIT // OUTREACH",
    glow: "gold",
    badgeColor: "border-gold-500/40 text-gold-400 bg-gold-500/10",
    description:
      "Spearheaded outreach operations for a 501(c)(3) cybersecurity nonprofit organization, establishing strategic partnerships with external institutions to deliver digital literacy and online safety education to 1,400+ students.",
    responsibilities: [
      "Identified and engaged educational institutions and community stakeholders.",
      "Structured outreach pipelines for cybersecurity curriculum distribution.",
      "Facilitated partner communications to maximize student participation.",
    ],
    metrics: ["1,400+ students empowered with digital literacy", "501(c)(3) institutional partnerships established", "Scalable outreach operational model"],
  },
  {
    id: "cps-house-captain",
    role: "Blue House Captain",
    organization: "Centre Point School, Amravati Road Bypass",
    period: "June 2024 – March 2025",
    type: "Student Body Executive Governance",
    category: "School Governance",
    badge: "GOVERNANCE // 300+ STUDENTS",
    glow: "cyan",
    badgeColor: "border-cyan-neon/40 text-cyan-neon bg-cyan-neon/10",
    description:
      "Directed a 7-member student core council to lead 300+ house members, orchestrating logistics, competitive strategy, and coordination across inter-house competitions, athletic meets, and school-wide ceremonial functions throughout the academic year.",
    responsibilities: [
      "Led and mentored 7 council executives across arts, sports, and academics.",
      "Strategized participation rosters for 300+ students in competitive events.",
      "Coordinated high-stakes school ceremonies and inter-house assemblies.",
    ],
    metrics: ["300+ house members led", "7-member executive council directed", "Full academic year event orchestration"],
  },
  {
    id: "cps-cyber-ambassador",
    role: "Cyber Congress Ambassador",
    organization: "Centre Point School, Amravati Road Bypass",
    period: "June 2023 – June 2025",
    type: "Digital Literacy & Information Security",
    category: "School Governance",
    badge: "SECURITY // MENTORSHIP",
    glow: "purple",
    badgeColor: "border-purple-400/40 text-purple-300 bg-purple-500/10",
    description:
      "Mentored a cohort of 100+ peers on identifying social engineering and phishing vectors, implementing multi-factor authentication protocols, and cultivating responsible digital footprint practices.",
    responsibilities: [
      "Conducted interactive threat awareness and password security demonstrations.",
      "Mentored younger cohorts on social media safety and privacy hygiene.",
      "Acted as primary student liaison for cyber safety incidents.",
    ],
    metrics: ["100+ peer students mentored", "Phishing & vector defense workshops", "2-year ambassadorship term"],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "ignicion",
    title: "Ignicion",
    category: "HERITAGE TECH // UI/UX DESIGN",
    role: "UI/UX Architect & Systems Designer",
    shortDesc:
      "Designed the complete UI/UX architecture for a mobile application bridging the youth-heritage knowledge gap, translating static historical data into interactive digital experiences.",
    overview:
      "Ignicion is an interactive mobile product designed to solve the cultural disconnect between modern youth and Indian historical heritage. Developed from first principles with full user research, custom design systems, gamified historical explorations, and interactive digital artifacts that make ancient architecture and history engaging for students.",
    impact:
      "Presented prototype at the competitive IGNICION summit hosted by Billabong High School, Mumbai, showcasing the intersection of cultural preservation and digital accessibility.",
    presentationVenue: "Billabong High School, Mumbai (IGNICION Summit)",
    tags: ["UI/UX Design", "Figma", "Design Systems", "Heritage Tech", "Mobile Architecture", "Accessibility"],
    glow: "cyan",
    icon: "🏛️",
  },
  {
    id: "cenquity",
    title: "Project Cenquity",
    category: "SMART WEARABLES // HARDWARE & AR",
    role: "Hardware & Tech Ideator",
    shortDesc:
      "Pitched a conceptual prototype for augmented reality (AR) smart glasses (similar to Meta Ray-Bans) at the Cenference Shark Tank event, focusing on accessible computing.",
    overview:
      "Project Cenquity reimagines computing by eliminating screen fatigue through lightweight, ergonomically sound optical waveguides. Formulated hardware chassis constraints, battery thermal dissipation models, heads-up spatial micro-interactions, and context-aware audio prompts for everyday accessibility.",
    impact:
      "Pitched to an executive investor panel at the Cenference Shark Tank event; recognized for bold accessible hardware vision and ambient computing architecture.",
    presentationVenue: "Cenference Shark Tank Pitch Forum",
    tags: ["AR Smart Glasses", "Wearable Tech", "Hardware Ideation", "Spatial UI", "Pitch Strategy", "Ergonomics"],
    glow: "purple",
    icon: "👓",
  },
  {
    id: "biosand-filter",
    title: "TGELF Biosand Filter Initiative",
    category: "COMMUNITY SERVICE // ENVIRONMENTAL TECH",
    role: "National Finalist · Team Lead",
    shortDesc:
      "Advanced to Round 3 nationally against 130 competing teams in the TGELF challenge, deploying low-cost Biosand water filters for clean water access in local households.",
    overview:
      "Engineered and constructed practical, multi-tiered biosand water filters utilizing biological layer predation, graded sand grain stratification, and gravel support beds. Targeted pathogen reduction and turbidity removal without requiring grid electricity, providing an affordable water filtration solution for local households in need.",
    impact:
      "Advanced to Round 3 nationally against 130 competing teams in the prestigious TGELF community service challenge; deployed functioning units directly providing clean water to families.",
    presentationVenue: "The Global Education & Leadership Foundation (TGELF)",
    tags: ["Environmental Engineering", "Biosand Filtration", "Social Impact", "National Round 3", "Deployments"],
    glow: "amber",
    icon: "💧",
  },
];

export const RECOGNITIONS_DATA: RecognitionItem[] = [
  {
    id: "cbse-heritage-quiz",
    year: "2024",
    title: "National Rank 2 & 5 — CBSE Heritage India Quiz",
    subtitle:
      "Secured consecutive Top-5 national finishes (Rank 2 in Class 9, Rank 5 in Class 10) out of 1,500 to 2,300+ participating schools nationwide. Competed in the nationally televised semi-finals broadcast on History TV18, reaching a digital audience of 50,000+ viewers.",
    category: "NATIONAL CHAMPIONSHIP",
    metric: "Rank 2 & 5 Nationally // 2,300+ Schools",
    glow: "gold",
    badge: "NATIONAL RANK 2 & 5",
  },
  {
    id: "resera-hackathon",
    year: "2026",
    title: "Resera Hackathon — Runner-Up (2nd Place)",
    subtitle:
      "Secured 2nd Place out of competitive developer cohorts, awarded prizes and developer grants totaling $1,000 in recognition of high-impact software execution.",
    category: "HACKATHON // SOFTWARE",
    metric: "$1,000 Prizes & Grants Awarded",
    glow: "cyan",
    badge: "2ND PLACE // $1,000 GRANT",
  },
  {
    id: "tgelf-initiative",
    year: "2024",
    title: "TGELF Biosand Filter Initiative — National Round 3",
    subtitle:
      "Advanced to Round 3 nationally against 130 competing teams in the TGELF community service challenge. Deployed low-cost Biosand water filters, directly impacting and providing clean water access to local households.",
    category: "SOCIAL IMPACT // ENGINEERING",
    metric: "Round 3 of 130 Teams Nationally",
    glow: "amber",
    badge: "ROUND 3 FINALIST",
  },
  {
    id: "published-author",
    year: "2023",
    title: "Published Author — National Young Author's Fair",
    subtitle:
      "Authored and published the book \"A Soldier's Story\" out of a highly competitive pool of 200,000 participating young authors nationwide.",
    category: "LITERATURE & PUBLICATION",
    metric: "1 of 200,000 Nationwide Submissions",
    glow: "purple",
    badge: "PUBLISHED BOOK",
  },
  {
    id: "academic-scholarship",
    year: "2025",
    title: "50% Academic Merit Scholarship (11th & 12th Grade)",
    subtitle:
      "Awarded a prestigious 50% academic scholarship by school administration based on Class 10 Board Exam performance (97% aggregate, placed in Top 1% cohort).",
    category: "ACADEMIC EXCELLENCE",
    metric: "97% Aggregate // Top 1% Cohort",
    glow: "gold",
    badge: "50% SCHOLARSHIP",
  },
  {
    id: "schoolhouse-maths",
    year: "2025",
    title: "Schoolhouse Maths Competition — Coupon Awardee",
    subtitle:
      "Raffle Winner of $25 Art of Problem Solving (AoPS) coupon in competitive mathematical problem-solving challenge.",
    category: "MATHEMATICS",
    metric: "$25 AoPS Prize Award",
    glow: "cyan",
    badge: "MATH PRIZE",
  },
  {
    id: "intach-heritage-quiz",
    year: "2024",
    title: "INTACH Heritage Quiz — 3rd Prize (City Level)",
    subtitle:
      "Awarded 3rd Prize at city level by the Indian National Trust for Art and Cultural Heritage (INTACH) for in-depth knowledge of historical monuments, cultural preservation, and national heritage.",
    category: "HERITAGE QUIZ",
    metric: "3rd Prize City Level",
    glow: "amber",
    badge: "CITY 3RD PRIZE",
  },
  {
    id: "chess-football-dso",
    year: "2022–2025",
    title: "U-19 DSO Chess (3 Consecutive Years) & DSO Football",
    subtitle:
      "Represented the school in U-19 District Sports Office (DSO) Chess for 3 consecutive years (Classes 9–11) and competed in U-19 DSO Shalaya Football, balancing high-level strategic competition with rigorous academics.",
    category: "ATHLETICS & STRATEGY",
    metric: "3 Consecutive Years DSO Representation",
    glow: "gold",
    badge: "DSO CHESS & FOOTBALL",
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    name: "AI & Data Science",
    issuer: "Indian Institute Of Technology (IIT) Madras",
    date: "July 2026",
    glow: "gold",
  },
  {
    name: "Python (Basic)",
    issuer: "HackerRank",
    date: "Verified Skill",
    glow: "cyan",
  },
  {
    name: "CSS (Basic)",
    issuer: "HackerRank",
    date: "Verified Skill",
    glow: "purple",
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "Centre Point School, Katol Road",
    period: "2025 – 2027",
    classes: "Class 11 – Class 12 (CBSE)",
    board: "CBSE Senior Secondary",
    score: "Class 11: 87%",
    percentileText: "Top 1% of cohort",
    location: "Nagpur, India",
    highlights: [
      "Rigorous focus on Advanced Mathematics, Physics, Chemistry, and Computer Science.",
      "Recipient of 50% Academic Merit Scholarship.",
      "Balancing high school academics with concurrent research at The Walnut Initiative & STEMinate.",
    ],
  },
  {
    institution: "Centre Point School, Amravati Road Bypass",
    period: "2023 – 2025",
    classes: "Class 9 – Class 10 (CBSE)",
    board: "CBSE Secondary Education",
    score: "Class 10 Board Exams: 97% Aggregate",
    percentileText: "Top 1% of cohort | Class 9: 94.6%",
    location: "Nagpur, India",
    highlights: [
      "Class 10 Board Exams: 97% Aggregate (Top 1% of cohort).",
      "Class 9 Academic Aggregate: 94.6%.",
      "Elected Blue House Captain directing 300+ students and Cyber Congress Ambassador.",
      "Rank 2 & 5 Nationwide in CBSE Heritage India Quiz.",
    ],
  },
];

export const SKILLS_DATA = {
  languagesAndFrameworks: [
    { name: "Python", category: "Scientific & ML" },
    { name: "JavaScript", category: "Core Web" },
    { name: "TypeScript", category: "Type-Safe Systems" },
    { name: "HTML / CSS", category: "Semantic Web" },
    { name: "React", category: "UI Engineering" },
    { name: "Next.js", category: "Full-Stack Architecture" },
  ],
  dataAndAI: [
    { name: "TensorFlow", category: "Deep Learning Models" },
    { name: "Pandas", category: "Data Manipulation" },
    { name: "Scikit-Learn", category: "Predictive ML" },
    { name: "K-means Clustering", category: "Unsupervised ML" },
    { name: "Neural Networks", category: "Model Architectures" },
  ],
  designAndWorkflows: [
    { name: "UI/UX Design", category: "Tactile Ergonomics & Systems" },
    { name: "Figma", category: "Design Tokens & Wireframes" },
    { name: "AI-Assisted Development", category: "Claude, Qoder, LLMs" },
    { name: "Three.js & WebGL", category: "Spatial 3D Experiences" },
  ],
  interests: [
    "Artificial Intelligence Policy",
    "Heritage Preservation via Tech",
    "Behavioral Economics",
    "Competitive Chess",
    "Football",
  ],
};
