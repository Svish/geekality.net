import '@/styles/post.css'

import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { formatDate } from '@/util/format'
import { absolute } from '@/config/url'

import { getMDXComponent } from 'next-contentlayer/hooks'
import { postsSortedByPublished, findSiblingPosts } from '@/content'
import mdxComponents from '@/components/mdx'

import H1 from '@/components/H1'
import Link from '@/components/Link'
import Prose from '@/components/Prose'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return postsSortedByPublished.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: Props): Metadata {
  const post = postsSortedByPublished.find(({ slug }) => slug === params.slug)
  if (post == null) notFound()

  return {
    title: post.title,
    openGraph: {
      title: post.title,
    },
    alternates: {
      canonical: absolute(post.pathname),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = postsSortedByPublished.find(({ slug }) => slug === params.slug)
  if (post == null) notFound()

  const MDXContent = getMDXComponent(post.body.code)
  const { prev, next } = findSiblingPosts(post)

  return (
    <>
      <H1 lang={post.lang}>{post.title}</H1>

      <Prose lang={post.lang}>
        <MDXContent components={mdxComponents} />
      </Prose>

      <div className="mt-12 max-w-[65ch]">
        <aside
          aria-label="Post meta"
          className="mt-4 text-xs text-gray-600 dark:text-gray-400"
        >
          <div>
            Published:{' '}
            <time dateTime={post.published}>
              {formatDate(post.published, 'long')}
            </time>
          </div>
          <div>
            Posted in
            <ul className="inline-list">
              {post.categories.map((category) => (
                <li key={category}>
                  <Link href={`/blog/categories/${category}`} rel="category">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
            , tagged with
            <ul className="inline-list">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/blog/tags/${tag}`} rel="tag">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            Index: {postsSortedByPublished.indexOf(post) + 1} of{' '}
            {postsSortedByPublished.length}
          </div>
          {prev && (
            <div className="mt-2">
              Next post:{' '}
              <Link href={`/blog/${prev.slug}`} rel="prev">
                {prev.title}
              </Link>
            </div>
          )}
          {next && (
            <div>
              Previous post:{' '}
              <Link href={`/blog/${next.slug}`} rel="next">
                {next.title}
              </Link>
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
