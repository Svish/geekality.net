import H1 from '@/components/H1'

import { categories } from '@/content'

export const metadata = {
  title: 'Categories',
}

export default async function BlogPage() {
  return (
    <>
      <H1>Categories</H1>
      <ul>
        {categories.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </>
  )
}
