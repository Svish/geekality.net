import H1 from '@/components/H1'

import { categories } from '@/content'
import Link from '@/components/Link'

export const metadata = {
  title: 'Categories',
}

export default async function BlogCategoriesPage() {
  return (
    <>
      <H1>Categories</H1>
      <ul>
        {categories.map(({ slug, count }) => (
          <li key={slug}>
            <Link href={`/blog/categories/${slug}`}>{slug}</Link> ({count})
          </li>
        ))}
      </ul>
    </>
  )
}
