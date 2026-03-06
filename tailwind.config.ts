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
        background: "#0A0A0A",
        surface: "#141416",
        foreground: "#FAFAFA",
        muted: "#a1a1aa",
        accent: "#C6A45C",
        "accent-hover": "#d4b876",
        gold: "#C6A45C",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
        medium: "0 4px 25px -5px rgba(0,0,0,0.1), 0 10px 30px -5px rgba(0,0,0,0.04)",
        hard: "0 10px 40px -10px rgba(0,0,0,0.2)",
      },
      spacing: {
        section: "6rem",
        "section-lg": "8rem",
      },
    },
  },
  plugins: [],
};
export default config;
