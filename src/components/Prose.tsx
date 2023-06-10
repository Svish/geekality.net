import { type HTMLProps } from 'react'

import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLDivElement>

export default function Prose({ children, className, ...props }: Props) {
  return (
    <div className={twMerge('prose dark:prose-invert', className)} {...props}>
      {children}
    </div>
  )
}
