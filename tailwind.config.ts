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
        arena: {
          bg: "#06060b",
          card: "#0f0f18",
          border: "#1a1a2e",
          accent: "#7c3aed",
          "accent-light": "#a78bfa",
          neon: "#06d6a0",
          "neon-pink": "#f72585",
          "neon-yellow": "#fbbf24",
          gold: "#fbbf24",
          silver: "#9ca3af",
          bronze: "#d97706",
          success: "#10b981",
          danger: "#ef4444",
          warning: "#f59e0b",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        float: "float 4s ease-in-out infinite",
        "battle-pulse": "battle-pulse 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.2)" },
          "50%": { boxShadow: "0 0 50px rgba(124, 58, 237, 0.4)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "battle-pulse": {
          "0%, 100%": {
            borderColor: "rgba(124, 58, 237, 0.4)",
            boxShadow: "0 0 20px rgba(124, 58, 237, 0.15)",
          },
          "50%": {
            borderColor: "rgba(6, 214, 160, 0.6)",
            boxShadow: "0 0 40px rgba(6, 214, 160, 0.2)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 214, 160, 0.08) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
