import { postsByPublished } from '@/content'
import { type Metadata } from 'next'

import H1 from '@/components/H1'
import PostList from '@/components/PostList'
import Link from '@/components/Link'

export const metadata: Metadata = {
  title: 'Blog',
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  return (
    <>
      <H1>Blog</H1>
      <PostList posts={postsByPublished} />

      <aside className="prose">
        <ul>
          <li>
            <Link href="/blog/tags">All tags</Link>
          </li>
          <li>
            <Link href="/blog/categories">All categories</Link>
          </li>
        </ul>
      </aside>
    </>
  )
}
