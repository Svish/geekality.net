import { handlePermalink } from '@/wordpress'

interface Props {
  params: {
    year: string
    month: string
    day: string
    slug: string
  }
}

export default function Page({ params }: Props) {
  return handlePermalink(
    `/${params.year}/${params.month}/${params.day}/${params.slug}/`
  )
}
