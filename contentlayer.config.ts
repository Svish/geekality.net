import { defineDocumentType, makeSource } from 'contentlayer/source-files'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import rehypeHighlight from 'rehype-highlight'
import apache from 'highlight.js/lib/languages/apache'
import applescript from 'highlight.js/lib/languages/applescript'
import bash from 'highlight.js/lib/languages/bash'
import dos from 'highlight.js/lib/languages/dos'
import ini from 'highlight.js/lib/languages/ini'
import lua from 'highlight.js/lib/languages/lua'
import powershell from 'highlight.js/lib/languages/powershell'

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [
    defineDocumentType(() => ({
      name: 'BlogPost',
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
          required: false,
        },
        tags: {
          type: 'list',
          of: { type: 'string' },
          required: false,
        },
      },
      computedFields: {
        slug: {
          type: 'string',
          resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ''),
        },
      },
    })),
  ],
  mdx: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeHighlight,
        {
          languages: {
            apache,
            applescript,
            bash,
            dos,
            ini,
            lua,
            powershell,
          },
        },
      ],
    ],
  },
})
