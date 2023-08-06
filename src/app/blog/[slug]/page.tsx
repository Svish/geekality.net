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
import Breadcrumbs from '@/components/Breadcrumbs'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  // return postsSortedByPublished.map(({ slug }) => ({ slug }))
  return []
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
      <Breadcrumbs
        crumbs={[
          { pathname: '/blog', label: 'Blog' },
          { pathname: `/blog/${params.slug}`, label: post.title },
        ]}
      />
      <H1 lang={post.lang}>{post.title}</H1>

      <div className="mb-2 -mt-4 text-xs text-gray-600 dark:text-gray-400">
        Published:{' '}
        <time dateTime={post.published}>
          {formatDate(post.published, 'long')}
        </time>
      </div>

      <ul className="flex flex-wrap gap-2 mb-4">
        {post.categories.map((category) => (
          <li key={category}>
            <Link
              href={`/blog/categories/${category}`}
              rel="category"
              className="block px-2 py-1 bg-gray-300 border border-gray-500 rounded dark:bg-gray-700 dark:border-gray-500 whitespace-nowrap"
            >
              {category}
            </Link>
          </li>
        ))}
        {post.tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/blog/tags/${tag}`}
              rel="tag"
              className="block px-2 py-1 bg-gray-200 border border-gray-400 rounded dark:bg-gray-800 dark:border-gray-600 whitespace-nowrap"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>

      <Prose lang={post.lang}>
        <MDXContent components={mdxComponents} />
      </Prose>

      <div className="mt-12 max-w-[65ch]">
        <aside
          aria-label="Post meta"
          className="mt-4 text-xs text-gray-600 dark:text-gray-400"
        >
          {(prev || next) && (
            <div className="mt-2">
              {next && (
                <div>
                  Next post:{' '}
                  <Link href={`/blog/${next.slug}`} rel="next">
                    {next.title}
                  </Link>
                </div>
              )}
              {prev && (
                <div>
                  Previous post:{' '}
                  <Link href={`/blog/${prev.slug}`} rel="prev">
                    {prev.title}
                  </Link>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
