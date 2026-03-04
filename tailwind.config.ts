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
          bg: "#0a0a0f",
          card: "#12121a",
          border: "#1e1e2e",
          accent: "#6c5ce7",
          "accent-light": "#a29bfe",
          neon: "#00f5d4",
          "neon-pink": "#f72585",
          "neon-yellow": "#fee440",
          gold: "#ffd700",
          silver: "#c0c0c0",
          bronze: "#cd7f32",
          success: "#00b894",
          danger: "#e17055",
          warning: "#fdcb6e",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        "battle-pulse": "battle-pulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(108, 92, 231, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(108, 92, 231, 0.6)" },
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
          "50%": { transform: "translateY(-10px)" },
        },
        "battle-pulse": {
          "0%, 100%": {
            borderColor: "rgba(108, 92, 231, 0.5)",
            boxShadow: "0 0 15px rgba(108, 92, 231, 0.2)",
          },
          "50%": {
            borderColor: "rgba(0, 245, 212, 0.8)",
            boxShadow: "0 0 30px rgba(0, 245, 212, 0.4)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "radial-gradient(circle at 25% 25%, rgba(108, 92, 231, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(0, 245, 212, 0.1) 0%, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
