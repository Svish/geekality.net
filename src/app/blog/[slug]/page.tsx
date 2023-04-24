import { allBlogPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'

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
      <h1>Blog</h1>
      <MDXContent />
    </>
  )
}
