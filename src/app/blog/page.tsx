import { postsSortedByPublished } from '@/content'
import { type Metadata } from 'next'

import H1 from '@/components/H1'
import PostList from '@/components/PostList'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const publishedPosts = postsSortedByPublished.filter(
    (post) => new Date(post.published).getTime() <= Date.now()
  )
  return (
    <>
      <Breadcrumbs crumbs={[{ pathname: '/blog', label: 'Blog' }]} />
      <H1>Blog</H1>
      <PostList posts={publishedPosts} />
    </>
  )
}
