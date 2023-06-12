import invariant from 'tiny-invariant'

export const BASE_URL = process.env.PRIMARY_URL
  ? `https://${process.env.PRIMARY_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT ?? 3000}`

/**
 * Returns the absolute URL for the given pathname.
 */
export function absolute(pathname: string = ''): string {
  return BASE_URL + pathname
}
