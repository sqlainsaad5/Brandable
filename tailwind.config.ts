import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "#F8F4EC",
        surface: "#FFFFFF",
        foreground: "#221F1B",
        muted: "#6B6560",
        border: "#E4DDCF",
        primary: "#143D2B",
        "primary-hover": "#0E2E20",
        "primary-foreground": "#FFFFFF",
        "accent-rose": "#B8776D",
        "accent-brass": "#9C7A3C",
        placeholder: "#F0EBE0",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.75rem",
      },
      boxShadow: {
        soft: "0 2px 14px -3px rgba(34,31,27,0.06), 0 8px 18px -4px rgba(34,31,27,0.04)",
        medium: "0 4px 22px -5px rgba(34,31,27,0.08), 0 10px 28px -6px rgba(34,31,27,0.04)",
        hard: "0 12px 40px -12px rgba(34,31,27,0.14)",
      },
      spacing: {
        section: "5rem",
        "section-lg": "6rem",
      },
    },
  },
  plugins: [],
};
export default config;
