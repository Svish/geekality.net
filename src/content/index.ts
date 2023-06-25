import 'server-only'

import { byString, byStringValue } from '@/util/sort'
import { onlyPublished } from './filters'

import { allPosts, type Post } from 'contentlayer/generated'
export { allPosts, type Post } from 'contentlayer/generated'

export const postsSortedByTitle: readonly Post[] = [...allPosts]
  .filter(onlyPublished)
  .sort(byStringValue((p) => p.title))

export const postsSortedByPublished: readonly Post[] = [...allPosts]
  .filter(onlyPublished)
  .sort(byStringValue((p) => p.published))
  .reverse()

export const permalinkMap: ReadonlyMap<string, Post> = new Map(
  allPosts.flatMap((post) =>
    (post.permalinks ?? []).map((permalink) => [permalink, post])
  )
)

export function findSiblingPosts(post: Post) {
  const index = postsSortedByPublished.findIndex(
    ({ slug }) => slug === post.slug
  )
  return {
    prev: postsSortedByPublished[index + 1],
    next: postsSortedByPublished[index - 1],
  } as const
}

type SlugCount = { slug: string; count: number }

export const categories: readonly SlugCount[] = [
  ...new Set(allPosts.flatMap((p) => p.categories ?? [])),
]
  .sort(byString())
  .map((category) => ({
    slug: category,
    count: allPosts.filter((p) => p.categories?.includes(category)).length,
  }))

export const tags: readonly SlugCount[] = [
  ...new Set(allPosts.flatMap((p) => p.tags ?? [])),
]
  .sort(byString())
  .map((tag) => ({
    slug: tag,
    count: allPosts.filter((p) => p.tags?.includes(tag)).length,
  }))
