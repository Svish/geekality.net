import { allPosts, type Post } from '@/content'
import Fuse from 'fuse.js'

const config = {
  keys: [
    { name: 'title', weight: 1 },
    { name: 'body.raw', weight: 0.5 },
  ],
  threshold: 0.25,
  shouldSort: true,
  ignoreLocation: true,
  includeMatches: true,
} satisfies Fuse.IFuseOptions<Post>

export async function searchPosts(query: string) {
  // TODO: Try get or create index from somewhere
  return query === '' ? [] : new Fuse(allPosts, config).search(query)
}

function createIndex() {
  // https://fusejs.io/api/indexing.html#fuse-createIndex
  return Fuse.createIndex(config.keys, allPosts)
}

async function readIndex() {
  // https://fusejs.io/api/indexing.html#fuse-parseindex
  return Fuse.parseIndex('')
}
