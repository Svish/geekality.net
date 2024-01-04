import 'server-only'

import { compileMDX as _compileMDX } from 'next-mdx-remote/rsc'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
// import remarkOembed from 'remark-oembed'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
// import rehypeAutolinkHeadings from 'rehype-autolink-headings'

import rehypeHighlight from 'rehype-highlight'
import apache from 'highlight.js/lib/languages/apache'
import applescript from 'highlight.js/lib/languages/applescript'
import bash from 'highlight.js/lib/languages/bash'
import dos from 'highlight.js/lib/languages/dos'
import http from 'highlight.js/lib/languages/http'
import ini from 'highlight.js/lib/languages/ini'
import lua from 'highlight.js/lib/languages/lua'
import powershell from 'highlight.js/lib/languages/powershell'
import components from '@/components/mdx'

export function compileMDX(source: string) {
  return _compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
          rehypeKatex,
          rehypeSlug,
          // TODO: Figure out how to make autolinks work, and styled...
          /*[
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              properties: {
                className: ['header-anchor'],
              },
            },
          ],*/
          [
            rehypeHighlight,
            {
              detect: true,
              languages: {
                apache,
                applescript,
                bash,
                dos,
                http,
                ini,
                lua,
                powershell,
              },
            },
          ],
        ],
      },
    },
  })
}
