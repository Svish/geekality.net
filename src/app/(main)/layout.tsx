import '@/styles/globals.css'

import { type ReactNode } from 'react'
import { type Metadata } from 'next'

import { BASE_URL, absolute } from '@/config/url'
import { site } from '@/config'
import feed from '@/content/feed'

import Footer from './Footer'
import Header from './Header'
import FavIcons from './FavIcons'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    absolute: site.title,
    template: '%s | ' + site.title,
  },
  description: 'My website',
  alternates: {
    types: {
      'application/rss+xml': [
        { url: absolute('blog/feed/xml'), title: feed.title },
      ],
      'application/atom+xml': [
        { url: absolute('blog/feed/atom'), title: feed.title },
      ],
      'application/json': [
        { url: absolute('blog/feed/json'), title: feed.title },
      ],
    },
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <FavIcons />
      </head>
      <body className="m-0 overflow-y-scroll antialiased text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex flex-col min-h-[100dvh]">
        <Header />
        <main className="container flex-grow p-4">{children}</main>
        <Footer />

        <Analytics />
      </body>
    </html>
  )
}
