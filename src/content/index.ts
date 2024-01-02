import 'server-only'

import fs from 'fs/promises'
import path from 'path'

import { z } from 'zod'
import { byStringValue } from '@/util/sort'
import { compileMDX } from '@/util/mdx'

import { unstable_cache as cache } from 'next/cache'

const contentDir = path.resolve(process.cwd(), 'content', 'blog')

const schema = z.object({
  title: z.string().min(1),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lang: z.enum(['en', 'nb']).default('en'),
  categories: z.string().min(1).array().min(1),
  tags: z.string().min(1).array().min(0),
  permalinks: z.string().min(1).array().default([]),
})

export type PostMeta = Awaited<ReturnType<typeof getAllPosts>>[number]

export const getAllPosts = cache(async function getAllPostsMeta() {
  const files = await fs.readdir(contentDir)

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '')
      const source = await fs.readFile(path.join(contentDir, file), {
        encoding: 'utf8',
        flag: 'r',
      })

      const { frontmatter } = await compileMDX(source)

      return {
        slug,
        pathname: `/blog/${slug}`,
        ...schema.parse(frontmatter),
      }
    })
  )

  return posts
    .filter((p) => new Date(p.published).getTime() <= Date.now())
    .sort(byStringValue((p) => p.published, 'desc'))
})

export type Post = Awaited<ReturnType<typeof getPost>>

export const getPost = async function getPost(slug: string) {
  const source = await fs.readFile(path.join(contentDir, `${slug}.mdx`), {
    encoding: 'utf8',
    flag: 'r',
  })
  const { frontmatter, content } = await compileMDX(source)
  return {
    slug,
    pathname: `/blog/${slug}`,
    ...schema.parse(frontmatter),
    content,
  }
}

export function findSiblingPosts(posts: PostMeta[], post: Post) {
  const index = posts.findIndex(({ slug }) => slug === post.slug)
  return {
    prev: posts[index + 1],
    next: posts[index - 1],
  } as const
}
