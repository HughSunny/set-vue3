import { defineConfig } from 'windicss/helpers';

import lineClamp from 'windicss/plugin/line-clamp';
import colors from 'windicss/colors';

export default defineConfig({
  darkMode: 'class',
  plugins: [lineClamp, createEnterPlugin()],
  theme: {
    fontSize: {
      base: '1rem',
      xs: '.75rem',
      sm: '.875rem',
      lg: '0.8rem',
      xl: '0.9rem',
      '2xl': '1rem',
      '3xl': '1.35rem',
      '4xl': '1.7rem',
      '5xl': '2rem',
      '6xl': '2.4rem',
    },
    extend: {
      colors: {
        ...colors,
        // primary: primaryColor,
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
      lineHeight: {
        12: '3rem',
      },
      zIndex: {
        1100: 1100,
      },
      flex: {
        57: '0 0 57%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  // preflight: false,
  shortcuts: {
    'mix-section-title': {
      color: '#212529',
      'letter-spacing': '3px',
      '@apply': 'font-semibold text-5xl',
    },
    'mix-section-subTitle': {
      'letter-spacing': '3px',
      '@apply': 'font-medium text-3xl text-gray-600',
    },
    'mix-section-desc': {
      '@apply': 'text-gray-500 break-all',
    },
    'mix-content-title': {
      color: '#212529',
      'letter-spacing': '1.5px',
      '@apply': 'font-medium text-4xl text-left',
    },
    'mix-content-subTitle': {
      '@apply': 'font-normal text-2xl text-gray-600 text-left',
    },
    'mix-ga-title': {
      color: '#212529',
      'letter-spacing': '1px',
      '@apply': 'font-medium text-3xl',
    },
    'mix-ga-subTitle': {
      '@apply': 'font-normal text-2xl text-gray-600',
    },
    'mix-grid-title': {
      color: '#212529',
      'letter-spacing': '1px',
      '@apply': 'font-semibold text-2xl',
    },
    'mix-grid-subTitle': {
      '@apply': 'font-normal text-xl text-gray-600',
    },
    'mix-grid-desc': {
      '@apply': 'font-normal text-xl text-gray-600',
    },
  },
});

/**
 * Used for animation when the element is displayed
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume
 */
function createEnterPlugin(maxOutput = 10) {
  const createCss = (index: number, d = 'x') => {
    const upd = d.toUpperCase();
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        opacity: '0',
        animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`,
      },
    };
  };
  const handler = ({ addBase }) => {
    const addRawCss = {};
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      });
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      [`@keyframes enter-y-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    });
  };
  return { handler };
}

// module.exports = {
//   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
//   darkMode: false, // or 'media' or 'class'
//   theme: {
//     extend: {
//       screens: {
//         sm: '576px',
//         md: '768px',
//         lg: '992px',
//         xl: '1200px',
//         '2xl': '1600px',
//       },
//       lineHeight: {
//         12: '3rem',
//       },
//       zIndex: {
//         1100: 1100,
//       },
//       flex: {
//         57: '0 0 57%',
//       },
//     },
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [],
// };
