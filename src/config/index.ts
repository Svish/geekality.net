import { absolute } from './url'

export const site = {
  title: 'Geekality',
  tagline: 'With a hint of social ineptitude',
  author: {
    name: 'Torleif Berger',
    link: absolute('about'),
  },
} as const
