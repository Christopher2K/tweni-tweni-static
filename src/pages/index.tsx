import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'
import { format, parse } from 'date-fns'

import { SEO } from 'components/SEO'
import { ThumbnailGrid } from 'components/ThumbnailGrid'
import { ThumbnailGridItem } from 'components/ThumbnailGridItem'

interface HomepageProps extends PageProps {
  data: {
    allPrismicArticle: {
      nodes: Array<{
        uid: string
        data: {
          author: string
          categories: Array<{
            category: string
          }>
          date: string
          subtitle: { text: string }
          title: { text: string }
          thumbnail_photo: { url: string }
        }
      }>
    }
  }
}

const Homepage: FC<HomepageProps> = ({ data }) => {
  return (
    <ThumbnailGrid>
      <SEO
        title="Tweni Tweni - Le Blog Culturel"
        description="Découvez les thématiques que nous abordons au travers de nos articles"
      />
      {data.allPrismicArticle.nodes.map(({ data: article, uid }) => {
        const categoryText = article.categories
          .map(({ category }) => category.toUpperCase())
          .join(' | ')

        return (
          <ThumbnailGridItem
            key={uid}
            appLink
            url={`/article/${uid}`}
            metaInfo={`${categoryText} | ${format(
              parse(article.date, 'yyyy-MM-dd', new Date()),
              'dd.MM.yy',
            )}`}
            image={article.thumbnail_photo.url}
            imageAlt={article.title.text}
            author={article.author}
            title={article.title.text}
          />
        )
      })}
    </ThumbnailGrid>
  )
}

export const pageQuery = graphql`
  query HomepageQuery {
    allPrismicArticle(sort: { fields: [data___date], order: DESC }) {
      nodes {
        uid
        data {
          title {
            text
          }
          subtitle {
            text
          }
          date
          author
          thumbnail_photo {
            url
          }
          categories {
            category
          }
        }
      }
    }
  }
`

export default Homepage
