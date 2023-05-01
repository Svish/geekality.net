import H1 from '@/components/H1'

import { tags } from '@/content'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage() {
  return (
    <>
      <H1>Tags</H1>
      <ul>
        {tags.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </>
  )
}
