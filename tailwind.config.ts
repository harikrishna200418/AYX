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
          DEFAULT: '#0B1121', // Deep elegant navy/slate
          container: '#1E293B',
        },
        'on-primary': '#ffffff',
        secondary: {
          DEFAULT: '#4F46E5', // Vibrant indigo
          container: '#818CF8',
        },
        tertiary: {
          DEFAULT: '#14B8A6', // Teal
          container: '#5EEAD4',
        },
        'on-tertiary-container': '#F43F5E', // Rose accent
        error: {
          DEFAULT: '#EF4444',
          container: '#FEE2E2',
        },
        background: '#F8FAFC', // Slate 50
        surface: {
          DEFAULT: '#F8FAFC',
          'container-lowest': '#FFFFFF',
          'container-low': '#F1F5F9',
          container: '#E2E8F0',
          'container-high': '#CBD5E1',
          'container-highest': '#94A3B8',
        },
        'on-surface': '#0F172A',
        'on-surface-variant': '#475569',
        outline: '#94A3B8',
        'outline-variant': '#CBD5E1',
      },
      borderRadius: {
        sm: '0.5rem',
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
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
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07), inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
        'glow-primary': '0 0 40px rgba(11, 17, 33, 0.2)',
        'glow-secondary': '0 0 40px rgba(79, 70, 229, 0.3)',
        'glow-error': '0 0 15px rgba(239, 68, 68, 0.3)',
        '3d-light': '0px 4px 20px rgba(0, 0, 0, 0.03), inset 0px 2px 10px rgba(255, 255, 255, 0.7)',
      },
      backgroundImage: {
        'primary-button': 'linear-gradient(to right, #0B1121, #1E293B)',
        'secondary-button': 'linear-gradient(to right, #4F46E5, #6366F1)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(11,17,33,0.03) 0%, rgba(79,70,229,0.05) 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(280,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(240,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(220,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(300,100%,76%,1) 0px, transparent 50%)',
      },
      animation: {
        'blob-float': 'blob-float-key 20s infinite alternate ease-in-out',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'marquee': 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'blob-float-key': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config
