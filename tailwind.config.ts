import type { Config } from "tailwindcss"

const config = {
  darkMode: ["selector"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
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
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'Cambria', 'serif'],
      },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            fontFamily: 'var(--font-lora), Georgia, Cambria, serif',
            lineHeight: '1.85',
            color: 'hsl(var(--foreground))',
            p: {
              color: 'hsl(var(--foreground))',
              marginBottom: '1.75em',
            },
            h1: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
            },
            h2: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
              marginTop: '2.25em',
            },
            h3: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
              marginTop: '1.75em',
            },
            h4: {
              color: 'hsl(var(--foreground))',
              fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
              marginTop: '1.5em',
            },
            li: {
              color: 'hsl(var(--foreground))',
            },
            strong: {
              color: 'hsl(var(--foreground))',
              fontWeight: '700',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '3px',
              borderLeftColor: 'hsl(var(--primary))',
              backgroundColor: 'hsl(var(--muted))',
              padding: '1em 1.25em',
              borderRadius: '0 0.375rem 0.375rem 0',
            },
            code: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '0.25rem',
              padding: '0.25rem',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              '&::before': { content: '"" !important' },
              '&::after': { content: '"" !important' },
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              code: {
                backgroundColor: 'transparent',
                color: 'inherit',
                padding: '0',
              },
            },
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary))',
                opacity: 0.8,
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config

export default config
