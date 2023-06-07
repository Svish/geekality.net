import Fuse from 'fuse.js'
import { allPosts } from '@/content'

// TODO: Make a search component, somewhere, somehow, with this
// TODO: Index during build?
// https://fusejs.io/api/indexing.html

const fuse = new Fuse(allPosts, {
  keys: [
    { name: 'title', weight: 1 },
    { name: 'body.raw', weight: 0.5 },
  ],
  findAllMatches: true,
  shouldSort: true,
  minMatchCharLength: 2,
  useExtendedSearch: true,
})

export function searchWithFuse(query: string) {
  return query === '' ? [] : fuse.search(query)
}
