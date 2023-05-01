import { handlePermalink } from '@/wordpress'
import H1 from '@/components/H1'

interface Props {
  searchParams: { p?: string }
}

export default function HomePage({ searchParams }: Props) {
  // Redirects from old wordpress id-based permalinks
  if (searchParams.p) {
    return handlePermalink(`/?p=${searchParams.p}`)
  }

  return (
    <>
      <H1>Home</H1>
    </>
  )
}
