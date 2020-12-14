import React, { FC, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useSwipeable } from 'react-swipeable'

import DevelopIcon from 'assets/images/svgs/develop.svg'
import DesktopHideIcon from 'assets/images/svgs/collapse.svg'
import HideIcon from 'assets/images/svgs/hide.svg'
import { desktopStyle, mobileMediaQuery } from 'styles/responsive'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useWindowSize } from 'hooks/useWindowSize'
import { Carousel } from 'components/Carousel'

interface StyleProps {
  isActiveDay?: boolean
  isInActiveRow: boolean
  frameSize: number
}

const Root = styled.div<StyleProps>`
  --border-def: 1px solid ${props => props.theme.colors.black};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  box-sizing: border-box;
  width: 100%;
  border-bottom: var(--border-def);

  transition: 200ms width linear, 200ms height linear;

  ${props => desktopStyle`
    flex-direction: row;
    width: 25%;
    height: 26rem;

    border-right: var(--border-def);
    &:nth-of-type(4n+1) {
      border-left: var(--border-def);
    }

    ${
      props.isInActiveRow &&
      css`
        height: 75rem;
      `
    }

    ${
      props.isInActiveRow &&
      !props.isActiveDay &&
      css`
        width: 5rem;
      `
    }

    ${
      props.isActiveDay &&
      css`
        width: calc(100% - (5rem * 3));
      `
    }
  `}
`

const Informations = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  max-width: ${props => props.frameSize}px;

  ${props => desktopStyle`
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;

    ${
      props.isInActiveRow &&
      !props.isActiveDay &&
      css`
        width: 5rem;
      `
    }
  `}
`

const FixedSizeContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  box-sizing: border-box;
  padding: 2rem ${props => props.theme.nav.padding.sides.mobile} 5rem;

  ${props => desktopStyle`
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    padding: 2.8rem 2.8rem 2rem 2.8rem;
    width: 100%;
    height: 26rem;

    ${
      props.isInActiveRow &&
      !props.isActiveDay &&
      css`
        width: 100%;
        padding: 2.5rem 0 0 1rem;
      `
    }
  `}
`

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 2.5rem;
`

const Day = styled.span<StyleProps>`
  font-size: 5rem;
  line-height: 50px;
  letter-spacing: -1.5px;
  transition: 200ms font-size linear;

  ${props => desktopStyle`
    ${
      !props.isActiveDay &&
      props.isInActiveRow &&
      css`
        font-size: 2.5rem;
      `
    }
  `}
`

const Bottom = styled.div<StyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  padding-bottom: 1.5rem;

  ${props => desktopStyle`
    padding-bottom: 0;
    ${
      !props.isActiveDay &&
      props.isInActiveRow &&
      css`
        display: none;
      `
    }
  `}
`

const Metadata = styled.div`
  width: 60%;
  flex-shrink: 0;

  ${desktopStyle`width: 100%;`}

  h1 {
    width: 100%;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 20.8px;
    margin-bottom: 0.4rem;

    ${desktopStyle`
      line-height: 20.8px;
      margin-bottom: 2rem;
    `}
  }

  p {
    text-transform: uppercase;
    font-size: 1.2rem;
    line-height: 20.8px;

    ${desktopStyle`
      line-height: 16.5px;
    `}
  }
`

const Develop = styled(DevelopIcon)`
  ${desktopStyle`display: none;`}
`

const Hide = styled(HideIcon)`
  ${desktopStyle`display: none;`}
`

const DesktopHide = styled(DesktopHideIcon)`
  display: none;

  ${desktopStyle`
    display: block;
    position: absolute;
    top: 3rem;
    right: 2rem;
  `}
`

const Description = styled.p<StyleProps>`
  font-family: ${props => props.theme.fonts.rubik};
  font-size: 1.8rem;
  line-height: 25.2px;
  box-sizing: border-box;

  ${props => desktopStyle`
    padding: 0 2.8rem 0 2.8rem;
    font-size: 1.4rem;
    line-height: 20.2px;
    width: ${props.frameSize}px;
  `}
`

const CarouselContainer = styled.div`
  flex: 1;
  flex-shrink: 1;

  width: 100%;
  height: 100%;
`

