import { type Metadata } from 'next'

import { searchPosts } from '@/content/search'

import Breadcrumbs from '@/components/Breadcrumbs'
import H1 from '@/components/H1'

import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import { Suspense } from 'react'

type Props = {
  searchParams: { q: string | undefined }
}

export async function generateMetadata({
  searchParams: { q: query = '' },
}: Props) {
  return {
    title: query.length === 0 ? 'Search' : `Search: ${query}`,
  }
}

export default async function SearchPage({
  searchParams: { q: query = '' },
}: Props) {
  return (
    <>
      <Breadcrumbs crumbs={[{ pathname: '/search', label: 'Search' }]} />
      <H1>Search</H1>
      <SearchInput param="q" defaultValue={query} />
      {query.length > 0 && (
        <output aria-label="Search results" className="block mt-4">
          <Suspense
            fallback={
              // TODO: Replace with indeterminate progress bar
              <p>Searching …</p>
            }
          >
            <SearchResults query={query} />
          </Suspense>
        </output>
      )}
    </>
  )
}
