'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/util'
import { menuItems } from '@/config/menu'

import Link from '@/components/Link'

export default function MenuItems() {
  const pathname = usePathname()

  return (
    <>
      {menuItems.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={pathname.startsWith(href) ? 'page' : undefined}
            className={cn(
              'block px-4 py-3 hover:bg-gray-400 dark:hover:bg-gray-600',
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
