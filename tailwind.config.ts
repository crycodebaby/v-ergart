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
        // Ergart-Brand. Die Werte liegen ausschliesslich in globals.css —
        // hier stehen nur Verweise, damit es keine zweite Wahrheit gibt.
        brand: "hsl(var(--brand))",
        "brand-solid": "hsl(var(--brand-solid))",
        "brand-strong": "hsl(var(--brand-strong))",
        "brand-solid-hover": "hsl(var(--brand-solid-hover))",

        // Semantische Textrolle: text-brand-text entscheidet selbst ueber
        // das Theme. Am Call Site kein dark:-Paar mehr noetig.
        "brand-text": "hsl(var(--brand-text))",

        // Bestandsnamen, jetzt als Alias auf denselben Token.
        // "brand-blue" wird projektweit ~200x verwendet und bleibt
        // deshalb gueltig; der frueher hier hartkodierte #3399FF entfaellt.
        "brand-blue": "hsl(var(--brand))",
        "accent-green": "hsl(var(--brand))",

        "surface-inverse": "hsl(var(--surface-inverse))",
        "foreground-inverse": "hsl(var(--foreground-inverse))",

        // Anbindung der bereits in globals.css definierten shadcn/ui-CSS-Variablen.
        // Die Variablen liegen dort als reine HSL-Kanäle vor (z. B. "222.2 84% 4.9%"),
        // deshalb hier der hsl()-Wrapper. Ohne dieses Mapping erzeugen Klassen wie
        // bg-background, text-muted-foreground oder border-border keinerlei CSS.
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // Anbindung der vorhandenen --radius-Variable. Bewusst nur lg/md/sm –
      // xl, 2xl, 3xl und full behalten die Tailwind-Defaults.
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
