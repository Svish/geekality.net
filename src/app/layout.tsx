import '@/styles/globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'

import { BASE_URL } from '@/config/url'

import Link from '@/components/Link'
import MenuItems from './MenuItems'
import { Analytics } from '@vercel/analytics/react'
import { Favicon } from './Favicon'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    absolute: 'Geekality',
    template: '%s | Geekality',
  },
  description: 'My website',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#000" />
        <link rel="apple-touch-icon" href="/favicon-180x180.png" />
      </head>
      <body className="m-0 overflow-y-scroll antialiased text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex flex-col min-h-[100dvh]">
        <header className="sticky top-0 z-10 bg-gray-300 border-b-2 border-gray-800 select-none text-gray-950 dark:text-gray-50 dark:bg-gray-700 dark:border-gray-200 sm:text-2xl">
          <div className="container flex text-lg">
            <div className="mr-auto">
              <Link
                href="/"
                rel="home"
                className="block px-4 py-3 hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Geekality
              </Link>
            </div>
            <nav aria-label="Main navigation">
              <ul className="flex">
                <MenuItems />
              </ul>
            </nav>
          </div>
        </header>

        <main className="container flex-grow p-4">{children}</main>

        <footer className="p-4 mt-8 text-xs border-t-2 border-gray-300 select-none dark:border-gray-700">
          <div className="container flex gap-4">
            <div>– With a hint of social ineptitude</div>
            <div className="flex gap-2 ml-auto">
              <Link href="/about" aria-label="About me" rel="author">
                <Favicon
                  role="img"
                  aria-label="Logo"
                  className="h-4 fill-gray-950 dark:fill-gray-50"
                />
              </Link>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  )
}
