import Fuse, { IFuseOptions } from 'fuse.js'

import { getAllPosts, type Post } from '@/content/posts'

const config = {
  keys: [
    { name: 'meta.title', weight: 0.8 },
    { name: 'source', weight: 0.5 },
    { name: 'meta.tags', weight: 0.1 },
    { name: 'meta.categories', weight: 0.05 },
  ],
  threshold: 0.1,
  shouldSort: true,
  ignoreLocation: true,
  ignoreFieldNorm: true,
} satisfies IFuseOptions<Post>

export async function searchPosts(query: string) {
  const posts = await getAllPosts()
  return query === '' ? [] : new Fuse(posts, config).search(query)
}
