import React, { FC } from 'react'
import { graphql, PageProps } from 'gatsby'
import { format, parse } from 'date-fns'

import { PageDescription } from 'components/PageDescription'
import { SEO } from 'components/SEO'
import { PageRoot } from 'components/PageRoot'
import { Calendar } from 'components/Calendar'

interface InspirationsPageProps extends PageProps {
  data: {
    prismicInspirationPage: {
      data: {
        text: {
          text: string
        }
      }
    }
    allPrismicInspiration: {
      nodes: Array<{
        id: string
        data: {
          enabled: boolean
          title: { text: string }
          artist: string
          color: string
          description: { html: string }
          date: string
          subject: string
          categories: Array<{
            category: string
          }>
          carousel: Array<{
            photo: {
              url: string
            }
            caption: string
          }>
        }
      }>
    }
  }
}

const InspirationsPage: FC<InspirationsPageProps> = ({ data }) => {
  const inspirations: Model.Inspiration[] = data.allPrismicInspiration.nodes.map(
    raw => {
      return {
        id: raw.id,
        enabled: raw.data.enabled,
        title: raw.data.title.text,
        artist: raw.data.artist,
        color: raw.data.color,
        description: raw.data.description.html,
        date: format(
          parse(raw.data.date, 'yyyy-MM-dd', new Date()),
          'dd.MM.yy',
        ),
        subject: raw.data.subject,
        categories: raw.data.categories.map(c => c.category),
        carousel: raw.data.carousel.map(item => ({
          url: item.photo.url,
          caption: item.caption,
        })),
      }
    },
  )

  return (
    <PageRoot>
      <SEO
        title="Tweni Tweni - Le calendrier des inspirations"
        description="On vous révèle notre calendrier de l’avent 2020 où vous pourrez découvrir les artistes et projets, coup cœur qui ont illuminé notre année."
      />
      <PageDescription>
        {data.prismicInspirationPage.data.text.text}
      </PageDescription>
      <Calendar inspirations={inspirations} />
    </PageRoot>
  )
}

export const pageQuery = graphql`
  query InspirationsPageQuery {
    prismicInspirationPage {
      data {
        text {
          text
        }
      }
    }

    allPrismicInspiration(sort: { fields: [data___date], order: ASC }) {
      nodes {
        id
        data {
          enabled
          title {
            text
          }
          artist
          color
          description {
            html
          }
          date
          subject
          categories {
            category
          }
          carousel {
            photo {
              url
            }
            caption
          }
        }
      }
    }
  }
`

export default InspirationsPage
