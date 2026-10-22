import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#111110" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shouryasharan.xyz"),
  title: "Shourya Sharan",
  description:
    "17-year-old from Nagpur. I build things with React and Python, research LLM-based cybersecurity, run a city chapter of bits&bytes, and play chess.",
  openGraph: {
    title: "Shourya Sharan",
    description:
      "Developer · Researcher · Chess player. Based in Nagpur, India.",
    url: "https://www.shouryasharan.xyz",
    siteName: "Shourya Sharan",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shourya Sharan",
    description: "Developer · Researcher · Chess player. Based in Nagpur, India.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${mono.variable}`}
    >
      <head>
        {/* Prevent flash of wrong theme — runs before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-accent focus:text-white focus:px-3 focus:py-1 focus:text-sm focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
