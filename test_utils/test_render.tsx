import renderer from 'react-test-renderer'
import withTestSetup from './with_test_setup'

export default function testRender(Component, props = {}, context = undefined) {
  const Test = withTestSetup(Component, context)
  const component = renderer.create(<Test {...props} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
}
