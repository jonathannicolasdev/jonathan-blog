import { GetStaticProps, GetStaticPaths } from 'next'
import fs from 'fs'
import yaml from 'js-yaml'
import { parseISO } from 'date-fns'
import renderToString from 'next-mdx-remote/render-to-string'
import { MdxRemote } from 'next-mdx-remote/types'
import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'

import { fetchArtworkContent } from '../../lib/artworks'
import ArtworkLayout from '../../components/ArtworkLayout'

export type Props = {
  artist: string
  title: string
  description?: string
  dateString: string
  slug: string
  tags: string[]
  source: MdxRemote.Source
}

const components = {}

const slugToArtworkContent = ((artworkContents) => {
  let hash = {}
  artworkContents.forEach((it) => (hash[it.slug] = it))
  return hash
})(fetchArtworkContent())

export default function Artwork({
  artist,
  title,
  description = '',
  dateString,
  slug,
  tags,
  source,
}: Props) {
  const content = hydrate(source, { components })

  return (
    <ArtworkLayout
      artist={artist}
      title={title}
      description={description}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
    >
      {content}
    </ArtworkLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchArtworkContent().map((it) => '/artworks/' + it.slug)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.artwork as string
  const source = fs.readFileSync(slugToArtworkContent[slug].fullPath, 'utf8')
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  })
  const mdxSource = await renderToString(content, { components, scope: data })
  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: '',
      tags: data.tags,
      artist: data.artist,
      source: mdxSource,
    },
  }
}
