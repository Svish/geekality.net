import Fuse, { IFuseOptions } from 'fuse.js'

import { getAllPosts, type Post } from '@/content'

const config = {
  keys: [
    { name: 'title', weight: 1 },
    { name: 'body.raw', weight: 0.5 },
  ],
  threshold: 0.25,
  shouldSort: true,
  ignoreLocation: true,
  includeMatches: true,
} satisfies IFuseOptions<Post>

export async function searchPosts(query: string) {
  const posts = await getAllPosts()
  return query === '' ? [] : new Fuse(posts, config).search(query)
}

// TODO: Try get or create index from somewhere
// https://www.fusejs.io/api/indexing.html#indexing
