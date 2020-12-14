/* eslint-disable @typescript-eslint/indent */
import React, { FC, useCallback, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { SwipeableHandlers } from 'react-swipeable'

import { desktopMediaQuery, desktopStyle } from 'styles/responsive'
import { useMediaQuery } from 'hooks/useMediaQuery'

type CursorIndicatorText = 'NEXT' | 'PREV'

const Carousel = styled.div`
  position: relative;
  overflow: hidden;

  width: 100%;
  margin-bottom: 1rem;

  ${desktopStyle`
    margin: auto;
    width: 80%;
    height: 100%;
  `}
`

const CarouselRow = styled.div<{ activeImageIndex: number }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  transition: 100ms transform linear;
  ${props => css`
    transform: translateX(
      calc(
        -${props.activeImageIndex} * (100% +
              ${props.theme.nav.padding.sides.mobile})
      )
    );
  `}

  ${desktopStyle`
    height: 100%;
  `}
`

const CurrentImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 0.5rem;

  ${desktopStyle`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    flex-shrink: 1;
  `}
`

const CarouselPhoto = styled.div`
  flex-shrink: 0;
  flex-basis: 100%;
  width: 100%;
  font-size: 0.75rem;
  margin-right: ${props => props.theme.nav.padding.sides.mobile};

  ${desktopStyle`
    box-sizing: border-box;
    padding: 3.6rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  `}
`

const Caption = styled.p`
  font-family: ${props => props.theme.fonts.sneak};
  font-size: 1.2rem;
  line-height: 14px;
  width: 80%;

  ${desktopStyle`
    width: auto;
    flex-shrink: 0;
    width: auto;
  `}
`

const CarouselButton = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  ${props => props.side}: 0;
  background-color: transparent;
  border: none;
  outline: none;
  height: 100%;
  width: 50%;
`

const CursorIndicator = styled.div`
  position: fixed;
  z-index: 1000;

  user-select: none;
  font-size: 1rem;
  color: ${props => props.theme.colors.black};
`

interface ContainerProps {
  images: Model.PhotoWithCaption[]
  activeImageIndex: number
  onNextClicked: () => void
  onPrevClicked: () => void
  swipeHandlers?: SwipeableHandlers
}

export const Container: FC<ContainerProps> = ({
  images,
  activeImageIndex,
  onNextClicked,
  onPrevClicked,
  swipeHandlers,
}) => {
  const cursorIndicatorRef = useRef<HTMLDivElement>(null)
  const { match: desktopScreen } = useMediaQuery(`(${desktopMediaQuery})`)
  const [cursorIndicatorText, setCursorIndicatorText] = useState<
    CursorIndicatorText
  >()
  const [coords, setCoords] = useState({ top: 0, left: 0 })

  const updateIndicatorPosition = useCallback(function updateIndicatorPosition(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    setCoords({
      top: event.nativeEvent.clientY,
      left: event.nativeEvent.clientX,
    })
  },
  [])

  return (
    <Carousel>
      <CarouselRow activeImageIndex={activeImageIndex} {...swipeHandlers}>
        <CarouselButton side="left" onClick={onPrevClicked} />
        {images.map((cp, index) => (
          <CarouselPhoto key={index}>
            <CurrentImage src={cp.url} alt={cp.caption} />
            <Caption>{cp.caption}</Caption>
          </CarouselPhoto>
        ))}
      </CarouselRow>
      {desktopScreen && (
        <>
          <CarouselButton
            side="left"
            onClick={onPrevClicked}
            onMouseOver={() => setCursorIndicatorText('PREV')}
            onMouseOut={() => setCursorIndicatorText(undefined)}
            onMouseMove={updateIndicatorPosition}
          />
          <CarouselButton
            side="right"
            onClick={onNextClicked}
            onMouseOver={() => setCursorIndicatorText('NEXT')}
            onMouseOut={() => setCursorIndicatorText(undefined)}
            onMouseMove={updateIndicatorPosition}
          />
          {cursorIndicatorText !== undefined && (
            <CursorIndicator
              ref={cursorIndicatorRef}
              style={{
                top: coords.top + 15,
                left: coords.left + 15,
              }}
            >
              {cursorIndicatorText}
            </CursorIndicator>
          )}
        </>
      )}
    </Carousel>
  )
}
