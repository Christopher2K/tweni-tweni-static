import React, { FC } from 'react'
import styled from 'styled-components'
import { graphql, PageProps } from 'gatsby'

import { PageRoot } from 'components/PageRoot'
import { desktopStyle } from 'styles/responsive'
import { SEO } from 'components/SEO'

const Root = styled(PageRoot)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  box-sizing: border-box;
  padding: 4rem ${props => props.theme.nav.padding.sides.mobile} 0;

  ${props => desktopStyle`
    flex-direction: row;
    padding: 0 ${props.theme.nav.padding.sides.desktop} 0;
  `}
`

const Left = styled.div`
  width: 100%;
  margin-bottom: 3rem;
  ${desktopStyle`
    width: 50%;
  `}

  p, a {
    font-family: ${props => props.theme.fonts.helvetica};
    font-size: 1rem;
    line-height: 14.5px;
    text-transform: uppercase;

    ${desktopStyle`
      line-height: 16.5px;
      font-size: 1.1rem;
    `}
  }
`

const Right = styled.div`
  width: 100%;
  ${desktopStyle`
    width: 50%;
    box-sizing: border-box;
    padding-right: 5%;
    flex-shrink: 1;
  `}
`

const Informations = styled.div`
  h2 {
    margin-top: 3rem;
    font-family: ${props => props.theme.fonts.helvetica};
    font-size: 1rem;
    line-height: 14.5px;
    text-transform: uppercase;
    font-weight: 400;

    ${desktopStyle`
      line-height: 16.5px;
      font-size: 1.1rem;
    `}
  }

  p {
    font-family: ${props => props.theme.fonts.sneak};
    font-size: 1.2rem;
    line-height: 16.5px;

    ${desktopStyle`
      line-height: 19.5px;
      font-size: 1.5rem;
    `}
  }
`

const MainText = styled.div`
  font-family: ${props => props.theme.fonts.sneak};
  font-size: 1.6rem;
  margin-bottom: 5rem;
  line-height: 20.8px;

  ${desktopStyle`
    line-height: 33.8px;
    font-size: 2.6rem;
  `}
`

interface GenesisPageProps extends PageProps {
  data: {
    prismicGenesis: {
      data: {
        contact: { html: string }
        main_text: { html: string }
        team: Array<{
          member: string
        }>
        credits: Array<{
          credit: string
        }>
      }
    }
  }
}

const GenesisPage: FC<GenesisPageProps> = ({ data: { prismicGenesis } }) => {
  return (
    <Root>
      <SEO
        title="Tweni Tweni - La genèse"
        description="Découvrez comment notre projet a commencé..."
      />
      <Left
        dangerouslySetInnerHTML={{ __html: prismicGenesis.data.contact.html }}
      />
      <Right>
        <MainText
          dangerouslySetInnerHTML={{
            __html: prismicGenesis.data.main_text.html,
          }}
        />
        <Informations>
          <h2>Notre équipe</h2>
          {prismicGenesis.data.team.map(({ member }) => (
            <p key={member}>{member}</p>
          ))}
          <h2>Credits</h2>
          {prismicGenesis.data.credits.map(({ credit }) => (
            <p key={credit}>{credit}</p>
          ))}
        </Informations>
      </Right>
    </Root>
  )
}

export const pageQuery = graphql`
  query GenesisPageQuery {
    prismicGenesis {
      data {
        contact {
          html
        }
        main_text {
          html
        }
        team {
          member
        }
        credits {
          credit
        }
      }
    }
  }
`

export default GenesisPage
