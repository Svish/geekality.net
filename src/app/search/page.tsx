import { type Metadata } from 'next'

import { searchPosts } from '@/content/search'

import H1 from '@/components/H1'
import SearchInput from './SearchInput'
import PostList from '@/components/PostList'

export const metadata: Metadata = {
  title: 'Search',
}

export default async function SearchPage({
  searchParams: { q: query },
}: {
  searchParams: { q: string | undefined }
}) {
  const results = await searchPosts(query ?? '')

  return (
    <>
      <H1>Search</H1>
      <SearchInput />

      {query != null && (
        <output aria-label="Search results" className="block mt-4">
          {results.length === 0 ? (
            <p>No results</p>
          ) : (
            <PostList posts={results.map(({ item }) => item)} />
          )}
        </output>
      )}
    </>
  )
}
