/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './content/**/*.mdx'],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('tailwindcss-text-balance'),
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Remove prose qutoes from blockquote
            blockquote: {
              'p:first-of-type::before': { content: 'none' },
              'p:first-of-type::after': { content: 'none' },
            },

            // Table colors
            '--tw-prose-th-borders': theme('colors.gray[500]'),
            '--tw-prose-td-borders': theme('colors.gray[400]'),
            '--tw-prose-invert-th-borders': theme('colors.gray[600]'),
            '--tw-prose-invert-td-borders': theme('colors.gray[700]'),

            // Remove inner margin from table cells
            'th, td': {
              marginTrim: 'block',
              '& > *:first-child': {
                marginTop: 0,
              },
              '& > *:last-child': {
                marginBottom: 0,
              },
            },

            // Adjustments to inline code style
            // @see https://nikitagoncharuk.com/blog/my-custom-code-style-for-typography-by-tailwindcss-highlightjs/
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
}
