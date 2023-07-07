/* eslint-disable @next/next/no-img-element */
import { tryGetOembed } from '@/util/oembed'

export default async function Embed({ href }: { href: string }) {
  const oembed = await tryGetOembed(href)

  switch (oembed?.type) {
    case 'video':
    case 'rich':
      return (
        <div
          className="oembed"
          data-type={oembed.type}
          dangerouslySetInnerHTML={{ __html: oembed.html }}
        ></div>
      )

    case 'photo':
      return oembed.html != null ? (
        <div
          className="oembed"
          data-type={oembed.type}
          dangerouslySetInnerHTML={{ __html: oembed.html }}
        ></div>
      ) : (
        <div className="oembed" data-type={oembed.type}>
          <img
            src={oembed.url}
            alt={oembed.title ?? 'Unknown embedded photo'}
            width={oembed.width}
            height={oembed.height}
          />
        </div>
      )

    case undefined:
    case 'link':
      return (
        <div className="oembed" data-type={oembed?.type}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {href}
          </a>
        </div>
      )
  }
}
