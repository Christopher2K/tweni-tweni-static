import React, { FC } from 'react'
import styled from '@emotion/styled'
import { graphql, PageProps } from 'gatsby'

import { PageRoot } from 'components/PageRoot'
import { desktopStyle } from 'styles/responsive'

const Root = styled(PageRoot)`
  box-sizing: border-box;
  padding: 4rem ${props => props.theme.nav.padding.sides.mobile} 0;

  ${props => desktopStyle`
    padding: 0 ${props.theme.nav.padding.sides.desktop} 0;
  `}
`

const Wrapper = styled.div`
  ${desktopStyle`
    width: 100%;
  `}
`

const Content = styled.div`
  width: 100%;

  ${desktopStyle`
    width: 50%;
    margin-left: 50%;
  `}

  p {
    font-family: ${props => props.theme.fonts.sneak};
    font-size: 1.9rem;
    line-height: 24.7px;
    margin-bottom: 5rem;
  }

  h2 {
    font-family: ${props => props.theme.fonts.helvetica};
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 16px;
    margin-bottom: 0;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
`

interface LegalNoticePageProps extends PageProps {
  data: {
    prismicLegalNotice: {
      data: {
        legal_notice: {
          html: string
        }
      }
    }
  }
}

const LegalNoticePage: FC<LegalNoticePageProps> = ({ data }) => {
  return (
    <Root>
      <Wrapper>
        <Content
          dangerouslySetInnerHTML={{
            __html: data.prismicLegalNotice.data.legal_notice.html,
          }}
        />
      </Wrapper>
    </Root>
  )
}

export const pageQuery = graphql`
  query LegalNoticePageQuery {
    prismicLegalNotice {
      data {
        legal_notice {
          html
        }
      }
    }
  }
`

export default LegalNoticePage
