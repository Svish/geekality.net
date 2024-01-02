import { notFound, redirect } from 'next/navigation'
import { type PostMeta } from '@/content'

/**
 * Redirects to a blog post if one with given permalink exists.
 */
export function handlePermalink(posts: PostMeta[], permalink: string): never {
  const post = posts.find((p) => p.permalinks?.includes(permalink) ?? false)

  return post != null
    ? redirect(`/blog/${post.slug}`)
    : permalink.startsWith('/?')
    ? redirect('/')
    : notFound()
}
