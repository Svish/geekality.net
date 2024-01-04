import { byString } from '@/util/sort'
import { getAllPosts } from '@/content/posts'

import H1 from '@/components/H1'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Tags',
}

export default async function BlogTagsPage() {
  const posts = await getAllPosts()

  const tags = [...new Set(posts.flatMap(({ meta }) => meta.tags ?? []))]
    .sort(byString())
    .map((tag) => ({
      slug: tag,
      count: posts.filter(({ meta }) => meta.tags?.includes(tag)).length,
    }))

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { pathname: '/blog', label: 'Blog' },
          { pathname: '/blog/tags', label: 'Tags' },
        ]}
      />
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
