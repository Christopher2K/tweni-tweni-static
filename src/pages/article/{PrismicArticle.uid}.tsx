import React, { FC, useCallback } from 'react'
import { graphql, PageProps } from 'gatsby'
import { format, parse } from 'date-fns'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { SEO } from 'components/SEO'
import { desktopStyle } from 'styles/responsive'
import linkedInIcon from 'assets/images/others/linkedin.png'
import mailIcon from 'assets/images/others/mail.png'
import twitterIcon from 'assets/images/others/twitter.png'

const littleSectionStyle = css`
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 15px;
  text-transform: uppercase;
  margin-bottom: 5rem;

  ${desktopStyle`
    padding: 0 8.3%;
    font-size: 1.1rem;
    line-height: 17px;
  `}
`

const Root = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${props => props.theme.nav.padding.sides.mobile};

  ${props => desktopStyle`
    padding: 0;
  `}
`

const CoverPhoto = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  margin-bottom: 2rem;

  ${props => desktopStyle`
    padding: 0 ${props.theme.nav.padding.sides.desktop};
  `}
`

const Title = styled.h1`
  box-sizing: border-box;
  font-size: 2.5rem;
  line-height: 33px;
  text-transform: uppercase;
  margin-bottom: 2rem;
  font-weight: 400;

  ${desktopStyle`
    padding: 0 8.3%;
    font-size: 5rem;
    line-height: 61px;
  `}
`

const Metadata = styled.p`
  ${littleSectionStyle};
`

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-family: ${props => props.theme.fonts.rubik};
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.6rem;
    line-height: 25.6px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.6rem;
    line-height: 25.6px;
    font-weight: 400;
    margin-bottom: 7rem;
  }

  p.block-img {
    width: 100%;
    margin-bottom: 0;

    img {
      width: 100%;
      height: auto;
    }
  }

  a {
    text-decoration: underline;
  }

  p.block-img + p {
    font-size: 1.1rem;
    line-height: 11.25px;
  }

  ${desktopStyle`
    padding: 0 8.3%;

    h2, p {
      margin-left: 50%;
      width: 50%;
    }

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.9rem;
      line-height: 30px;
    }

    p.block-img {
      margin: 0;
    }

    p.image-left,
    p.image-right {
      margin-left: 0;
      width: 50%;
      height: auto;
    }

    p.image-right {
      margin-left: 50%;
    }

    p.image-left + p,
    p.block-img + p {
      margin-left: 0;
    }

    p.image-right + p {
      margin-left: 50%;
    }
  `}
`

const Footer = styled.div`
  width: 100%;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.black};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  ${props => desktopStyle`
    width: calc(50% - ${props.theme.nav.padding.sides.desktop});
    margin-left: 50%;
    margin-bottom: 18rem;
  `};
`

const FooterHeading = styled.p`
  ${littleSectionStyle}
  margin-bottom: 1rem;
  padding: 0;
  ${desktopStyle`padding: 0;`}
`

const SocialContainer = styled.div`
  width: 50%;
`

const Credits = styled.div`
  width: 50%;
`

const Socials = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 0.5rem;

  a {
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
  }
`

interface ArticlePageProps extends PageProps {
  data: {
    prismicArticle: {
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
        cover_photo: { url: string }
        content: { html: string }
      }
    }
  }
}

const ArticlePage: FC<ArticlePageProps> = ({ data, location }) => {
  const { prismicArticle: article } = data

  const clearSharingUrl = `https://twenitweni.fr/article/${article.uid}`
  const sharingUrl = encodeURI(clearSharingUrl)
  const clearSharingText = article
    ? `${article.data.title.text} par ${article.data.author}`
    : 'Article sur Tweni Tweni'
  const sharingText = encodeURI(clearSharingText)

  const shareToTwitter = useCallback(function shareToTwitter(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault()
    const elm = event.currentTarget as HTMLAnchorElement
    window.open(
      elm.href,
      'Partager depuis Tweni Tweni',
      'left=20,top=20,width=600,height=300,toolbar=0,resizable=1',
    )
    return false
  },
  [])

  const shareToLinkedIn = useCallback(function shareToTwitter(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    event.preventDefault()
    const elm = event.currentTarget as HTMLAnchorElement
    window.open(
      elm.href,
      'Partager depuis Tweni Tweni',
      'left=20,top=20,width=600,height=700,toolbar=0,resizable=1',
    )
    return false
  },
  [])

  return (
    <Root>
      <SEO
        title={`Tweni Tweni - ${article.data.title.text}`}
        description={clearSharingText}
        image={article.data.cover_photo.url}
        pathname={location.pathname}
      />
      <CoverPhoto
        src={article.data.cover_photo.url}
        alt={article.data.title.text}
      />
      <Title>{article.data.title.text}</Title>
      <Metadata>
        {article.data.author} |{' '}
        {article.data.categories.map(c => c.category).join(' | ')} |{' '}
        {format(parse(article.data.date, 'yyyy-MM-dd', new Date()), 'dd.MM.yy')}
      </Metadata>
      <Content
        dangerouslySetInnerHTML={{ __html: article.data.content.html }}
      />
      <Footer>
        <Credits>
          <FooterHeading>{article.data.author}</FooterHeading>
        </Credits>
        <SocialContainer>
          <FooterHeading>partager</FooterHeading>
          <Socials>
            <a
              href={`https://twitter.com/intent/tweet?url=${sharingUrl}&text=${sharingText}`}
              onClick={shareToTwitter}
            >
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a
              href={`mailto:?body=${clearSharingUrl}&subject=${clearSharingText}`}
            >
              <img src={mailIcon} alt="Mail" />
            </a>
            <a
              href={`http://www.linkedin.com/shareArticle?url=${sharingUrl}&title=${sharingText}`}
              onClick={shareToLinkedIn}
            >
              <img src={linkedInIcon} alt="LinkedIn" />
            </a>
          </Socials>
        </SocialContainer>
      </Footer>
    </Root>
  )
}

export const pageQuery = graphql`
  query($uid: String) {
    prismicArticle(uid: { eq: $uid }) {
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
        cover_photo {
          url
        }
        content {
          html
        }
        thumbnail_photo {
          url
        }
        categories {
          category
        }
      }
    }
  }
`

export default ArticlePage
