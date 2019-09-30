import React, { useEffect } from 'react'
import styled from '../../styled'
import { ReactElementLike } from 'prop-types'

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
  .content-area {
    width: 100%;
    overflow: auto;
    height: 100%;
    overflow-y: scroll;
    max-width: 902px;
    margin: auto;
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
      <div className="content-area">
        {menu.find((_t, i) => i === active).render()}
      </div>
    </Wrapper>
  )
}
