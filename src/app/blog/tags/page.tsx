import { tags } from '@/content'

import H1 from '@/components/H1'
import Link from '@/components/Link'

export const metadata = {
  title: 'Tags',
}

export default async function BlogTagsPage() {
  return (
    <>
      <H1>Tags</H1>
      <ul>
        {tags.map(({ slug, count }) => (
          <li key={slug}>
            <Link href={`/blog/tags/${slug}`}>{slug}</Link> ({count})
          </li>
        ))}
      </ul>
    </>
  )
}
