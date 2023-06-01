import { LOCALE } from '@/config/locale'

type CompareFn<T> = (x: T, y: T) => number
type ValueFn<T, R> = (o: T) => R

export function byString(): CompareFn<string> {
  const collator = new Intl.Collator(LOCALE, {
    usage: 'sort',
    numeric: true, // 2 before 10, etc.
  })

  return (x, y) =>
    x === y ? 0 : x == null ? 1 : y == null ? -1 : collator.compare(x, y)
}
export function byStringValue<T>(getValue: ValueFn<T, string>): CompareFn<T> {
  const compare = byString()
  return (x, y) => compare(getValue(x), getValue(y))
}
