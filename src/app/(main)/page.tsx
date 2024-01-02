import { handlePermalink } from '@/content/wordpress'
import { getAllPosts } from '@/content'

import H1 from '@/components/H1'
import PostList from '@/components/PostList'

interface Props {
  searchParams: { p?: string }
}

export default async function HomePage({ searchParams }: Props) {
  const posts = await getAllPosts()

  // Redirects from old wordpress id-based permalinks
  if (searchParams.p) {
    return handlePermalink(posts, `/?p=${searchParams.p}`)
  }

  const latestPosts = (await getAllPosts()).slice(0, 7)

  return (
    <>
      <H1 className="sr-only">Home</H1>

      <h2 className="mb-4 text-3xl">Latest blog posts</h2>
      <PostList posts={latestPosts} />
    </>
  )
}
