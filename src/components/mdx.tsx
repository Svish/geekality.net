import { type MDXComponents } from 'mdx/types'
import { type Route } from 'next'

import { BASE_URL } from '@/config/url'

import invariant from 'tiny-invariant'
import { tryGetLonelyHref } from '@/util/oembed'

import Link, { ExternalLink } from '@/components/Link'
import Embed from './Embed'

const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    // if (href != null && permalinkMap.has(href))
    //   href = permalinkMap.get(href)?.pathname

    // const permalinkMap: ReadonlyMap<string, Post> = new Map(
    //   allPosts.flatMap((post) =>
    //     (post.permalinks ?? []).map((permalink) => [permalink, post])
    //   )
    // )

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
    // TODO: Try write own plugin for this?
    // - Unwrap lone links
    // - Convert into something embeds? Maybe `<a href="..." data-oembed="true" />`?
    // https://github.com/remarkjs/remark-unwrap-images/blob/main/lib/index.js
    const embeddableHref = tryGetLonelyHref(props.children)

    return embeddableHref ? <Embed href={embeddableHref} /> : <p {...props} />
  },
  Note: ({ children }) => <div className="note">{children}</div>,
}

export default mdxComponents
