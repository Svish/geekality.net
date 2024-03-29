import { Feed } from 'feed'

import { site } from '@/config'
import { absolute } from '@/config/url'
import { getAllPosts } from '@/content/posts'

feed.title = `${site.title} – Blog`

export default async function feed() {
  const posts = await getAllPosts()
  const latestPost = posts.at(0)

  const f = new Feed({
    id: absolute('blog'),
    link: absolute(),
    language: 'en',
    favicon: absolute('favicon.ico'),
    image: absolute('apple-touch-icon.png'),
    title: feed.title,
    description: 'Feed of latest posts on my blog.',
    copyright: `${new Date().getFullYear()}, www.geekality.net`,
    author: site.author,
    feedLinks: {
      rss: absolute('blog/feed/rss'),
      atom: absolute('blog/feed/atom'),
    },
    updated:
      latestPost != null ? new Date(latestPost.meta.published) : new Date(),
    ttl: 60 * 60 * 24,
  })

  f.addCategory('blog')

  posts.slice(0, 7).forEach((post) =>
    f.addItem({
      id: absolute(post.pathname),
      link: absolute(post.pathname),
      date: new Date(post.meta.published),
      title: post.meta.title,
      category: post.meta.categories.map((name) => ({ name })),
      author: [site.author],
    })
  )

  return {
    rss2: () =>
      new Response(f.rss2(), {
        headers: {
          'content-type': 'text/xml; charset=utf-8',
        },
      }),
    atom1: () =>
      new Response(f.atom1(), {
        headers: {
          'content-type': 'application/atom+xml; charset=utf-8',
        },
      }),
    json1: () =>
      new Response(f.json1(), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      }),
  } as const
}
