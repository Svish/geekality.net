import { postsByPublished } from '@/content'
import { type Metadata } from 'next'

import H1 from '@/components/H1'
import PostList from '@/components/PostList'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const publishedPosts = postsByPublished.filter(
    (post) => new Date(post.published).getTime() <= Date.now()
  )
  return (
    <>
      <H1>Blog</H1>
      <PostList posts={publishedPosts} />
    </>
  )
}
