import { allBlogPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

import 'highlight.js/styles/github.css'
import { formatDate } from '@/util/format'

export const metadata = {
  title: 'Blog',
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = allBlogPosts.find(({ slug }) => slug === params.slug)
  if (post == null) notFound()

  const MDXContent = getMDXComponent(post.body.code)

  return (
    <>
      <h1>{post.title}</h1>
      <p>{formatDate(post.published, 'long')}</p>
      <MDXContent />
      <hr />
      <pre style={{ color: '#bbb', overflowX: 'auto' }}>
        <code>{JSON.stringify(post, null, 2)}</code>
      </pre>
    </>
  )
}
