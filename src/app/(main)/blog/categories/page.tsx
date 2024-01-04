import { byString } from '@/util/sort'
import { getAllPosts } from '@/content/posts'

import H1 from '@/components/H1'
import Link from '@/components/Link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Categories',
}

export default async function BlogCategoriesPage() {
  const posts = await getAllPosts()

  const categories = [
    ...new Set(posts.flatMap(({ meta }) => meta.categories ?? [])),
  ]
    .sort(byString())
    .map((category) => ({
      slug: category,
      count: posts.filter(({ meta }) => meta.categories?.includes(category))
        .length,
    }))

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
