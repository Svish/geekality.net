import { type MetadataRoute } from 'next'
import { absolute } from '@/config/url'

import { allPosts } from '@/content'

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Find a way to get last build date, or something, here...
  const lastModified = new Date()

  return [
    {
      url: absolute(),
      lastModified,
    },

    ...allPosts.map((p) => ({
      url: absolute(p.pathname),
      lastModified: lastModified,
    })),
  ]
}
