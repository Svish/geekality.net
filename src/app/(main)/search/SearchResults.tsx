import { searchPosts } from '@/content/search'

import PostList from '@/components/PostList'

type Props = {
  query: string
}

export default async function SearchResults({ query }: Props) {
  const results = await searchPosts(query)

  return results.length === 0 ? (
    <p>No results</p>
  ) : (
    <PostList withMeta posts={results.map(({ item }) => item)} />
  )
}
