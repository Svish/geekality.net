import '@/styles/post.css'

import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { formatDate } from '@/util/format'
import { absolute } from '@/config/url'

import { getAllPosts, getPost, findSiblingPosts } from '@/content/posts'

import H1 from '@/components/H1'
import Link from '@/components/Link'
import Prose from '@/components/Prose'
import Breadcrumbs from '@/components/Breadcrumbs'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug)

  if (post == null) notFound()

  return {
    title: post.meta.title,
    openGraph: {
      title: post.meta.title,
    },
    alternates: {
      canonical: absolute(post.pathname),
    },
  } satisfies Metadata
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)
  if (post == null) notFound()

  const posts = await getAllPosts()
  const { prev, next } = findSiblingPosts(posts, post)

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { pathname: '/blog', label: 'Blog' },
          { pathname: `/blog/${params.slug}`, label: post.meta.title },
        ]}
      />
      <H1 lang={post.meta.lang}>{post.meta.title}</H1>

      <div className="mb-2 -mt-4 text-xs text-gray-600 dark:text-gray-400">
        Published:{' '}
        <time dateTime={post.meta.published}>
          {formatDate(post.meta.published, 'long')}
        </time>
      </div>

      <ul className="flex flex-wrap gap-2 mb-4">
        {post.meta.categories.map((category) => (
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
        {post.meta.tags.map((tag) => (
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

      <Prose lang={post.meta.lang}>{post.content}</Prose>

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
                    {next.meta.title}
                  </Link>
                </div>
              )}
              {prev && (
                <div>
                  Previous post:{' '}
                  <Link href={`/blog/${prev.slug}`} rel="prev">
                    {prev.meta.title}
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
