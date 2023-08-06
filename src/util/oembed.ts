import 'server-only'

import { Parser } from 'htmlparser2'
import { isValidElement, Children, type ReactNode } from 'react'
import { z } from 'zod'

const allowed = [
  'www.youtube.com',
  'www.flickr.com',
  'vimeo.com',
  'open.spotify.com',
] as const

/**
 * Checks if the children given is a single element with an `href` prop,
 * and returns the value of the `href` prop if it is.
 */
export function tryGetLonelyHref(children: ReactNode): null | string {
  const array = Children.toArray(children)
  return array.length === 1 &&
    isValidElement(array[0]) &&
    typeof array[0].props.href === 'string'
    ? array[0].props.href
    : null
}

/**
 * Tries to fetch the oEmbed info for a given `href` via the
 * oEmbed discovery process.
 *
 * @param href The URL to get the oEmbed info for.
 * @returns The oEmbed info, or `null` if it could not be found.
 * @see https://oembed.com
 * @see https://oembed.link/
 */
export async function tryGetOembed(href: string) {
  const { hostname } = new URL(href)
  if (!allowed.includes(hostname)) {
    return null
  }

  try {
    // Get the HTML
    const res = await fetch(href, {
      signal: AbortSignal.timeout(4000),
    })
    const html = await res.text()

    // Parse and look for the oembed link
    let url = null as URL | null
    const parser = new Parser({
      onopentag(name, attribs) {
        if (
          name === 'link' &&
          attribs.rel === 'alternate' &&
          href.includes('flickr')
        ) {
          console.log(attribs)
        }

        if (
          name === 'link' &&
          /alternate|alternative/.test(attribs.rel ?? '') &&
          attribs.type === 'application/json+oembed' &&
          attribs.href != null
        ) {
          url = new URL(attribs.href)
          parser.reset()
        }
      },
      onerror(error) {
        console.error('`tryGetOembed` parsing failed', error)
      },
    })
    parser.write(html)
    parser.end()

    if (url == null) return null

    // Get oembed info
    url.searchParams.set('format', 'json')
    url.searchParams.set('maxwidth', '640')
    url.searchParams.set('maxheight', '480')
    const oembed = await (await fetch(url)).json()

    return oembedSchema.parse(oembed)
  } catch (error) {
    console.warn('`tryGetOembed` failed', error)
    return null
  }
}

/**
 * Schema for parsing oEmbed JSON.
 */
const oembedSchema = z
  .object({
    version: z.literal('1.0'),
    title: z.string().optional(),
    thumbnail_url: z.string().url().optional(),
    thumbnail_width: z.number().optional(),
    thumbnail_height: z.number().optional(),
    provider_name: z.string().optional(),
    provider_url: z.string().url().optional(),
    author_name: z.string().optional(),
    author_url: z.string().url().optional(),
  })
  .transform((data) => {
    return {
      version: data.version,
      title: data.title ?? null,
      provider:
        data.provider_name != null && data.provider_url != null
          ? {
              name: data.provider_name,
              url: data.provider_url,
            }
          : null,
      author:
        data.author_name != null && data.author_url != null
          ? {
              name: data.author_name,
              url: data.author_url,
            }
          : null,
      thumbnail:
        data.thumbnail_url != null &&
        data.thumbnail_width != null &&
        data.thumbnail_height != null
          ? {
              url: data.thumbnail_url,
              width: data.thumbnail_width,
              height: data.thumbnail_height,
            }
          : null,
    }
  })
  .and(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('photo'),
        url: z.string().url(),
        html: z.string().optional(),
        width: z.number(),
        height: z.number(),
      }),
      z.object({
        type: z.literal('video'),
        html: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      z.object({
        type: z.literal('rich'),
        html: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      z.object({
        type: z.literal('link'),
      }),
    ])
  )
