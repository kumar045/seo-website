/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.purple.600'),
              '&:hover': {
                color: theme('colors.purple.700'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
              fontWeight: theme('fontWeight.bold'),
            },
            blockquote: {
              borderLeftColor: theme('colors.purple.200'),
              color: theme('colors.gray.700'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.gray.900'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.purple.600'),
            },
            'ol > li::before': {
              color: theme('colors.purple.600'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};