import { byString, byStringValue } from '@/util/sort'

import { allBlogPosts } from 'contentlayer/generated'

export const posts = [...allBlogPosts]
  .sort(byStringValue((p) => p.published))
  .reverse()

export const categories = [
  ...new Set(allBlogPosts.flatMap((p) => p.categories ?? [])),
].sort(byString())

export const tags = [
  ...new Set(allBlogPosts.flatMap((p) => p.tags ?? [])),
].sort(byString())
