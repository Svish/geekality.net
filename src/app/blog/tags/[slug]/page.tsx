import { type Metadata } from 'next'

import { allPosts } from '@/content'
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

export function generateMetadata({ params }: Props): Metadata {
  const tagHasPosts = allPosts.some(
    ({ tags }) => tags?.includes(params.slug) === true
  )
  if (!tagHasPosts) notFound()

  return {
    title: `Tag: ${params.slug}`,
    openGraph: {
      title: `Tag: ${params.slug}`,
    },
  }
}

export default async function BlogTagsTagPage({ params }: Props) {
  const postsInTag = allPosts.filter(
    ({ tags }) => tags?.includes(params.slug) === true
  )
  if (postsInTag.length === 0) notFound()

  const title = params.slug

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { pathname: '/blog', label: 'Blog' },
          { pathname: '/blog/tags', label: 'Tags' },
          { pathname: `/blog/tags/${params.slug}`, label: title },
        ]}
      />
      <H1>{title}</H1>
      <PostList posts={postsInTag} />
    </>
  )
}
