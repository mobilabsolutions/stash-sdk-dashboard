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
jest.mock('../../../hooks/use_day_activity', () => {
  const todayAct = [
    { time: '0', amount: 45254 },
    { time: '1', amount: 123134 },
    { time: '2', amount: 2562 },
    { time: '3', amount: 5245 },
    { time: '4', amount: 637353 },
    { time: '5', amount: 8898456 },
    { time: '6', amount: 45345679 },
    { time: '7', amount: 343451 },
    { time: '8', amount: 1800 },
    { time: '9', amount: 8400 },
    { time: '10', amount: 19537 },
    { time: '11', amount: 0 },
    { time: '12', amount: 0 },
    { time: '13', amount: 0 },
    { time: '14', amount: 0 },
    { time: '15', amount: 0 },
    { time: '16', amount: 0 },
    { time: '17', amount: 0 },
    { time: '18', amount: 0 },
    { time: '19', amount: 0 },
    { time: '20', amount: 0 },
    { time: '21', amount: 0 },
    { time: '22', amount: 0 },
    { time: '23', amount: 0 }
  ]
  const yesterday = [
    { time: '0', amount: 4523452 },
    { time: '1', amount: 45353 },
    { time: '2', amount: 452542 },
    { time: '3', amount: 31241 },
    { time: '4', amount: 12141 },
    { time: '5', amount: 45352 },
    { time: '6', amount: 2455656 },
    { time: '7', amount: 23452 },
    { time: '8', amount: 543254 },
    { time: '9', amount: 18919 },
    { time: '10', amount: 40149 },
    { time: '11', amount: 53374 },
    { time: '12', amount: 4800 },
    { time: '13', amount: 16322 },
    { time: '14', amount: 9744 },
    { time: '15', amount: 7754 },
    { time: '16', amount: 34522 },
    { time: '17', amount: 23562456 },
    { time: '18', amount: 5414 },
    { time: '19', amount: 3513432 },
    { time: '20', amount: 0 },
    { time: '21', amount: 0 },
    { time: '22', amount: 0 },
    { time: '23', amount: 0 }
  ]
  return (date: { day: () => number }) => {
    if (date.day() === 15) {
      return {
        activities: todayAct,
        loading: false,
        error: null
      }
    }
    return {
      activities: yesterday,
      loading: false,
      error: null
    }
  }
})
import { KPMixer, TAMixer } from './mixers'
import KeyPerformance from '../key_performance'
import { deepRender } from '../../../test_utils'

jest.mock('moment', () => {
  //Mock moment to alway get the same date, should be improved
  function mm() {
    const date = {
      hour: 10,
      day: 15
    }
    return {
      chageTime: () => {},
      hour: () => date.hour,
      day: () => date.day
    }
  }
  mm.defineLocale = jest.fn()
  mm.locale = jest.fn()
  return mm
})

const withMix = (Mixer, Cmp) => ({ liveData, ...rest }) => (
  <Mixer liveData={liveData} {...rest}>
    {(props: any) => <Cmp {...props} />}
  </Mixer>
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

  // Renders the data for the graph, not testing the actual graph for now
  const TestGraph = (props: {
    data: { time: number; today: number; selectedDay: number }[]
  }) => {
    return (
      <div>
        {props.data.map(dat => (
          <div data-testid={dat.time} key={dat.time}>
            <span data-testid={`today-${dat.time}`}>{dat.today}</span>
            <span data-testid={`selected-${dat.time}`}>{dat.selectedDay}</span>
          </div>
        ))}
      </div>
    )
  }

  test('should work for "Todays Activity"', () => {
    const Mixed = withMix(TAMixer, TestGraph)
    const { container, getByTestId } = deepRender(Mixed, {
      liveData: {
        time: '10:30:26',
        amount: 2345
      },
      selectedDay: {
        day: () => 14
      }
    })
    expect(container.firstChild).toMatchSnapshot('render al series')
    expect(getByTestId('today-10').textContent).toEqual('218.82') // Last serie for todays data should sum the live data recieved
  })

  test('should work for "Todays Activity", should add a new serie whit the live data recieved', () => {
    const Mixed = withMix(TAMixer, TestGraph)
    const { getByTestId } = deepRender(Mixed, {
      liveData: {
        time: '11:30:26',
        amount: 2345
      },
      selectedDay: {
        day: () => 14
      }
    })

    expect(getByTestId('today-10').textContent).toEqual('195.37')
    expect(getByTestId('today-11').textContent).toEqual('23.45')
  })

  //... Will continue
})
