import { tags } from '@/content'

import H1 from '@/components/H1'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Tags',
}

export default async function BlogTagsPage() {
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
