import { type Metadata } from 'next'

import { getAllPosts } from '@/content/posts'
import { notFound } from 'next/navigation'

import H1 from '@/components/H1'
import PostList from '@/components/PostList'
import Breadcrumbs from '@/components/Breadcrumbs'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props) {
  const posts = await getAllPosts()

  const categoryHasPosts = posts.some(
    ({ meta: { categories } }) => categories?.includes(params.slug) === true
  )
  if (!categoryHasPosts) notFound()

  return {
    title: `Category: ${params.slug}`,
    openGraph: {
      title: `Category: ${params.slug}`,
    },
  } satisfies Metadata
}

export default async function BlogCategoriesCategoryPage({ params }: Props) {
  const posts = await getAllPosts()

  const postsInCategory = posts.filter(({ meta: { categories } }) =>
    categories.includes(params.slug)
  )
  if (postsInCategory.length === 0) notFound()

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { pathname: '/blog', label: 'Blog' },
          { pathname: '/blog/categories', label: 'Categories' },
          { pathname: `/blog/categories/${params.slug}`, label: params.slug },
        ]}
      />
      <H1>{params.slug}</H1>
      <PostList posts={postsInCategory} />
    </>
  )
}
