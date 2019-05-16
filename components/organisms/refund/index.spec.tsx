import { testRender } from '../../../test_utils'
// import { shallow, mount } from 'enzyme'
import RefundForm from './index'

it('RefundForm Should Render', () =>
  testRender(RefundForm, {
    initialRefund: 12345,
    currencyId: 'EUR'
  }))

it('RefundForm Should use loading status', () =>
  testRender(RefundForm, {
    initialRefund: 12345,
    isLoading: true,
    currencyId: 'EUR'
  }))
// it('RefundForm Should disable amount initially', () => {
//   const form = mount(<RefundForm initialRefund={12345} currencyId={'EUR'} />)
//   const RefundInput = form.find('[name="refund"]').get(0)
//   expect(RefundInput.props.disabled).toBe(true)
// })

// it('RefundForm Should disable amount only when full refund is picked', () => {
//   const form = mount(<RefundForm initialRefund={12345} currencyId={'EUR'} />)
//   const RefundInput = form.find('[name="refund"]').get(0)
//   expect(RefundInput.props.disabled).toBe(true)
// })
