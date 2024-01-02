import { LOCALE } from '@/config/locale'

type Direction = 'asc' | 'desc'
type CompareFn<T> = (x: T, y: T) => number
type ValueFn<T, R> = (o: T) => R

export function byString(direction: Direction = 'asc'): CompareFn<string> {
  const collator = new Intl.Collator(LOCALE, {
    usage: 'sort',
    numeric: true, // 2 before 10, etc.
  })

  const d = direction === 'asc' ? 1 : -1

  return (x, y) =>
    (x === y ? 0 : x == null ? 1 : y == null ? -1 : collator.compare(x, y)) * d
}
export function byStringValue<T>(
  getValue: ValueFn<T, string>,
  direction: Direction = 'asc'
): CompareFn<T> {
  const compare = byString(direction)
  return (x, y) => compare(getValue(x), getValue(y))
}
