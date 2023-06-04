import { byString, byStringValue } from '@/util/sort'

import { allBlogPosts, type BlogPost as Post } from 'contentlayer/generated'

export type { BlogPost as Post } from 'contentlayer/generated'

export const postsByTitle = [...allBlogPosts].sort(
  byStringValue((p) => p.title)
)

export const postsByPublished = [...allBlogPosts]
  .sort(byStringValue((p) => p.published))
  .reverse()

export const categories = [
  ...new Set(allBlogPosts.flatMap((p) => p.categories ?? [])),
].sort(byString())

export const tags = [
  ...new Set(allBlogPosts.flatMap((p) => p.tags ?? [])),
].sort(byString())

export function findSiblings(post: Post) {
  const index = postsByPublished.findIndex(({ slug }) => slug === post.slug)
  return {
    prev: postsByPublished[index + 1],
    next: postsByPublished[index - 1],
  } as const
}
