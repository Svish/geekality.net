import 'highlight.js/styles/github.css'

import { allBlogPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import { formatDate } from '@/util/format'

import H1 from '@/components/H1'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: Props) {
  const post = allBlogPosts.find(({ slug }) => slug === params.slug)
  if (post == null) notFound()

  return {
    title: post.title,
    openGraph: {
      title: post.title,
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const post = allBlogPosts.find(({ slug }) => slug === params.slug)
  if (post == null) notFound()

  const MDXContent = getMDXComponent(post.body.code)

  return (
    <>
      <H1 lang={post.lang}>{post.title}</H1>
      <p>
        Published: {formatDate(post.published, 'long')}
        {post.categories != null && (
          <>
            <br />
            Categories: {post.categories?.join(', ')}
          </>
        )}
        {post.tags != null && (
          <>
            <br />
            Tags: {post.tags?.join(', ')}
          </>
        )}
      </p>
      <div lang={post.lang}>
        <MDXContent />
      </div>
    </>
  )
}
