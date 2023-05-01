import Link from 'next/link'
import { formatDate } from '@/util/format'

import { type BlogPost } from 'contentlayer/generated'

interface Props {
  post: BlogPost
}

export default function PostListItem({ post }: Props) {
  return (
    <li>
      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      <br />
      Published: {formatDate(post.published, 'long')}
      {post.categories != null && (
        <>
          <br />
          Categories: {post.categories?.join(', ')}
        </>
      )}
      {post.tags != null && (
        <>
          <br />
          Tags: {post.tags?.join(', ')}
        </>
      )}
    </li>
  )
}
