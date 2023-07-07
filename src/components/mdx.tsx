import { type MDXComponents } from 'mdx/types'
import { type Route } from 'next'

import { BASE_URL } from '@/config/url'

import invariant from 'tiny-invariant'
import { permalinkMap } from '@/content'
import { tryGetLonelyHref } from '@/util/oembed'

import Link, { ExternalLink } from '@/components/Link'
import Embed from './Embed'

const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    if (href != null && permalinkMap.has(href))
      href = permalinkMap.get(href)?.pathname

    invariant(href != null, 'href is required')

    const base = new URL(BASE_URL)
    const url = new URL(href, BASE_URL)
    const isExternal = url.hostname !== base.hostname

    return isExternal ? (
      <ExternalLink href={href} {...props}>
        {children}
      </ExternalLink>
    ) : (
      <Link href={href as Route<string>} {...props}>
        {children}
      </Link>
    )
  },
  p: (props) => {
    const embeddableHref = tryGetLonelyHref(props.children)

    return embeddableHref ? <Embed href={embeddableHref} /> : <p {...props} />
  },
  Note: ({ children }) => <div className="note">{children}</div>,
}

export default mdxComponents
