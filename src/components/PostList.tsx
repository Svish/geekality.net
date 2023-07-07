import { cn } from '@/util'
import { formatDate } from '@/util/format'

import Link from '@/components/Link'
import { type Post } from '@/content'

interface Props {
  posts: Post[]
  withMeta?: boolean
  className?: string
}

export default function PostList({
  posts,
  withMeta = false,
  className,
}: Props) {
  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {posts.map((post) => (
        <li key={post._id} className="flex flex-col">
          <div>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Published: {formatDate(post.published, 'long')}
          </div>
          {withMeta && (
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Posted in
              <ul className="inline-list">
                {post.categories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
              , tagged with
              <ul className="inline-list">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
