import { LOCALE } from '@/config/locale'

export type DateFormat = 'short' | 'long' | Intl.DateTimeFormatOptions

export function formatDate(
  date: Date | string,
  format: DateFormat = 'short'
): string {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  switch (format) {
    case 'short':
      format = { day: '2-digit', month: '2-digit', year: 'numeric' }
      break

    case 'long':
      format = { day: 'numeric', month: 'long', year: 'numeric' }
      break

    default:
      // Use given format as-is
      break
  }

  return date.toLocaleDateString(LOCALE, format).replace(/ /g, ' ')
}
