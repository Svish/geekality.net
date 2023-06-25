'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/util'

import Link from '@/components/Link'
import { SearchIcon } from '@/icons'

const items = [
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  {
    href: '/search',
    label: (
      <>
        <SearchIcon aria-hidden="true" focusable="false" className="h-full" />
        <span className="sr-only">Search</span>
      </>
    ),
  },
] as const

export default function MenuItems() {
  const pathname = usePathname()

  return (
    <>
      {items.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={pathname.startsWith(href) ? 'page' : undefined}
            className={cn(
              'block px-4 py-3 h-full hover:bg-gray-400 dark:hover:bg-gray-600',
              {
                'bg-gray-400 dark:bg-gray-600': pathname.startsWith(href),
              }
            )}
          >
            {label}
          </Link>
        </li>
      ))}
    </>
  )
}
