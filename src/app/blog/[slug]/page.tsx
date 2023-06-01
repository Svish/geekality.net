import '@/styles/blogPage.css'

import { allBlogPosts } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { notFound } from 'next/navigation'
import { formatDate } from '@/util/format'

import mdxComponents from '@/components/mdx'

import H1 from '@/components/H1'
import Link from '@/components/Link'
import Prose from '@/components/Prose'

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
    alternates: {
      canonical: post.pathname,
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

      <Prose lang={post.lang}>
        <MDXContent components={mdxComponents} />
      </Prose>

      <aside
        aria-label="post meta"
        className="mt-4 text-xs text-gray-600 dark:text-gray-400"
      >
        Published:{' '}
        <time dateTime={post.published}>
          {formatDate(post.published, 'long')}
        </time>
        <br />
        Posted in
        <ul className="inline-list">
          {post.categories.map((category) => (
            <li key={category}>
              <Link href={`/blog/categories/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
        , tagged with
        <ul className="inline-list">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/blog/tags/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}
