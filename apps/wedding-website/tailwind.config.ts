import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../shared/**/*.{ts,tsx}'],

  theme: {
    // ─── Override defaults ──────────────────────────────────────────────
    fontFamily: {
      display: ['"Playfair Display"', 'Georgia', 'serif'],
      body: ['Poppins', 'system-ui', 'sans-serif'],
      hindi: ['"Noto Sans Devanagari"', '"Segoe UI"', 'sans-serif'],
      script: ['"Dancing Script"', 'cursive'],
      mono: ['"JetBrains Mono"', 'monospace'],
    },

    extend: {
      // ─── Color palette ───────────────────────────────────────────────
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          DEFAULT: '#FF6B00',
          600: '#ea580c',
          dark: '#CC5500',
          light: '#FF8C38',
        },
        maroon: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          DEFAULT: '#800020',
          light: '#A0002A',
          dark: '#600018',
          900: '#4a0010',
          950: '#2d0009',
        },
        gold: {
          50: '#fdfdf0',
          100: '#faf6d0',
          200: '#f5eda3',
          300: '#ede068',
          light: '#E2C97E',
          DEFAULT: '#C9A84C',
          dark: '#A07830',
          700: '#8a6020',
          800: '#6e4a16',
          900: '#5c3d13',
        },
        ivory: {
          DEFAULT: '#FDF6EC',
          muted: '#F5E6D0',
          dark: '#EDD9B8',
        },
        marigold: {
          DEFAULT: '#FFBE00',
          light: '#FFD54F',
          dark: '#E6A800',
        },
        divine: {
          50: '#f3f0ff',
          100: '#e9e3ff',
          200: '#d5ccff',
          300: '#b8a9ff',
          400: '#9480ff',
          DEFAULT: '#2D1B4E',
          light: '#3D2560',
          dark: '#1e1035',
          950: '#0f0820',
        },
      },

      // ─── Typography scale ────────────────────────────────────────────
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        base: ['1rem', { lineHeight: '1.625rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.035em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
      },

      // ─── Spacing scale additions ─────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ─── Border radius ───────────────────────────────────────────────
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // ─── Shadows ─────────────────────────────────────────────────────
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,0.05)',
        gold: '0 4px 30px rgba(201, 168, 76, 0.25)',
        'gold-lg': '0 8px 50px rgba(201, 168, 76, 0.4)',
        'gold-xl': '0 16px 70px rgba(201, 168, 76, 0.5)',
        divine: '0 4px 30px rgba(45, 27, 78, 0.4)',
        'divine-lg': '0 8px 60px rgba(45, 27, 78, 0.6)',
        saffron: '0 4px 30px rgba(255, 107, 0, 0.25)',
        maroon: '0 4px 30px rgba(128, 0, 32, 0.3)',
        card: '0 2px 20px rgba(45, 27, 78, 0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 40px rgba(45, 27, 78, 0.15), 0 2px 8px rgba(0,0,0,0.06)',
        'inner-gold': 'inset 0 1px 0 rgba(201, 168, 76, 0.15)',
      },

      // ─── Backdrop blur ───────────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },

      // ─── Background images ───────────────────────────────────────────
      backgroundImage: {
        // Gradients
        'gold-radial': 'radial-gradient(ellipse at center, #E2C97E 0%, #C9A84C 40%, #A07830 100%)',
        'gold-linear': 'linear-gradient(135deg, #A07830 0%, #C9A84C 50%, #E2C97E 100%)',
        'gold-shimmer':
          'linear-gradient(90deg, #A07830 0%, #C9A84C 25%, #E2C97E 50%, #C9A84C 75%, #A07830 100%)',
        'divine-gradient': 'linear-gradient(180deg, #2D1B4E 0%, #1e1035 100%)',
        'divine-radial':
          'radial-gradient(ellipse at top, rgba(45,27,78,0.95) 0%, rgba(128,0,32,0.98) 100%)',
        'hero-overlay':
          'linear-gradient(180deg, rgba(45,27,78,0.7) 0%, rgba(128,0,32,0.85) 60%, rgba(96,0,24,0.95) 100%)',
        'card-dark': 'linear-gradient(145deg, rgba(45,27,78,0.08) 0%, rgba(128,0,32,0.12) 100%)',
        'card-glow':
          'linear-gradient(145deg, rgba(201,168,76,0.05) 0%, rgba(201,168,76,0.02) 100%)',
        'ivory-subtle': 'linear-gradient(180deg, #FDF6EC 0%, #F5E6D0 100%)',
        // Decorative
        'mandala-radial':
          'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 30px, rgba(201,168,76,0.03) 30px, rgba(201,168,76,0.03) 31px)',
      },

      // ─── Animations ──────────────────────────────────────────────────
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        'glow-fast': 'glow 1.5s ease-in-out infinite',
        'petal-fall': 'petalFall 10s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'shimmer-fast': 'shimmer 1.5s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'draw-line': 'drawLine 1.5s ease-in-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(201,168,76,0.2), 0 0 20px rgba(201,168,76,0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(201,168,76,0.5), 0 0 50px rgba(201,168,76,0.2)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(50vh) rotate(360deg) scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'translateY(110vh) rotate(720deg) scale(0.5)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(0.97)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.88)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },

      // ─── Transitions ─────────────────────────────────────────────────
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'expo-in': 'cubic-bezier(0.64, 0, 0.78, 0)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },

      // ─── Z-index scale ───────────────────────────────────────────────
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
      },

      // ─── Max widths ──────────────────────────────────────────────────
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },

      // ─── Aspect ratios ───────────────────────────────────────────────
      aspectRatio: {
        portrait: '3/4',
        cinema: '21/9',
        ceremony: '4/3',
      },
    },
  },

  plugins: [
    // ── Custom utilities plugin ──────────────────────────────────────────
    plugin(({ addUtilities, addComponents, theme }) => {
      // Text utilities
      addUtilities({
        '.text-balance': { 'text-wrap': 'balance' },
        '.text-pretty': { 'text-wrap': 'pretty' },

        // Gradient text
        '.text-gradient-gold': {
          background:
            'linear-gradient(90deg, #A07830 0%, #C9A84C 30%, #E2C97E 50%, #C9A84C 70%, #A07830 100%)',
          'background-size': '200% auto',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.text-gradient-divine': {
          background: 'linear-gradient(135deg, #9480ff 0%, #C9A84C 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },

        // Shimmer animation for gold text
        '.text-shimmer': {
          animation: 'shimmer 2.5s linear infinite',
        },

        // Glow effects
        '.glow-gold': {
          filter:
            'drop-shadow(0 0 8px rgba(201, 168, 76, 0.5)) drop-shadow(0 0 20px rgba(201, 168, 76, 0.2))',
        },
        '.glow-saffron': {
          filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.6))',
        },
        '.glow-white': {
          filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))',
        },

        // Decorative border
        '.border-gold-shimmer': {
          'border-image': 'linear-gradient(90deg, transparent, #C9A84C, transparent) 1',
        },

        // Scrollbar
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#C9A84C #FDF6EC',
        },
        '.scrollbar-none': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },

        // Safe area insets for mobile
        '.pb-safe': { 'padding-bottom': 'env(safe-area-inset-bottom)' },
        '.pt-safe': { 'padding-top': 'env(safe-area-inset-top)' },
      })

      // Component classes
      addComponents({
        '.section-padding': {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '4rem',
          paddingBottom: '4rem',
          '@screen sm': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '5rem',
            paddingBottom: '5rem',
          },
          '@screen lg': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
            paddingTop: '6rem',
            paddingBottom: '6rem',
          },
          '@screen xl': { paddingTop: '7rem', paddingBottom: '7rem' },
        },

        '.section-container': {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '72rem',
          width: '100%',
        },

        '.gold-divider': {
          display: 'block',
          margin: '1.5rem auto',
          height: '1px',
          width: '6rem',
          background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
          border: 'none',
        },

        '.gold-divider-wide': {
          display: 'block',
          margin: '1.5rem auto',
          height: '1px',
          width: '12rem',
          background:
            'linear-gradient(90deg, transparent, #C9A84C 30%, #E2C97E 50%, #C9A84C 70%, transparent)',
        },

        '.mandala-bg': {
          backgroundImage:
            'radial-gradient(ellipse at 20% 0%, rgba(45,27,78,0.95) 0%, rgba(96,0,24,0.9) 50%, rgba(45,27,78,0.98) 100%)',
          backgroundColor: '#1e1035',
        },

        '.card-divine': {
          borderRadius: '1rem',
          border: '1px solid rgba(201,168,76,0.18)',
          background: 'linear-gradient(145deg, rgba(45,27,78,0.06) 0%, rgba(128,0,32,0.1) 100%)',
          backdropFilter: 'blur(8px)',
          '-webkit-backdrop-filter': 'blur(8px)',
          padding: '1.5rem',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(201,168,76,0.35)',
          },
        },

        '.card-light': {
          borderRadius: '1rem',
          border: '1px solid rgba(201,168,76,0.15)',
          background: '#FDF6EC',
          padding: '1.5rem',
          boxShadow: '0 2px 20px rgba(45, 27, 78, 0.06)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(45, 27, 78, 0.12)',
          },
        },

        '.input-divine': {
          width: '100%',
          borderRadius: '0.75rem',
          border: '1.5px solid rgba(128,0,32,0.2)',
          backgroundColor: '#FDF6EC',
          padding: '0.75rem 1rem',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '0.875rem',
          color: '#600018',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:focus': {
            borderColor: '#C9A84C',
            boxShadow: '0 0 0 3px rgba(201,168,76,0.15)',
          },
          '&::placeholder': {
            color: 'rgba(128,0,32,0.35)',
          },
        },

        '.section-title': {
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '2.25rem',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          '@screen sm': { fontSize: '3rem' },
          '@screen lg': { fontSize: '3.75rem' },
        },

        '.section-subtitle': {
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          '@screen sm': { fontSize: '1.25rem' },
        },
      })
    }),
  ],
} satisfies Config
