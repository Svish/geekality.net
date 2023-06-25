import { type Metadata } from 'next'

import { allPosts } from '@/content'
import { notFound } from 'next/navigation'

import H1 from '@/components/H1'
import PostList from '@/components/PostList'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return []
}

export function generateMetadata({ params }: Props): Metadata {
  const categoryHasPosts = allPosts.some(
    ({ categories }) => categories?.includes(params.slug) === true
  )
  if (!categoryHasPosts) notFound()

  return {
    title: `Category: ${params.slug}`,
    openGraph: {
      title: `Category: ${params.slug}`,
    },
  }
}

export default async function BlogCategoriesCategoryPage({ params }: Props) {
  const postsInCategory = allPosts.filter(
    ({ categories }) => categories?.includes(params.slug) === true
  )
  if (postsInCategory.length === 0) notFound()

  return (
    <>
      <H1>Category: {params.slug}</H1>
      <PostList posts={postsInCategory} />
    </>
  )
}
