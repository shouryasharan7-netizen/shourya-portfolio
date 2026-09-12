import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CyberCursor } from "@/components/ui/CyberCursor";
import { PERSONAL_INFO } from "@/data/portfolioData";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030305",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shouryasharan.xyz"),
  title: "Shourya Sharan // Researcher · Builder · UI Architect",
  description:
    "Official portfolio of Shourya Sharan. Chief Science Officer at The Walnut Initiative, Computational Researcher at STEMinate, and Freelance UI Architect.",
  keywords: [
    "Shourya Sharan",
    "Portfolio",
    "Chief Science Officer",
    "The Walnut Initiative",
    "STEMinate",
    "Machine Learning",
    "TensorFlow",
    "UI/UX Architecture",
    "Next.js",
    "React",
    "Nagpur",
    "IIT Madras AI",
  ],
  authors: [{ name: "Shourya Sharan", url: "https://www.shouryasharan.xyz" }],
  creator: "Shourya Sharan",
  alternates: {
    canonical: "https://www.shouryasharan.xyz",
  },
  openGraph: {
    title: "Shourya Sharan // Researcher · Builder · UI Architect",
    description:
      "I don't think in disciplines — I think in problems. Explore research, platforms, inventions, and leadership initiatives.",
    url: "https://www.shouryasharan.xyz",
    siteName: "Shourya Sharan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shourya Sharan // Researcher · Builder · UI Architect",
    description:
      "Chief Science Officer at The Walnut Initiative, Computational Researcher at STEMinate, Freelance UI Architect.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.bio,
    url: PERSONAL_INFO.portfolioUrl,
    sameAs: [
      PERSONAL_INFO.github,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nagpur",
      addressCountry: "India",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Centre Point School",
      },
    ],
    knowsAbout: [
      "Cognitive Science",
      "Machine Learning",
      "Python",
      "TensorFlow",
      "Next.js",
      "UI/UX Design",
      "Cybersecurity",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${cinzel.variable} ${jetbrainsMono.variable} antialiased bg-[#030305] text-[#F8F9FA] min-h-screen selection:bg-gold-500 selection:text-black overflow-x-hidden`}
      >
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:bg-gold-400 focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:rounded-sm focus:shadow-[0_0_20px_#D4AF37] focus:outline-none"
        >
          Skip to main content
        </a>

        <div className="film-grain" aria-hidden="true" />
        <CyberCursor />
        {children}
      </body>
    </html>
  );
}
