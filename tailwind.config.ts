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
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: "#FCF9EE",
          100: "#F7F0D6",
          200: "#EEDFAC",
          300: "#E4CA7E",
          400: "#DBB755",
          500: "#D4AF37", // Imperial Gold
          600: "#B89228",
          700: "#8C6E1D",
          800: "#634E16",
          900: "#3D300F",
        },
        obsidian: {
          950: "#030305",
          900: "#07070B",
          800: "#0E0E16",
          700: "#161622",
          600: "#222234",
        },
        cyan: {
          neon: "#00F0FF",
          glow: "rgba(0, 240, 255, 0.4)",
        }
      },
      fontFamily: {
        sans: ["var(--font-space)", "system-ui", "sans-serif"],
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(212, 175, 55, 0.35)',
        'cyan-glow': '0 0 35px -5px rgba(0, 240, 255, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
