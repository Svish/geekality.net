import '@/styles/globals.css'

import Header from './Header'

// TODO: Move katex CSS to slug page
// https://github.com/vercel/next.js/discussions/49014

export const metadata = {
  title: {
    absolute: 'Geekality',
    template: '%s | Geekality',
  },
  description: 'My website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
          integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Header />
        <main
          style={{
            padding: '1rem 1.5rem',
          }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
