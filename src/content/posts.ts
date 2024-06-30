import 'server-only'

import fs from 'fs/promises'
import path from 'path'

import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { unstable_cache as cache } from 'next/cache'
import { compileMDX } from '@/util/mdx'
import { byStringValue } from '@/util/sort'
import { z } from 'zod'

const contentDir = path.resolve(process.cwd(), 'posts')

const metaSchema = z.object({
  title: z.string().min(1),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lang: z.enum(['en', 'nb']).default('en'),
  categories: z.string().min(1).array().min(1),
  tags: z.string().min(1).array().min(0),
  permalinks: z.string().min(1).array().default([]),
})

export type Post = Awaited<ReturnType<typeof getAllPosts>>[number]

export const getAllPosts = cache(async function getAllPosts() {
  const files = await fs.readdir(contentDir)

  const posts = await Promise.all(
    files.map((file) => path.join(contentDir, file)).map(parseMdx)
  )

  return posts.sort(byStringValue((p) => p.meta.published, 'desc'))
})

export const getPost = async function getPost(slug: string) {
  const filepath = path.join(contentDir, `${slug}.mdx`)
  const mdx = await parseMdx(filepath)
  const { content } = await compileMDX(mdx.source)
  return {
    ...mdx,
    content,
  }
}

async function parseMdx(filepath: string) {
  const source = await fs.readFile(filepath, {
    encoding: 'utf8',
    flag: 'r',
  })
  const file = new VFile(source)
  matter(file, { strip: true })

  const slug = path.basename(filepath, '.mdx')

  return {
    meta: metaSchema.parse(file.data.matter),
    slug,
    pathname: `/blog/${slug}`,
    source: String(file),
  }
}

export function findSiblingPosts<P extends { slug: string }>(
  posts: P[],
  post: P
) {
  const index = posts.findIndex(({ slug }) => slug === post.slug)
  return {
    prev: posts[index + 1],
    next: posts[index - 1],
  } as const
}
