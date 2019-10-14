import React, { useEffect } from 'react'
import styled from '../../styled'
import { ReactElementLike } from 'prop-types'
import { ScrollMargin } from '../../atoms'

interface Menu {
  title: string | ((active: boolean) => ReactElementLike)
  titleStyle?: any
  render: Function
}

interface Props {
  menu: Array<Menu>
  active: number
  setActive: (tab: number) => void
  onTabChanged?: (tab: number) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  .menu-area {
    display: block;
    background-color: #172473;
    min-width: 270px;
    .menu-item {
      margin: 32px;
      cursor: pointer;
    }
  }
`

export default function MenuLayout(p: Props) {
  const { menu = [], active = 0, setActive, onTabChanged } = p

  useEffect(() => {
    typeof onTabChanged == 'function' && onTabChanged(active)
  }, [active])
  return (
    <Wrapper>
      <div className="menu-area">
        {menu.map(({ title }, i) => (
          <div
            className="menu-item"
            key={`menu-${i}`}
            onClick={() => setActive(i)}
            data-testid={`menu-${i}`}
          >
            {typeof title == 'function' ? title(i === active) : title}
          </div>
        ))}
      </div>
      <ScrollMargin maxWidth="902px">
        {menu.find((_t, i) => i === active).render()}
      </ScrollMargin>
    </Wrapper>
  )
}
