import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shouryasharan.xyz"),
  title: "Shourya Sharan — AI Researcher · Full-Stack Architect · Cybersecurity Leader",
  description:
    "Official portfolio of Shourya Sharan — AI Researcher, Full-Stack Architect, Cybersecurity Leader, and Heritage-Tech Innovator based in Nagpur, India. Architecting at the intersection of Cultural Heritage, Neural Intelligence & Cyber Defense.",
  keywords: [
    "Shourya Sharan",
    "AI Researcher",
    "Full-Stack Architect",
    "Cybersecurity",
    "Next.js",
    "React",
    "Python",
    "TensorFlow",
    "Nagpur",
    "IIT Madras",
    "bits&bytes",
    "The Walnut Initiative",
    "STEMinate",
  ],
  authors: [{ name: "Shourya Sharan", url: "https://www.shouryasharan.xyz" }],
  creator: "Shourya Sharan",
  alternates: { canonical: "https://www.shouryasharan.xyz" },
  openGraph: {
    title: "Shourya Sharan — AI Researcher · Full-Stack Architect · Cybersecurity Leader",
    description:
      "Architecting at the intersection of Cultural Heritage, Neural Intelligence & Cyber Defense. Portfolio of Shourya Sharan — AI Researcher, Full-Stack Architect, and Cybersecurity Leader.",
    url: "https://www.shouryasharan.xyz",
    siteName: "Shourya Sharan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shourya Sharan — AI Researcher · Full-Stack Architect · Cybersecurity Leader",
    description: "Architecting at the intersection of Cultural Heritage, Neural Intelligence & Cyber Defense.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shourya Sharan",
    jobTitle: "AI Researcher, Full-Stack Architect, Cybersecurity Leader",
    description:
      "Architecting at the intersection of Cultural Heritage, Neural Intelligence & Cyber Defense.",
    url: "https://www.shouryasharan.xyz",
    sameAs: ["https://github.com/shouryasharan7-netizen"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "India",
    },
    knowsAbout: [
      "AI Research",
      "Machine Learning",
      "Cybersecurity",
      "Full-Stack Development",
      "React",
      "Next.js",
      "Python",
      "TensorFlow",
      "LLM Integration",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#050508] text-[#E8E8F0] overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
