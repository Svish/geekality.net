/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './content/**/*.mdx'],
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

            // Add top and bottom border to table, and make border more visible
            tr: {
              borderColor: theme('colors.gray.400'),
              '&:first-child': {
                borderTopWidth: '2px',
              },
              '&:last-child': {
                borderBottomWidth: '2px',
              },
            },
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
  plugins: [require('@tailwindcss/typography')],
}
