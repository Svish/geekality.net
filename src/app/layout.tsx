import '@/styles/globals.css'

import Link from 'next/link'

export const metadata = {
  title: {
    absolute: 'Geekality',
    template: '%s | Geekality',
  },
  description: 'My website',
}

// TODO: Move katex CSS to slug page
// https://github.com/vercel/next.js/discussions/49014

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
      <body style={{ margin: 0, background: 'hsl(120 0% 95%)' }}>
        <header
          style={{
            background: 'hsl(120 0% 75%)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'baseline',
            gap: '1.5rem',
          }}
        >
          <Link href="/" style={{ fontSize: '3rem' }}>
            Geekality
          </Link>
          <Link href="/blog" style={{ fontSize: '1.25rem' }}>
            Blog
          </Link>
        </header>
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
