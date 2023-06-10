import { twMerge } from 'tailwind-merge'
import { formatDate } from '@/util/format'

import Link from '@/components/Link'
import { type Post } from '@/content'

interface Props {
  posts: Post[]
  className?: string
}

export default function PostList({ className, posts }: Props) {
  return (
    <ul className={twMerge('flex flex-col gap-4', className)}>
      {posts.map((post) => (
        <li key={post._id} className="flex flex-col">
          <div>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Published: {formatDate(post.published, 'long')}
          </div>
        </li>
      ))}
    </ul>
  )
}
