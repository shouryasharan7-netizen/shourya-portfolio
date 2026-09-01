import type { Metadata } from "next";
import { Space_Grotesk, Cinzel, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CyberCursor } from "@/components/ui/CyberCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Shourya Sharan // Cyber-Imperial 3D Matrix",
  description: "Researcher, Builder, Designer. Chief Science Officer at The Walnut Initiative & Computational Researcher at STEMinate. 3D WebGL Portfolio.",
  keywords: ["Shourya Sharan", "Portfolio", "3D WebGL", "Three.js", "Researcher", "UI/UX", "Next.js", "Nagpur"],
  authors: [{ name: "Shourya Sharan" }],
  openGraph: {
    title: "Shourya Sharan // 3D Spatial Domain",
    description: "I don't think in disciplines — I think in problems. Explore the 3D WebGL ecosystem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${cinzel.variable} ${jetbrainsMono.variable} antialiased bg-[#030305] text-[#F8F9FA] min-h-screen selection:bg-gold-500 selection:text-black overflow-x-hidden`}
      >
        <div className="film-grain" />
        <CyberCursor />
        {children}
      </body>
    </html>
  );
}
