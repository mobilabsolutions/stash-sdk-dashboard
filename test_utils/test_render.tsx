import renderer from 'react-test-renderer'
import withTestSetup from './with_test_setup'
import { ReactComponentLike } from 'prop-types'
import { render } from 'react-testing-library'

export function testBehaviour(
  Component: ReactComponentLike,
  props = {},
  context = undefined
) {
  const Test = withTestSetup(Component, context)
  return render(<Test {...props} />)
}

export default function testRender(
  Component: ReactComponentLike,
  props = {},
  context = undefined
) {
  const Test = withTestSetup(Component, context)
  const component = renderer.create(<Test {...props} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}
