import { type HTMLProps } from 'react'

import { twMerge } from 'tailwind-merge'

type Props = HTMLProps<HTMLHeadingElement>

export default function H1({ children, className, ...props }: Props) {
  return (
    <h1 className={twMerge('text-3xl mb-4', className)} {...props}>
      {children}
    </h1>
  )
}
