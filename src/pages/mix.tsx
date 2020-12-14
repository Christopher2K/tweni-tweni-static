import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'

import { PageDescription } from 'components/PageDescription'
import { PageRoot } from 'components/PageRoot'
import { ThumbnailGrid } from 'components/ThumbnailGrid'
import { ThumbnailGridItem } from 'components/ThumbnailGridItem'

interface MixProps extends PageProps {
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

const Mix: FC<MixProps> = ({ data }) => {
  return (
    <PageRoot>
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
    allPrismicMix {
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

export default Mix
