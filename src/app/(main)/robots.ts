import { type MetadataRoute } from 'next'
import { absolute } from '@/config/url'

export default function robots(): MetadataRoute.Robots {
  console.log(process.env.VERCEL_URL)

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/',
    },
    sitemap: absolute('sitemap.xml'),
  }
}
