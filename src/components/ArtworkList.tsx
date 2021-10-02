import React from 'react'

import { ArtworkContent } from '../lib/artworks'
import { TagContent } from '../lib/tags'

import ArtworkItem from './ArtworkItem'
import TagLink from './TagLink'
import Pagination from './Pagination'

type Props = {
  artworks: ArtworkContent[]
  tags: TagContent[]
  pagination: {
    current: number
    pages: number
  }
}

export default function ArtworkList({ artworks, tags, pagination }: Props) {
  return (
    <div className={'container'}>
      <div className={'artworks'}>
        <ul className={'artwork-list'}>
          {artworks.map((it, i) => (
            <li key={i}>
              <ArtworkItem artwork={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) =>
              page === 1 ? '/artworks' : '/artworks/page/[page]',
            as: (page) => (page === 1 ? null : '/artworks/page/' + page),
          }}
        />
      </div>
      <ul className={'categories'}>
        {tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: 1200px;
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .artworks {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .artworks li {
          margin-bottom: 1.5rem;
        }
        .artwork-list {
          flex: 1 0 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
          }
        }
      `}</style>
    </div>
  )
}
