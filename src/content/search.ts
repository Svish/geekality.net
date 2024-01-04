import Fuse, { IFuseOptions } from 'fuse.js'

import { getAllPosts, type Post } from '@/content/posts'

const config = {
  keys: [
    { name: 'title', weight: 1 },
    // TODO: Fix searching for content (which no longer works)
    { name: 'body.raw', weight: 0.5 },
    // TODO: Search for tags and categories
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
