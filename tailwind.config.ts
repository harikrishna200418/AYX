import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00236f',
          container: '#1e3a8a',
        },
        'on-primary': '#ffffff',
        secondary: {
          DEFAULT: '#0058be',
          container: '#2170e4',
        },
        tertiary: {
          DEFAULT: '#5c000d',
          container: '#7e161e',
        },
        'on-tertiary-container': '#ff8988',
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        background: '#f7f9fb',
        surface: {
          DEFAULT: '#f7f9fb',
          'container-lowest': '#ffffff',
          'container-low': '#f2f4f6',
          container: '#eceef0',
          'container-high': '#e6e8ea',
          'container-highest': '#e0e3e5',
        },
        'on-surface': '#191c1e',
        'on-surface-variant': '#444651',
        outline: '#757682',
        'outline-variant': '#c5c5d3',
      },
      borderRadius: {
        sm: '0.5rem',
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      spacing: {
        gutter: '24px',
        'margin-desktop': '48px',
        unit: '8px',
        'margin-mobile': '20px',
        'container-max': '1280px',
      },
      fontFamily: {
        headline: ['Inter', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      // Shadow definitions as specified by DESIGN.md:
      // "Depth is not created through traditional grey shadows, but through Color-Bleed Diffusion and Backdrop Blurs.
      // Shadows are tinted, e.g. 0 20px 40px rgba(30,58,138,0.12)"
      boxShadow: {
        glass: '0 20px 40px rgba(30, 58, 138, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
        'glass-hover': '0 30px 60px rgba(30, 58, 138, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
        'glow-primary': '0 0 20px rgba(0, 35, 111, 0.3)',
        'glow-error': '0 0 15px rgba(186, 26, 26, 0.4)',
      },
      backgroundImage: {
        'primary-button': 'linear-gradient(to right, #ba1a1a, #ff8988)',
      },
    },
  },
  plugins: [],
} satisfies Config
