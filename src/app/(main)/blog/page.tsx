import { getAllPosts } from '@/content/posts'

import H1 from '@/components/H1'
import PostList from '@/components/PostList'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <Breadcrumbs crumbs={[{ pathname: '/blog', label: 'Blog' }]} />
      <H1>Blog</H1>
      <PostList posts={posts} />
    </>
  )
}
