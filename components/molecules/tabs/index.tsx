import React from 'react'
import styled from '../../styled'

interface Tab {
  title: string | Function
  titleStyle?: any
  render: Function
}

interface Props {
  tabs: Array<Tab>
  active: number
  setActive: Function
}

const Tab = styled.span<{ active: boolean }>`
  border-bottom: 4px solid
    ${p => (p.active ? p.theme.blue.A500 : p.theme.blue.A50)};
  margin-right: 16px;
  min-width: 100px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  padding: 3px;
`

const TabSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 18px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default function TabPanel(props: Props) {
  const { tabs = [], active, setActive } = props
  return (
    <Container>
      <TabSection>
        {tabs.map(({ title, titleStyle }, i) => (
          <Tab
            key={i}
            active={active === i}
            style={titleStyle}
            onClick={() => setActive(i)}
            data-testid={`tab-${i}`}
          >
            {typeof title == 'function' ? title() : title}
          </Tab>
        ))}
      </TabSection>
      <div data-testid="tab-content">
        {tabs.find((_t, i) => i === active).render()}
      </div>
    </Container>
  )
}
