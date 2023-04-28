import { handlePermalink } from '@/wordpress'

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
      <h1>Home</h1>
    </>
  )
}
