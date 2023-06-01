import { type HTMLProps } from 'react'

import clsx from 'clsx'

type Props = HTMLProps<HTMLDivElement>

export default function Prose({ children, className, ...props }: Props) {
  return (
    <div className={clsx('prose dark:prose-invert', className)} {...props}>
      {children}
    </div>
  )
}
