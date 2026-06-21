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
          0: "#090909",
          1: "#0d0d0d",
          2: "#121212",
          3: "#1a1a1a",
          4: "#201f1f",
          5: "#2a2a2a",
        },
        titanium: "#1c1c1c",
        slate: "#94a3b8",
        ink: "#e5e2e1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        label: ["var(--font-geist)", "Geist", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      boxShadow: {
        luster: "inset 0 1px 0 rgba(255,255,255,0.08)",
        float: "0 24px 80px rgba(0,0,0,0.45)",
      },
      maxWidth: {
        shell: "1200px",
      },
    },
  },
  plugins: [animate],
};

export default config;
