import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface SEOProps {
  title?: string
  description?: string
  meta?: Array<{
    name: string
    content: string
  }>
  article?: boolean
  pathname?: string
  image?: string
}

export const SEO: FC<SEOProps> = ({
  title,
  description,
  meta = [],
  article = false,
  pathname,
  image,
}) => {
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
        url: string
      }
    }
  }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            url
          }
        }
      }
    `,
  )

  const metaDescription = description ?? site.siteMetadata.description
  const pageTitle = title ?? site.siteMetadata.title
  const canonical = pathname ? `${site.siteMetadata.url}${pathname}` : null

  const metaImage = image ?? '/share.png'

  return (
    <Helmet
      htmlAttributes={{
        lang: 'fr',
      }}
      title={pageTitle}
      link={canonical ? [{ rel: 'canonical', href: canonical }] : []}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: article ? 'article' : 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'og:image',
          content: metaImage,
        },
      ].concat(meta)}
    />
  )
}
