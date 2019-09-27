import { testRender, deepRender } from '../../../test_utils'
import MenuLayout from './index'
import { useState } from 'react'

const TestMenu = () => {
  const [active, setActive] = useState(0)
  return (
    <MenuLayout
      active={active}
      setActive={setActive}
      menu={[
        {
          title: 'String Title',
          render: () => <span>Content 1</span>
        },
        {
          title: () => <h1>Function Title</h1>,
          render: () => <span>Content 2</span>
        },
        {
          title: () => <h1>Function Title 1</h1>,
          render: () => <span>Content 3</span>
        }
      ]}
    />
  )
}

describe('Menu layout', () => {
  test('should render', () => {
    testRender(TestMenu, {})
  })
  test('should change content', () => {
    const { getByTestId, baseElement } = deepRender(TestMenu, {})
    getByTestId('menu-2').click()
    expect(baseElement.firstChild).toMatchSnapshot()
  })
})
