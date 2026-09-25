/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          primary: {
            50: '#FFFFFF',
            100: '#FAFAFA',
            200: '#F5F5F5',
            300: '#EEEEEE',
            400: '#E0E0E0',
            500: '#BDBDBD',
            600: '#9E9E9E',
            700: '#6B6862',
            800: '#3A3733',
            900: '#1A1815',
            950: '#0D1A16',
          },
         red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
           gold: {
             50: '#FFFAF0',
             100: '#FFF3E0',
             200: '#FFE0B2',
             300: '#FFCC80',
             400: '#FFB74D',
             500: '#FFA726',
             600: '#F28C38',
             700: '#E67C1A',
             800: '#D16C0A',
             900: '#B85C00',
           },
           // Primary decorative accent — warm, muted gold used sparingly
           // for badges, underlines and small brand marks (never as a base color).
           mustard: {
             50: '#FBF6EA',
             100: '#F5EAD0',
             200: '#E9D4A0',
             300: '#DCBE79',
             400: '#C9A860',
             500: '#B89747',
             600: '#A68735',
             700: '#8E7325',
             800: '#6E591D',
             900: '#523F15',
           },
          silver: {
            50: '#FFFFFF',
            100: '#FAFAFA',
            200: '#F5F5F5',
            300: '#EEEEEE',
            400: '#E0E0E0',
            500: '#BDBDBD',
            600: '#9E9E9E',
            700: '#616151',
            800: '#424242',
            900: '#1A1A1A',
          },
          charcoal: {
            50: '#F0F7F6',
            100: '#E0F0ED',
            200: '#B3DED6',
            300: '#80C4BA',
            400: '#50A99F',
            500: '#3F8A85',
            600: '#2F5D50',
            700: '#264C41',
            800: '#1E3C34',
            900: '#162C28',
          },
          cream: {
            DEFAULT: '#FAF9F6',
            50: '#FAF9F6',
            100: '#F5F4EF',
            200: '#EBEAE3',
            300: '#E0DED7',
            400: '#CBC9C0',
            500: '#B3B0A6',
            600: '#918D82',
            700: '#6F6C5A',
            800: '#535044',
            900: '#3A372E',
          },
          white: {
            DEFAULT: '#FFFFFF',
            soft: '#FAF9F6',
          }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'SlideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-charcoal': 'pulseCharcoal 2s infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseCharcoal: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(47, 93, 80, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(47, 93, 80, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #264C41 0%, #2F5D50 50%, #409083 100%)',
        'gradient-gold-shine': 'linear-gradient(135deg, #1E3C34 0%, #2F5D50 40%, #264C41 70%, #1E3C34 100%)',
        'gradient-silver': 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 50%, #E0E0E0 100%)',
        // Brand two-tone: verde menta -> dorado/mostaza, for the one hero moment that earns it
        'gradient-luxury': 'linear-gradient(135deg, #2F5D50 0%, #3F8A85 45%, #C9A860 100%)',
        'gradient-dark': 'linear-gradient(180deg, #FFFFFF 0%, #FAF9F6 100%)',
        'gradient-card': 'linear-gradient(145deg, #FFFFFF 0%, #FAF9F6 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 168, 96, 0.25)',
        'gold-sm': '0 1px 4px rgba(47, 93, 80, 0.20)',
        'gold-lg': '0 8px 32px rgba(201, 168, 96, 0.22)',
        'inner-gold': 'inset 0 1px 0 rgba(201, 168, 96, 0.2)',
        'silver': '0 4px 16px rgba(158, 158, 158, 0.08)',
        'card': '0 1px 3px rgba(26, 24, 21, 0.05), 0 1px 2px rgba(26, 24, 21, 0.03)',
        'card-hover': '0 8px 20px rgba(26, 24, 21, 0.08), 0 2px 6px rgba(26, 24, 21, 0.05)',
      },
      borderWidth: {
        '1': '1px',
      },
        borderColor: {
          'gold-50': '#FFFAF0',
          'gold-100': '#FFF3E0',
          'gold-200': '#FFE0B2',
          'gold-300': '#FFCC80',
          'gold-400': '#FFB74D',
          'gold-500': '#FFA726',
          'gold-600': '#F28C38',
          'gold-700': '#E67C1A',
          'gold-800': '#D16C0A',
          'gold-900': '#B85C00',
          'silver-300': '#E0E0E0',
          'silver-400': '#BDBDBD',
          'silver-500': '#9E9E9E',
          'silver-600': '#616151',
          // Neutral, warm hairline border — brand green is reserved for
          // hover/active states and CTAs, not for outlining every element.
          'dark-border': '#E5E2D9',
          'dark-border-light': '#EFEDE5',
        },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}