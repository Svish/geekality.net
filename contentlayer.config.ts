import { defineDocumentType, makeSource } from 'contentlayer/source-files'

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

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [
    defineDocumentType(() => ({
      name: 'Post',
      filePathPattern: `blog/*.mdx`,
      contentType: 'mdx',
      fields: {
        title: {
          type: 'string',
          required: true,
        },
        lang: {
          type: 'string',
        },
        published: {
          type: 'date',
          required: true,
        },
        permalinks: {
          type: 'list',
          of: { type: 'string' },
          required: false,
        },
        categories: {
          type: 'list',
          of: { type: 'string' },
          required: true,
        },
        tags: {
          type: 'list',
          of: { type: 'string' },
          required: true,
        },
      },
      computedFields: {
        slug: {
          type: 'string',
          resolve: makeSlug,
        },
        pathname: {
          type: 'string',
          resolve: (post) => `/blog/${makeSlug(post)}`,
        },
      },
    })),
  ],
  mdx: {
    remarkPlugins: [
      // TODO: Figure out how to make oembed work, and styled...
      // [remarkOembed, { jsx: true }],
      remarkMath,
      remarkGfm,
    ],
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
})

function makeSlug(post: { _raw: { sourceFileName: string } }): string {
  return post._raw.sourceFileName.replace(/\.mdx$/, '')
}
