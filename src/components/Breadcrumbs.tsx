import { HomeIcon } from '@/icons'
import Link, { type LinkProps } from 'next/link'

type Crumb<R extends string> = {
  pathname: LinkProps<R>['href']
  label: string
}

export default function Breadcrumbs<R extends string>({
  crumbs,
}: {
  crumbs: Crumb<R>[]
}) {
  return (
    <nav
      className="mb-4 text-sm text-gray-600 select-none dark:text-gray-400"
      aria-label="Breadcrumbs"
    >
      <ol className="flex flex-wrap gap-1">
        <li className="inline">
          <Link href="/" className="no-underline text-inherit">
            <HomeIcon aria-hidden="true" focusable="false" className="h-full" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {crumbs.map(({ pathname, label }, i) => (
          <li
            key={`${pathname}`}
            className="inline before:content-['/'] before:mr-1 before:text-gray-400"
          >
            <Link
              href={pathname}
              className="no-underline text-inherit"
              aria-current={i === crumbs.length - 1 ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
