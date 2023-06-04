import { type MetadataRoute } from 'next'
import invariant from 'tiny-invariant'

import { postsByPublished } from '@/content'

export default function sitemap(): MetadataRoute.Sitemap {
  invariant(process.env.ORIGIN != null)
  const origin = process.env.ORIGIN

  // TODO: Find a way to get last build date, or something, here...
  const lastModified = new Date()

  return [
    {
      url: origin + '',
      lastModified,
    },

    ...postsByPublished.map((p) => ({
      url: origin + p.pathname,
      lastModified: lastModified,
    })),
  ]
}
