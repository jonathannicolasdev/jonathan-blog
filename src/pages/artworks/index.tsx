import { GetStaticProps } from 'next'
import Head from 'next/head'

import Layout from '../../components/Layout'
import BasicMeta from '../../components/meta/BasicMeta'
import OpenGraphMeta from '../../components/meta/OpenGraphMeta'
import TwitterCardMeta from '../../components/meta/TwitterCardMeta'
import ArtworkList from '../../components/ArtworkList'
import config from '../../lib/config'

import {
  countArtworks,
  listArtworkContent,
  ArtworkContent,
} from '../../lib/artworks'
import { listTags, TagContent } from '../../lib/tags'

type Props = {
  artworks: ArtworkContent[]
  tags: TagContent[]
  pagination: {
    current: number
    pages: number
  }
}

export default function Index({ artworks, tags, pagination }: Props) {
  const url = '/artworks'
  const title = 'All artworks'
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <ArtworkList artworks={artworks} tags={tags} pagination={pagination} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const artworks = listArtworkContent(1, config.artworks_per_page)
  const tags = listTags()
  const pagination = {
    current: 1,
    pages: Math.ceil(countArtworks() / config.artworks_per_page),
  }
  return {
    props: {
      artworks,
      tags,
      pagination,
    },
  }
}
