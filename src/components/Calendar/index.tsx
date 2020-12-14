import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { DayFrame } from './DayFrame'
import { desktopStyle } from 'styles/responsive'
import { css, Global } from '@emotion/react'

const Root = styled.div`
  --border-def: 1px solid ${props => props.theme.colors.black};
  width: 100%;
`

const CurrentMonth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  height: 7rem;
  border-top: var(--border-def);
  border-bottom: var(--border-def);

  ${desktopStyle`
    height: 15rem;
    border-left: var(--border-def);
    border-right: var(--border-def);
  `}

  p {
    padding: 0 ${props => props.theme.nav.padding.sides.mobile};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    font-size: 4rem;
    line-height: 40px;

    ${props => desktopStyle`
      font-size: 12rem;
    `}
  }
`

const CalendarFrame = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  ${desktopStyle`
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 20rem;
  `}
`

interface CalendarProps {
  inspirations: Model.Inspiration[]
}

export const Calendar: FC<CalendarProps> = ({ inspirations }) => {
  const [activeDay, setActiveDay] = useState<number>(-1)
  const activeInspiration: Model.Inspiration | undefined =
    inspirations[activeDay - 1]

  return (
    <Root>
      {activeInspiration && (
        <Global
          styles={css`
            :root {
              background-color: ${activeInspiration.color};
            }
          `}
        />
      )}
      <CurrentMonth>
        <p>
          <span>Décembre</span>
          <span>2020</span>
        </p>
      </CurrentMonth>
      <CalendarFrame>
        {inspirations.map((i, index) => (
          <DayFrame
            key={i.id}
            dayNumber={index + 1}
            inspiration={i}
            activeDay={activeDay}
            onDayClicked={setActiveDay}
          />
        ))}
      </CalendarFrame>
    </Root>
  )
}
