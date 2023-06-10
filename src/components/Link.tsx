import { twMerge } from 'tailwind-merge'

import { type ReactNode } from 'react'
import NextLink, { type LinkProps } from 'next/link'

const linkClasses = null

export default function Link<R extends string>({
  className,
  children,
  ...props
}: LinkProps<R>) {
  return (
    <NextLink className={twMerge(linkClasses, className)} {...props}>
      {children}
    </NextLink>
  )
}

interface ExternalLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function ExternalLink({ href, className, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={twMerge(linkClasses, className)}
      rel="external norefferer"
    >
      {children}
    </a>
  )
}
