import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'
import plugins from './src/config/plugins'
import colors from './src/config/theme/colors'
import display from './src/config/theme/display'
import dropShadow from './src/config/theme/dropShadow'
import fontFamily from './src/config/theme/fontFamily'
import fontWeight from './src/config/theme/fontWeight'
import screens from './src/config/theme/screens'
import spacing from './src/config/theme/spacing'
import zIndex from './src/config/theme/zIndex'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors,
    spacing,
    screens,
    fontFamily,
    fontWeight,
    zIndex,
    dropShadow,
    fontSize: {
      xs: ['1.2rem', { lineHeight: '1.6rem' }],
      sm: ['1.4rem', { lineHeight: '2rem' }],
      base: ['1.6rem', { lineHeight: '2.4rem' }],
      lg: ['1.8rem', { lineHeight: '2.6rem' }],
      xl: ['2rem', { lineHeight: '2.8rem' }],
      '2xl': ['2.4rem', { lineHeight: '3.2rem' }],
      '3xl': ['3rem', { lineHeight: '3.6rem' }],
      '4xl': ['3.6rem', { lineHeight: '4rem' }],
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 0.2rem)',
        sm: 'calc(var(--radius) - 0.4rem)',
      },
    },
  },
  plugins: [
    ...plugins,
    tailwindcssAnimate,
    ({ addUtilities }) => {
      addUtilities(
        Object.fromEntries(
          Object.entries(display).map(([key, value]) => [`.${key}`, { display: value }]),
        ),
      )
    },
  ],
}

export default config
