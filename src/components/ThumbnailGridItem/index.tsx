import React, { FC } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { theme } from 'styles/theme'
import { desktopStyle } from 'styles/responsive'

const MetaInfo = styled.p`
  color: ${props => props.theme.colors.violet};
  font-size: 1rem;
  margin-bottom: 1rem;
`

const Title = styled.h1`
  text-transform: uppercase;
  color: ${props => props.theme.colors.black};
  font-size: 1.7rem;
  line-height: 27px;
  letter-spacing: 0.4px; /* Relatif à la taille de ma typo jugée à 20px sur les maquettes */
  font-weight: 400;
  width: 100%;

  ${desktopStyle`
    font-size: 2rem;
  `}
`

const AuthorName = styled.p`
  text-transform: uppercase;
  font-size: 1rem;
  line-height: 23.5px;
  color: ${props => props.theme.colors.black};
`

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 3px solid ${props => props.theme.colors.black};
  margin-bottom: 2rem;
`

const linkStyle = css`
  --hover-color: ${theme.colors.violet};

  &:hover {
    ${AuthorName}, ${Title} {
      color: var(--hover-color);
    }

    ${Thumbnail} {
      border-bottom: 3px solid var(--hover-color);
    }
  }
`

const RootLink = styled.a`
  ${linkStyle}
`

const StyledLink = styled.a`
  ${linkStyle}
`

interface ThumbnailGridItemProps {
  metaInfo?: string
  image: string
  imageAlt: string
  title: string
  author: string
  url: string
  appLink?: boolean
}

export const ThumbnailGridItem: FC<ThumbnailGridItemProps> = ({
  metaInfo,
  image,
  imageAlt,
  title,
  author,
  url,
  appLink,
}) => {
  const Root = appLink ? StyledLink : RootLink
  const linkProps = appLink ? { to: url } : { href: url, target: '_blank' }

  return (
    <Root {...linkProps}>
      {metaInfo && <MetaInfo>{metaInfo}</MetaInfo>}
      <Thumbnail src={image} alt={imageAlt} />
      <Title>{title}</Title>
      <AuthorName>{author}</AuthorName>
    </Root>
  )
}
