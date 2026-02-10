// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Tablet-spezifische Breakpoints
      // Neue Breakpoint-Strategie
      screens: {
        'xs': '475px',          // Smartphone Landscape
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'nav-desktop': '1100px', // Umschaltpunkt für Desktop-Navigation
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',         // Ultra-wide
      },
      colors: {
        "accent-green": "#3399FF",
        "brand-blue": "#3399FF",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          '2xl': '1400px', // Nur eine max-width Begrenzung ganz oben
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-roboto-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      // Verbesserte Spacing für Tablets
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "infinite-scroll":
          "infinite-scroll calc(var(--image-count) * 6s) linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"), // ✅ hinzugefügt
  ],
};

export default config;
