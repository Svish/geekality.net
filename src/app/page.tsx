import type { Metadata } from 'next'

import { handlePermalink } from '@/content/wordpress'
import { postsByPublished } from '@/content'

import H1 from '@/components/H1'
import PostList from '@/components/PostList'

interface Props {
  searchParams: { p?: string }
}

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function HomePage({ searchParams }: Props) {
  // Redirects from old wordpress id-based permalinks
  if (searchParams.p) {
    return handlePermalink(`/?p=${searchParams.p}`)
  }

  const posts = postsByPublished.slice(0, 7)

  return (
    <>
      <H1 className="sr-only">Home</H1>

      <h2 className="mb-4 text-3xl">Latest blog posts</h2>
      <PostList posts={posts} />
    </>
  )
}
