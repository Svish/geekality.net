import { allBlogPosts } from 'contentlayer/generated'
import Link from 'next/link'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  return (
    <>
      <h1>Blog</h1>
      <ul>
        {allBlogPosts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
