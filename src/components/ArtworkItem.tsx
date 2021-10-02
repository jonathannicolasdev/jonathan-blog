import { ArtworkContent } from '../lib/artworks'
import Date from './Date'
import Link from 'next/link'
import { parseISO } from 'date-fns'

type Props = {
  artwork: ArtworkContent
}

export default function ArtworkItem({ artwork }: Props) {
  return (
    <Link href={'/artworks/' + artwork.slug}>
      <a>
        <Date date={parseISO(artwork.date)} />
        <h2>{artwork.title}</h2>
        <style jsx>
          {`
            a {
              color: #222;
              display: inline-block;
            }
            h2 {
              margin: 0;
              font-weight: 500;
            }
          `}
        </style>
      </a>
    </Link>
  )
}
