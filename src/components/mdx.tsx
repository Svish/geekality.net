import { type MDXComponents } from 'mdx/types'
import { type Route } from 'next'
import invariant from 'tiny-invariant'

import Link, { ExternalLink } from '@/components/Link'

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => {
    invariant(process.env.ORIGIN != null)
    invariant(href != null, 'href is required')

    const base = new URL(process.env.ORIGIN)
    const url = new URL(href, process.env.ORIGIN)
    const isExternal = url.hostname !== base.hostname

    return isExternal ? (
      <ExternalLink href={href}>{children}</ExternalLink>
    ) : (
      <Link href={href as Route<string>}>{children}</Link>
    )
  },
}

export default mdxComponents
