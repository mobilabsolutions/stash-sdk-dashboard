import { testRender, deepRender } from '../../../test_utils'
import TabPanel from './index'
import { useState } from 'react'
import { fireEvent } from 'react-testing-library'

const Container = () => {
  const [active, setActive] = useState(0)
  const tabs = [
    {
      title: 'Tab 1',
      render: () => <div>Tab 1 Content</div>
    },
    {
      title: 'Tab 2',
      render: () => <div>Tab 2 Content</div>
    },
    {
      title: () => <span>Tab 3</span>,
      titleStyle: { borderTop: '1px solid red' },
      render: () => <div>Tab 3 content</div>
    }
  ]
  return <TabPanel active={active} setActive={setActive} tabs={tabs} />
}

it('Tab Should Render only active tab', () => testRender(Container, {}))

it('Tab Should change tab on click event', () => {
  const { getByTestId } = deepRender(Container, {})
  expect(getByTestId('tab-content').firstChild).toMatchSnapshot(
    'Active tab content should be "Tab 1"'
  )
  fireEvent(
    getByTestId('tab-2'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
  expect(getByTestId('tab-content').firstChild).toMatchSnapshot(
    'Active tab content should be now "Tab 3"'
  )
})
