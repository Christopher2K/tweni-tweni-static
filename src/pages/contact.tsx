import React, { FC } from 'react'
import styled from 'styled-components'

import { SEO } from 'components/SEO'
import { desktopStyle } from 'styles/responsive'
import contactImage from 'assets/images/others/contact.png'

const Root = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => props.theme.nav.padding.sides.mobile};
  width: calc(100% - (${props => props.theme.nav.padding.sides.mobile} * 2));
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props => desktopStyle`
    left: ${props.theme.nav.padding.sides.desktop};
    width: calc(100% - (${props.theme.nav.padding.sides.desktop} * 2));
  `}

  img {
    width: 100%;
    height: auto;
    max-width: 1000px;
    max-height: 100%;
    margin-bottom: 5rem;

    ${desktopStyle`
      margin-bottom: 10grem;
    `}
  }

  a {
    font-size: 1.4rem;
    text-transform: uppercase;
    line-height: 21px;

    ${desktopStyle`
      font-size: 1.9rem;
      line-height: 28.6px;
    `}
  }
`

const Contact: FC = () => (
  <Root>
    <SEO
      title="Tweni Tweni - Nous contacter"
      description="Contactez nous pour tout type de demandes !"
    />
    <img src={contactImage} alt="Hello!" />
    <a href="mailto:hello@twenitweni.fr">hello@twenitweni.fr</a>
    <a
      target="_blank"
      href="https://www.instagram.com/tweni.tweni/"
      rel="noreferrer"
    >
      instagram
    </a>
  </Root>
)

export default Contact
