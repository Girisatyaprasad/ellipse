import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        surface: {
          0: "#070b12",
          1: "#0b111b",
          2: "#101722",
          3: "#151e2a",
          4: "#1d2735",
          5: "#263241",
        },
        titanium: "#151e2a",
        slate: "#a9a39a",
        ink: "#f4f0e8",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        label: ["var(--font-geist)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "0.875rem",
        md: "0.625rem",
        sm: "0.375rem",
      },
      boxShadow: {
        luster: "inset 0 1px 0 rgba(244,240,232,0.06)",
        float: "0 24px 80px rgba(0,0,0,0.32)",
      },
      maxWidth: {
        shell: "1200px",
      },
    },
  },
  plugins: [animate],
};

export default config;
