import { cn } from '@/util'

import { type AnchorHTMLAttributes, type ReactNode } from 'react'
import NextLink, { type LinkProps } from 'next/link'

const linkClasses = null

export default function Link<R extends string>({
  className,
  children,
  ...props
}: LinkProps<R>) {
  return (
    <NextLink className={cn(linkClasses, className)} {...props}>
      {children}
    </NextLink>
  )
}

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  className?: string
}

export function ExternalLink({
  href,
  className,
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={cn(linkClasses, className)}
      rel="external norefferer"
      {...props}
    >
      {children}
    </a>
  )
}
