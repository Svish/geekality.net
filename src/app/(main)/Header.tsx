import { site } from '@/config'

import Link from '@/components/Link'
import MenuItems from './MenuItems'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-gray-800 select-none bg-gray-300/70 backdrop-blur-sm text-gray-950 dark:text-gray-50 dark:bg-gray-700/70 dark:border-gray-200 sm:text-2xl">
      <div className="container flex text-lg">
        <div className="mr-auto">
          <Link
            href="/"
            rel="home"
            className="block px-4 py-3 hover:bg-gray-400 dark:hover:bg-gray-600"
          >
            {site.title}
          </Link>
        </div>
        <nav aria-label="Main navigation">
          <ul className="flex">
            <MenuItems />
          </ul>
        </nav>
      </div>
    </header>
  )
}
