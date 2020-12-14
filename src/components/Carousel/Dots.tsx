import React, { FC } from 'react'
import styled from '@emotion/styled'

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`

const Dot = styled.div<{ active: boolean }>`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 0.7rem;
  background-color: ${props =>
    props.active ? props.theme.colors.black : props.theme.colors.lightGrey};
  margin-right: 0.5rem;

  &:last-of-type {
    margin-right: 0;
  }
`

interface DotsProps {
  carouselLength: number
  activeImageIndex: number
}

export const Dots: FC<DotsProps> = ({ carouselLength, activeImageIndex }) => (
  <Root>
    {Array(carouselLength)
      .fill(undefined)
      .map((_, index) => (
        <Dot key={index} active={activeImageIndex === index} />
      ))}
  </Root>
)
