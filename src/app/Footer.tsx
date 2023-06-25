import { site } from '@/config'

import Link from '@/components/Link'
import Logo from '@/icons/Logo'

export default function Footer() {
  return (
    <footer className="p-2 mt-8 text-xs border-t-2 border-gray-300 select-none dark:border-gray-700">
      <div className="container flex gap-4">
        <div className="py-2">– {site.tagline}</div>
        <div className="flex ml-auto">
          <Link
            href="/about"
            aria-label="About me"
            rel="author"
            className="-translate-y-0.5"
          >
            <Logo
              role="img"
              focusable="false"
              aria-label="Logo"
              className="h-8 fill-gray-950 dark:fill-gray-50"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
