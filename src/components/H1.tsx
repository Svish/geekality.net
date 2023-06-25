import { type HTMLProps } from 'react'
import { cn } from '@/util'

type Props = HTMLProps<HTMLHeadingElement>

export default function H1({ children, className, ...props }: Props) {
  return (
    <h1 className={cn('text-3xl mb-4 text-balance', className)} {...props}>
      {children}
    </h1>
  )
}
