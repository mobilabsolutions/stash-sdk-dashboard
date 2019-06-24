import { testRender, deepRender } from '../../../test_utils'
// import { shallow, mount } from 'enzyme'
import PopUp from './popup'
import { useState } from 'react'
import { fireEvent, act } from 'react-testing-library'

jest.useFakeTimers()

it('PopUp Should Render refund form', () =>
  testRender(PopUp, {
    action: 'refund',
    show: true,
    onClose: () => {},
    currencyId: 'EUR',
    initialRefund: 300
  }))

it('PopUp Should Render capture form', () =>
  testRender(PopUp, {
    action: 'capture',
    show: true,
    onClose: () => {},
    currencyId: 'EUR',
    initialRefund: 300
  }))

it('PopUp Should Render reverse form', () =>
  testRender(PopUp, {
    action: 'reverse',
    show: true,
    onClose: () => {},
    currencyId: 'EUR',
    initialRefund: 300
  }))

it('PopUp Should Render loading state', () =>
  testRender(PopUp, {
    action: 'reverse',
    show: true,
    isLoading: true,
    onClose: () => {},
    currencyId: 'EUR',
    initialRefund: 300
  }))

const PopUpWrapper = ({ withError = false }) => {
  const [state, setState] = useState({ isLoading: false, hasError: false })
  const onAction = () => {
    setState({ isLoading: true, hasError: false })
    setTimeout(() => {
      act(() => {
        withError
          ? setState({ isLoading: false, hasError: true })
          : setState({ isLoading: false, hasError: false })
      })
    }, 1000)
  }
  return (
    <PopUp
      isLoading={state.isLoading}
      action="capture"
      show
      onAction={onAction}
      hasError={state.hasError}
      onClose={() => {}}
      currencyId="EUR"
      initialRefund={0}
    />
  )
}

it('PopUp Should react to loading changes', () => {
  const { container, getByTestId } = deepRender(PopUpWrapper, {})

  const Button = container.querySelector('[type="submit"]')
  fireEvent(
    Button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
  jest.runAllTimers()
  getByTestId('success-message')
})

it('PopUp Should not react to loading changes if errors', () => {
  const { container, getByTestId } = deepRender(PopUpWrapper, {
    withError: true
  })

  const Button = container.querySelector('[type="submit"]')
  fireEvent(
    Button,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
  jest.runAllTimers()
  getByTestId('error-container')
})
