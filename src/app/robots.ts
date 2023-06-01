import { type MetadataRoute } from 'next'
import invariant from 'tiny-invariant'

export default function robots(): MetadataRoute.Robots {
  invariant(process.env.ORIGIN != null)

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/',
    },
    sitemap: process.env.ORIGIN + '/sitemap.xml',
  }
}
