import { defineDocumentType, makeSource } from 'contentlayer/source-files'

import highlight from 'rehype-highlight'

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
  mdx: { rehypePlugins: [highlight] },
})
