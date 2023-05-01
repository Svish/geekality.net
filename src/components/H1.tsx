import { type HTMLProps } from 'react'

import clsx from 'clsx'

type Props = HTMLProps<HTMLHeadingElement>

export default function H1({ children, className }: Props) {
  return <h1 className={clsx('text-3xl ', className)}>{children}</h1>
}
