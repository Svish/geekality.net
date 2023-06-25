import { type HTMLProps } from 'react'

import { cn } from '@/util'

type Props = HTMLProps<HTMLDivElement>

export default function Prose({ children, className, ...props }: Props) {
  return (
    <div className={cn('prose dark:prose-invert', className)} {...props}>
      {children}
    </div>
  )
}
