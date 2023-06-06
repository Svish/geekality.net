import { notFound, redirect } from 'next/navigation'
import { allPosts } from '@/content'

/**
 * Redirects to a blog post if one with given permalink exists.
 */
export function handlePermalink(permalink: string): never {
  const post = allPosts.find((p) => p.permalinks?.includes(permalink) ?? false)
  return post != null
    ? redirect(`/blog/${post.slug}`)
    : permalink.startsWith('/?')
    ? redirect('/')
    : notFound()
}
