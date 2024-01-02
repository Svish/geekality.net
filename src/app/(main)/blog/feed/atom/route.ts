import feed from '@/content/feed'

export async function GET() {
  const f = await feed()
  return f.atom1()
}
