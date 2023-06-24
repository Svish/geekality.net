import feed from '@/content/feed'

export async function GET() {
  return feed().rss2()
}
