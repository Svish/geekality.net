import { notFound, redirect } from 'next/navigation'
import { allBlogPosts } from 'contentlayer/generated'

/**
 * Redirects to a blog post if one with given permalink exists.
 */
export function handlePermalink(permalink: string): never {
  const post = allBlogPosts.find(
    (p) => p.permalinks?.includes(permalink) ?? false
  )
  return post != null
    ? redirect(`/blog/${post.slug}`)
    : permalink.startsWith('/?')
    ? redirect('/')
    : notFound()
}
