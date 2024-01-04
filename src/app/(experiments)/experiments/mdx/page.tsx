import { getAllPosts } from '@/content/posts'

export default async function Page() {
  const posts = await getAllPosts()

  return <pre>{JSON.stringify(posts, undefined, 2)}</pre>
}
