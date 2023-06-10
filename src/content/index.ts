import { byString, byStringValue } from '@/util/sort'

import { allPosts, type Post } from 'contentlayer/generated'
export { allPosts, type Post } from 'contentlayer/generated'

export const postsByTitle = [...allPosts].sort(byStringValue((p) => p.title))

export const postsByPublished = [...allPosts]
  .sort(byStringValue((p) => p.published))
  .reverse()

// TODO: Add count of posts to each category
export const categories = [
  ...new Set(allPosts.flatMap((p) => p.categories ?? [])),
].sort(byString())

// TODO: Add count of posts to each tag
export const tags = [...new Set(allPosts.flatMap((p) => p.tags ?? []))].sort(
  byString()
)

export function findSiblings(post: Post) {
  const index = postsByPublished.findIndex(({ slug }) => slug === post.slug)
  return {
    prev: postsByPublished[index + 1],
    next: postsByPublished[index - 1],
  } as const
}
