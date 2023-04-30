import { byStringValue } from '@/util/sort'
import { allBlogPosts } from 'contentlayer/generated'
import Link from 'next/link'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  const posts = [...allBlogPosts].sort(byStringValue((p) => p.title)).reverse()

  // TODO: Sort by `published`
  // TODO: Create list of cards instead with a bit more info (date, tags, category, etc.)

  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
