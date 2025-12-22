import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(160, 100%, 25%)", // Изумрудный
          foreground: "hsl(0, 0%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(170, 70%, 85%)", // Мятный
          foreground: "hsl(0, 0%, 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84.2%, 60.2%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(0, 0%, 14.9%)",
          foreground: "hsl(0, 0%, 63.9%)",
        },
        accent: {
          DEFAULT: "hsl(160, 100%, 35%)", // Изумрудный светлый
          foreground: "hsl(0, 0%, 98%)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundColor: {
        'dark-green': 'hsl(160, 100%, 25%)',
        'light-green': 'hsl(160, 100%, 35%)',
        'dark-black': 'hsl(0, 0%, 10%)',
        'neon-accent': 'hsl(160, 100%, 45%)',
        'mint': 'hsl(170, 70%, 85%)',
      },
      textColor: {
        'dark-green': 'hsl(160, 100%, 25%)',
        'light-green': 'hsl(160, 100%, 35%)',
        'dark-black': 'hsl(0, 0%, 10%)',
        'neon-accent': 'hsl(160, 100%, 45%)',
        'mint': 'hsl(170, 70%, 85%)',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        base: 'clamp(1rem, 1rem + 0.5vw, 1.125rem)',
        lg: 'clamp(1.125rem, 1.125rem + 0.75vw, 1.4rem)',
        xl: 'clamp(1.25rem, 1.25rem + 1vw, 1.7rem)',
      },
      lineHeight: {
        snug: '1.4',
        relaxed: '1.6',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
export default config
