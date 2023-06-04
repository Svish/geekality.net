import Link from '@/components/Link'
import { formatDate } from '@/util/format'

import { type Post } from '@/content'

interface Props {
  posts: Post[]
}

export default function PostList({ posts }: Props) {
  return (
    <ul className="flex flex-col gap-4">
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
