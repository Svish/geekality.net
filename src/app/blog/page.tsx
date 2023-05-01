import H1 from '@/components/H1'
import PostListItem from './PostListItem'

import { posts } from '@/content'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  return (
    <>
      <H1>Blog</H1>
      <ul>
        {posts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </ul>
    </>
  )
}
