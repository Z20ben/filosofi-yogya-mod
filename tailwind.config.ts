import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Javanese-inspired color palette (using CSS variables for dark mode support)
        'javanese-brown-text': 'var(--javanese-brown-text)',
        'javanese-brown-bg': 'var(--javanese-brown-bg)',
        'javanese-brown': 'var(--javanese-brown-text)', // Backward compatibility - defaults to text
        'javanese-gold': 'var(--javanese-gold)',
        'javanese-ivory': 'var(--javanese-ivory)',
        'javanese-green': 'var(--javanese-green)',
        'javanese-terracotta': 'var(--javanese-terracotta)',

        // Javanese colors with RGB format for opacity modifier support
        // Usage: bg-javanese-gold/20, border-javanese-gold/30, text-javanese-brown/60
        javanese: {
          brown: 'rgb(74 44 42 / <alpha-value>)',       // #4A2C2A
          gold: 'rgb(212 175 55 / <alpha-value>)',      // #D4AF37
          ivory: 'rgb(255 255 240 / <alpha-value>)',    // #FFFFF0
          green: 'rgb(44 95 45 / <alpha-value>)',       // #2C5F2D
          terracotta: 'rgb(198 93 59 / <alpha-value>)', // #C65D3B
        },

        // Static gold color for UI elements (doesn't change in dark mode)
        'gold': {
          DEFAULT: '#D4AF37',
          50: 'rgba(212, 175, 55, 0.05)',
          100: 'rgba(212, 175, 55, 0.1)',
          200: 'rgba(212, 175, 55, 0.2)',
        },

        // Semantic colors with CSS variables for theme switching
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
