'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchInput() {
  const params = useSearchParams()
  const router = useRouter()

  const query = params.get('q') ?? ''

  return (
    <form
      method="GET"
      onSubmit={(e) => {
        e.preventDefault()
        const query = e.currentTarget['query'].value
        router.push(`/search?q=${encodeURIComponent(query)}`)
      }}
    >
      <input
        className="w-full px-4 py-2 rounded-full"
        name="query"
        type="search"
        autoFocus
        defaultValue={query}
      />
    </form>
  )
}
