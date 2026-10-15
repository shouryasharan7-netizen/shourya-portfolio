import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050508",
        charcoal: "#0B0C10",
        cyber: {
          cyan: "#00F5D4",
          violet: "#7B2CBF",
          emerald: "#10B981",
        },
        gold: "#F59E0B",
        terracotta: "#EA580C",
      },
      fontFamily: {
        display: ["Syne", "system-ui", "sans-serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      animation: {
        "ticker": "tickerScroll 35s linear infinite",
        "grain": "grain 0.3s steps(1) infinite",
        "float": "float 6s ease-in-out infinite",
        "blink": "blink 1s steps(1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
