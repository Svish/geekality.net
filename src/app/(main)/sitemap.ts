import { type MetadataRoute } from 'next'
import { absolute } from '@/config/url'

import { getAllPosts } from '@/content'

export default async function sitemap() {
  const posts = await getAllPosts()

  // TODO: Find a way to get last build date, or something, here...
  const lastModified = new Date()

  return [
    {
      url: absolute(),
      lastModified,
    },
    {
      url: absolute('about'),
      lastModified,
    },
    {
      url: absolute('blog'),
      lastModified,
    },

    ...posts.map((p) => ({
      url: absolute(p.pathname),
      lastModified: lastModified,
    })),
  ] satisfies MetadataRoute.Sitemap
}
