import { notFound, redirect } from 'next/navigation'
import { type Post } from '@/content/posts'

/**
 * Redirects to a blog post if one with given permalink exists.
 */
export function handlePermalink(posts: Post[], permalink: string): never {
  const post = posts.find(
    ({ meta }) => meta.permalinks?.includes(permalink) ?? false
  )

  return post != null
    ? redirect(`/blog/${post.slug}`)
    : permalink.startsWith('/?')
    ? redirect('/')
    : notFound()
}
