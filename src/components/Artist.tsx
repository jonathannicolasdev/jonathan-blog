import { ArtistContent } from '../lib/artists'

type Props = {
  artist: ArtistContent
}
export default function Artist({ artist }: Props) {
  return (
    <>
      <span>{artist.name}</span>
      <style jsx>
        {`
          span {
            color: #9b9b9b;
          }
        `}
      </style>
    </>
  )
}
