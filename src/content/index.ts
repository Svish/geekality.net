import { byString, byStringValue } from '@/util/sort'

import { allPosts, type Post } from 'contentlayer/generated'
export { allPosts, type Post } from 'contentlayer/generated'

export const postsByTitle = [...allPosts].sort(byStringValue((p) => p.title))

export const postsByPublished = [...allPosts]
  .sort(byStringValue((p) => p.published))
  .reverse()

export const categories = [
  ...new Set(allPosts.flatMap((p) => p.categories ?? [])),
]
  .sort(byString())
  .map((category) => ({
    slug: category,
    count: allPosts.filter((p) => p.categories?.includes(category)).length,
  }))

export const tags = [...new Set(allPosts.flatMap((p) => p.tags ?? []))]
  .sort(byString())
  .map((tag) => ({
    slug: tag,
    count: allPosts.filter((p) => p.tags?.includes(tag)).length,
  }))

export function findSiblings(post: Post) {
  const index = postsByPublished.findIndex(({ slug }) => slug === post.slug)
  return {
    prev: postsByPublished[index + 1],
    next: postsByPublished[index - 1],
  } as const
}
