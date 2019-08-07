jest.mock('../../../hooks/use_key_performance', () => () => {
  //mock hook to avoid fetch calls
  return {
    kp: {
      nrOfChargebacks: 10,
      nrOfRefundedTransactions: 32,
      nrOfTransactions: 43,
      salesVolume: 54,
      currencyId: 'EUR'
    },
    allowStream: true,
    loading: false,
    error: null
  }
})

import { KPMixer } from './mixers'
import KeyPerformance from '../key_performance'
import { deepRender } from '../../../test_utils'

const withMix = (Mixer, Cmp) => ({ liveData }) => (
  <Mixer liveData={liveData}>{(props: any) => <Cmp {...props} />}</Mixer>
)

describe('Mixer for "live" and "static" data', () => {
  test('should work for "KeyPerformance"', () => {
    const Mixed = withMix(KPMixer, KeyPerformance)
    const { getAllByTestId } = deepRender(Mixed, {
      liveData: {
        nrOfChargebacks: 12,
        nrOfRefundedTransactions: 0,
        nrOfTransactions: 2,
        salesVolume: 3,
        currencyId: 'EUR'
      }
    })

    expect(getAllByTestId('card-title')).toMatchSnapshot()
  })
  //... Will continue
})