const CarouselDotContainer = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 3rem;
`

interface DayFrameProps {
  inspiration: Model.Inspiration
  dayNumber: number
  activeDay: number
  onDayClicked: (dayNumber: number) => void
}

export const DayFrame: FC<DayFrameProps> = ({
  dayNumber,
  inspiration,
  activeDay,
  onDayClicked,
}) => {
  // Hooks
  const { match: mobileScreen } = useMediaQuery(`(${mobileMediaQuery})`)
  const { width } = useWindowSize()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const handlers = useSwipeable({
    onSwipedLeft: () => showNextImage(),
    onSwipedRight: () => showPreviousImage(),
  })

  // Computed
  const frameSize = mobileScreen ? width : Math.min(1920, width) / 4
  const aDayIsActive = activeDay !== -1
  const dayNumberText =
    dayNumber.toString().length === 1
      ? `0${dayNumber.toString()}`
      : dayNumber.toString()

  const isActiveDay = dayNumber === activeDay
  const isLastColumn = dayNumber % 4 === 0
  const isInActiveRow = (() => {
    if (!aDayIsActive) return false
    const activeDayIsLastColumn = activeDay % 4 === 0
    if (isLastColumn) {
      return (
        dayNumber / 4 - 1 ===
        (activeDayIsLastColumn ? activeDay / 4 - 1 : Math.trunc(activeDay / 4))
      )
    } else {
      return (
        Math.trunc(dayNumber / 4) ===
        (activeDayIsLastColumn ? activeDay / 4 - 1 : Math.trunc(activeDay / 4))
      )
    }
  })()

  const styleProps: StyleProps = {
    isInActiveRow,
    isActiveDay,
    frameSize,
  }

  // Callback
  const onDayClick = useCallback(
    function onDayClick() {
      if (inspiration.enabled) {
        onDayClicked(dayNumber)
      }
    },
    [onDayClicked, dayNumber],
  )

  const onCloseClick = useCallback(
    function onCloseClick() {
      onDayClicked(-1)
    },
    [onDayClicked],
  )

  const showNextImage = useCallback(function showNextImage() {
    setActiveImageIndex(currentImageIndex => {
      if (currentImageIndex === inspiration.carousel.length - 1) {
        return currentImageIndex
      } else {
        return currentImageIndex + 1
      }
    })
  }, [])

  const showPreviousImage = useCallback(function showPreviousImage() {
    setActiveImageIndex(currentImageIndex => {
      if (currentImageIndex === 0) {
        return currentImageIndex
      } else {
        return currentImageIndex - 1
      }
    })
  }, [])

  return (
    <Root
      onClick={mobileScreen || isActiveDay ? undefined : onDayClick}
      {...styleProps}
    >
      {isActiveDay && <DesktopHide onClick={onCloseClick} />}
      <Informations {...styleProps}>
        <FixedSizeContainer {...styleProps}>
          <Top>
            <Day {...styleProps}>{dayNumberText}</Day>
            {mobileScreen && inspiration.enabled && (
              <Carousel.Dots
                activeImageIndex={activeImageIndex}
                carouselLength={inspiration.carousel.length}
              />
            )}
          </Top>
          {mobileScreen && inspiration.enabled && (
            <Carousel.Container
              onNextClicked={showNextImage}
              onPrevClicked={showPreviousImage}
              activeImageIndex={activeImageIndex}
              images={inspiration.carousel}
              swipeHandlers={handlers}
            />
          )}
          <Bottom {...styleProps}>
            {inspiration.enabled && (
              <Metadata>
                <h1>{inspiration.title}</h1>
                <p>{inspiration.subject}</p>
                <p>{inspiration.categories.join(' | ')}</p>
              </Metadata>
            )}
            {isActiveDay ? (
              <Hide onClick={onCloseClick} />
            ) : (
              <>{inspiration.enabled && <Develop onClick={onDayClick} />}</>
            )}
          </Bottom>
          {isActiveDay && mobileScreen && (
            <Description
              {...styleProps}
              dangerouslySetInnerHTML={{ __html: inspiration.description }}
            />
          )}
        </FixedSizeContainer>
        {isActiveDay && !mobileScreen && (
          <Description
            {...styleProps}
            dangerouslySetInnerHTML={{ __html: inspiration.description }}
          />
        )}
      </Informations>
      {isActiveDay && !mobileScreen && (
        <CarouselContainer>
          <Carousel.Container
            onNextClicked={showNextImage}
            onPrevClicked={showPreviousImage}
            activeImageIndex={activeImageIndex}
            images={inspiration.carousel}
          />
          <CarouselDotContainer>
            <Carousel.Dots
              activeImageIndex={activeImageIndex}
              carouselLength={inspiration.carousel.length}
            />
          </CarouselDotContainer>
        </CarouselContainer>
      )}
    </Root>
  )
}
