import H1 from '@/components/H1'

import { categories } from '@/content'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Categories',
}

export default async function BlogCategoriesPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { pathname: '/blog', label: 'Blog' },
          { pathname: '/blog/categories', label: 'Categories' },
        ]}
      />
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
