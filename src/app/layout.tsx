import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Shourya Sharan — The Strategist",
  description:
    "Researcher, builder, captain. A 17-year-old polymath exploring where cognition meets computation. Chief Science Officer at The Walnut Initiative, Computational Researcher at STEMinate, National Rank 2 Heritage Quiz, District Chess player.",
  keywords: [
    "Shourya Sharan",
    "portfolio",
    "researcher",
    "AI",
    "machine learning",
    "chess",
    "strategist",
    "web developer",
  ],
  authors: [{ name: "Shourya Sharan" }],
  openGraph: {
    title: "Shourya Sharan — The Strategist",
    description:
      "Researcher · Builder · Captain. Exploring where cognition meets computation.",
    url: "https://shouryasharan.xyz",
    siteName: "Shourya Sharan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shourya Sharan — The Strategist",
    description:
      "Researcher · Builder · Captain. A cinematic portfolio experience.",
  },
  robots: { index: true, follow: true },
};

import { AudioProvider } from "@/components/ui/AudioProvider";
import { InteractiveCanvas } from "@/components/ui/InteractiveCanvas";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="custom-cursor-active relative">
        <AudioProvider>
          <InteractiveCanvas />
          {children}
        </AudioProvider>
        {/* Film grain overlay */}
        <div className="film-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
