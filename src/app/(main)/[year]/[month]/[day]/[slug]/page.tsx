import { getAllPosts } from '@/content/posts'
import { handlePermalink } from '@/content/wordpress'

interface Props {
  params: {
    year: string
    month: string
    day: string
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const posts = await getAllPosts()

  return handlePermalink(
    posts,
    `/${params.year}/${params.month}/${params.day}/${params.slug}/`
  )
}
