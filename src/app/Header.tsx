import Link from 'next/link'

const links = [{ href: '/blog', label: 'Blog' }]

export default function Header() {
  return (
    <header className="flex items-baseline gap-6 px-6 py-4 bg-gray-300">
      <Link href="/" className="text-4xl">
        Geekality
      </Link>
      <Link href="/blog" className="text-xl">
        Blog
      </Link>
    </header>
  )
}
