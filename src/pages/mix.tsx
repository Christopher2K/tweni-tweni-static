import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'

import { SEO } from 'components/SEO'
import { PageDescription } from 'components/PageDescription'
import { PageRoot } from 'components/PageRoot'
import { ThumbnailGrid } from 'components/ThumbnailGrid'
import { ThumbnailGridItem } from 'components/ThumbnailGridItem'

interface MixPageProps extends PageProps {
  data: {
    prismicMixPage: {
      data: {
        text: {
          text: string
        }
      }
    }
    allPrismicMix: {
      nodes: Array<{
        id: string
        data: {
          title: { text: string }
          author: string
          url: { url: string }
          thumbnail_photo: { url: string }
        }
      }>
    }
  }
}

const MixPage: FC<MixPageProps> = ({ data }) => {
  return (
    <PageRoot>
      <SEO
        title="Tweni Tweni - Nos mix"
        description="Chaque jeudi, on vous dévoile les playlists concoctées par nos DJ préférés. Hip-hop, Rap, R&b, Soul, Dancehall… Il y en a pour tous les goûts!"
      />
      <PageDescription>{data.prismicMixPage.data.text.text}</PageDescription>
      <ThumbnailGrid>
        {data.allPrismicMix.nodes.map(m => (
          <ThumbnailGridItem
            url={m.data.url.url}
            key={m.id}
            title={m.data.title.text}
            image={m.data.thumbnail_photo.url}
            imageAlt={m.data.title.text}
            author={m.data.author}
          />
        ))}
      </ThumbnailGrid>
    </PageRoot>
  )
}

export const pageQuery = graphql`
  query MixPageQuery {
    prismicMixPage {
      data {
        text {
          text
        }
      }
    }
    allPrismicMix(sort: { fields: [first_publication_date], order: DESC }) {
      nodes {
        id
        data {
          title {
            text
          }
          url {
            url
          }
          thumbnail_photo {
            url
          }
          author
        }
      }
    }
  }
`

export default MixPage
