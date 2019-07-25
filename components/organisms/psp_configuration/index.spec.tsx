import { testRender, deepRender } from '../../../test_utils'
import PspCreateForm from './psp_create_form'
import { fireEvent, queryByAttribute } from 'react-testing-library'
import { ToastProvider } from '../../../hooks/use_toast'
import { cleanup } from 'react-testing-library'

const ToastWrapper = Cmp => p => (
  <ToastProvider>
    <Cmp {...p} />
  </ToastProvider>
)

describe('PspCreateForm', () => {
  afterEach(cleanup)
  test('should render just the button first', () => {
    const FormWithToast = ToastWrapper(PspCreateForm)
    testRender(FormWithToast, {
      onCreatePsp: jest.fn(),
      pspsToCreate: [
        {
          label: 'BS PayOne',
          value: 'BS_PAYONE'
        },
        {
          label: 'Adyen',
          value: 'ADYEN'
        },
        {
          label: 'Braintree',
          value: 'BRAINTREE'
        }
      ]
    })
  })

  test('should render', () => {
    const onCreatePsp = jest.fn()
    const FormWithToast = ToastWrapper(PspCreateForm)
    const { getByText, baseElement } = deepRender(FormWithToast, {
      onCreatePsp,
      pspsToCreate: [
        {
          label: 'BS PayOne',
          value: 'BS_PAYONE'
        },
        {
          label: 'Adyen',
          value: 'ADYEN'
        },
        {
          label: 'Braintree',
          value: 'BRAINTREE'
        }
      ]
    })
    fireEvent.click(getByText('Add a new PSP configuration'))
    expect(baseElement.firstChild).toMatchSnapshot(
      'the "select" and "cancel" button after click "+"'
    )

    //Open select menu typing on input
    fireEvent.change(
      queryByAttribute('id', baseElement, 'react-select-2-input'),
      {
        target: { value: 'a' }
      }
    )

    //Click first option
    fireEvent.click(
      queryByAttribute('id', baseElement, 'react-select-2-option-0')
    )

    expect(baseElement.firstChild).toMatchSnapshot(
      'the form for the creation of the selected PSP'
    )
  })
})
