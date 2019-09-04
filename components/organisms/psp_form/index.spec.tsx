import { testRender, deepRender } from '../../../test_utils'
import PspForm from '../psp_form'
import { useState } from 'react'
import { fireEvent, act } from 'react-testing-library'
import { cleanup } from 'react-testing-library'

const Container = ({ psp, onUpdatePsp, onCancel, onDeletePsp }) => {
  const [isUpdate, setIsUpdate] = useState(false)
  const _onUpdatePsp = (...p: any[]) => {
    // https://reactjs.org/docs/test-utils.html#act
    act(() => {
      setIsUpdate(true)
    })
    onUpdatePsp(...p)
  }
  return (
    <PspForm
      psp={psp}
      onUpdatePsp={_onUpdatePsp}
      isUpdate={isUpdate}
      onCancel={onCancel}
      onDeletePsp={onDeletePsp}
      updateError={false}
    />
  )
}

describe('PspForm', () => {
  afterEach(cleanup)

  test('should render ADYEN fields for sandbox', () => {
    testRender(PspForm, {
      psp: {
        type: 'ADYEN',
        country: 'DE',
        currency: 'EUR',
        default: true,
        locale: 'de-DE',
        clientEncryptionKey: 'secret-encripted-key',
        sandboxMerchantId: 'MobilabSolutionsGmbHCOM',
        sandboxPublicKey:
          'AQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4RBGIdDV2tF4XWptmUJF0ekWxGCOMqMyvGxdyIQwV1bDb7kfNy1WIxIIkxgBw==-/MmC/tMOJx8t2FsKezDHBYyB9e73SBUtYk0oSC+fT1o=-7LzJDCZLmZNg98BT',
        urlPrefix: 'random-mobilab'
      }
    })
  })
  test('should render ADYEN fields for production', () => {
    testRender(PspForm, {
      psp: {
        type: 'ADYEN',
        country: 'DE',
        currency: 'EUR',
        default: true,
        locale: 'de-DE',
        clientEncryptionKey: 'secret-encripted-key',
        merchantId: 'MobilabSolutionsGmbHCOM',
        publicKey:
          'AQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4RBGIdDV2tF4XWptmUJF0ekWxGCOMqMyvGxdyIQwV1bDb7kfNy1WIxIIkxgBw==-/MmC/tMOJx8t2FsKezDHBYyB9e73SBUtYk0oSC+fT1o=-7LzJDCZLmZNg98BT',
        urlPrefix: 'random-mobilab'
      }
    })
  })
  test('should render ADYEN fields for production and sandbox', () => {
    testRender(PspForm, {
      psp: {
        type: 'ADYEN',
        country: 'DE',
        currency: 'EUR',
        default: true,
        locale: 'de-DE',
        clientEncryptionKey: 'secret-encripted-key',
        merchantId: 'MobilabSolutionsGmbHCOM',
        sandboxMerchantId: 'MobilabSolutionsGmbHCOM',
        sandboxPublicKey:
          'AQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4RBGIdDV2tF4XWptmUJF0ekWxGCOMqMyvGxdyIQwV1bDb7kfNy1WIxIIkxgBw==-/MmC/tMOJx8t2FsKezDHBYyB9e73SBUtYk0oSC+fT1o=-7LzJDCZLmZNg98BT',
        publicKey:
          'AQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4RBGIdDV2tF4XWptmUJF0ekWxGCOMqMyvGxdyIQwV1bDb7kfNy1WIxIIkxgBw==-/MmC/tMOJx8t2FsKezDHBYyB9e73SBUtYk0oSC+fT1o=-7LzJDCZLmZNg98BT',
        urlPrefix: 'random-mobilab'
      }
    })
  })
  test('should render BRAINTREE fields for production', () => {
    testRender(PspForm, {
      psp: {
        type: 'BRAINTREE',
        default: false,
        merchantId: '3zg84f628y5td5jy',
        privateKey: '0ddaf018ea14dd2211c77d0f20a15d5b',
        publicKey: 'p4n28yk7fjqvdv6y'
      }
    })
  })
  test('should render BRAINTREE fields for sandbox', () => {
    testRender(PspForm, {
      psp: {
        type: 'BRAINTREE',
        default: false,
        sandboxMerchantId: '3zg84f628y5td5jy',
        sandboxPrivateKey: '0ddaf018ea14dd2211c77d0f20a15d5b',
        sandboxPublicKey: 'p4n28yk7fjqvdv6y'
      }
    })
  })
  test('should render BS_PAYONE fields', () => {
    testRender(PspForm, {
      psp: {
        type: 'BS_PAYONE',
        accountId: '42949',
        default: false,
        key: '41P13T71t40B8F8f',
        merchantId: '42865',
        portalId: '2030968'
      }
    })
  })

  test('should render Cancel button if necessary', () => {
    const { getByText } = deepRender(Container, {
      psp: {
        type: 'BS_PAYONE',
        accountId: '42949',
        default: false,
        key: '41P13T71t40B8F8f',
        merchantId: '42865',
        portalId: '2030968'
      },
      onCancel: () => {}
    })
    getByText(/Cancel/i)
  })

  test('should render Delete button if necessary', () => {
    const { getByText } = deepRender(Container, {
      psp: {
        type: 'BS_PAYONE',
        accountId: '42949',
        default: false,
        key: '41P13T71t40B8F8f',
        merchantId: '42865',
        portalId: '2030968'
      },
      onDeletePsp: jest.fn()
    })
    getByText(/Delete/i)
  })

  test('should submit BS_PAYONE parameters', done => {
    const onUpdatePsp = jest.fn((...p) => {
      // This approach was needed because of Formik (https://github.com/jaredpalmer/formik/issues/1673)
      // "expect(onUpdatePsp).toBeCalled()" wont work.
      expect(p).toMatchSnapshot()
      done()
    })
    const { getByPlaceholderText, getByText } = deepRender(Container, {
      psp: {
        type: 'BS_PAYONE',
        accountId: '',
        key: '',
        merchantId: '',
        portalId: ''
      },
      onUpdatePsp,
      onCancel: () => {}
    })
    fireEvent.change(getByPlaceholderText('Merchant ID'), {
      target: { value: '42865' }
    })
    fireEvent.change(getByPlaceholderText('Portal ID'), {
      target: { value: '2030968' }
    })
    fireEvent.change(getByPlaceholderText('Account ID'), {
      target: { value: '42949' }
    })
    fireEvent.change(getByPlaceholderText('Key'), {
      target: { value: '41P13T71t40B8F8f' }
    })
    const Button = getByText('Save').parentElement
    fireEvent.click(Button)
  })

  test('should submit ADYEN production parameters', done => {
    const onUpdatePsp = jest.fn((...p) => {
      // This approach was needed because of Formik (https://github.com/jaredpalmer/formik/issues/1673)
      // "expect(onUpdatePsp).toBeCalled()" wont work
      expect(p).toMatchSnapshot()
      done()
    })
    const { getByPlaceholderText, getByText } = deepRender(Container, {
      psp: {
        type: 'ADYEN',
        country: '',
        currency: '',
        locale: '',
        sandboxMerchantId: '',
        merchantId: '',
        sandboxPublicKey: '',
        publicKey: '',
        urlPrefix: '',
        clientEncryptionKey: ''
      },
      onUpdatePsp,
      onCancel: () => {}
    })
    fireEvent.change(getByPlaceholderText('Merchant ID'), {
      target: { value: 'MobilabSolutionsGmbHCOM' }
    })
    fireEvent.change(getByPlaceholderText('Public Key'), {
      target: { value: 'AQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4R' }
    })
    fireEvent.change(getByPlaceholderText('Production URL Prefix'), {
      target: { value: 'random-mobilab' }
    })
    fireEvent.change(getByPlaceholderText('Client Encryption Key'), {
      target: { value: 'encription-key' }
    })
    fireEvent.change(getByPlaceholderText('Country'), {
      target: { value: 'DE' }
    })
    fireEvent.change(getByPlaceholderText('Locale'), {
      target: { value: 'de-DE' }
    })
    fireEvent.change(getByPlaceholderText('Currency'), {
      target: { value: 'EUR' }
    })
    const Button = getByText('Save').parentElement
    fireEvent.click(Button)
  })

  test('should submit ADYEN sandbox parameters', done => {
    const onUpdatePsp = jest.fn((...p) => {
      // This approach was needed because of Formik (https://github.com/jaredpalmer/formik/issues/1673)
      // "expect(onUpdatePsp).toBeCalled()" wont work
      expect(p).toMatchSnapshot()
      done()
    })
    const { getByPlaceholderText, getByText, getByTestId } = deepRender(
      Container,
      {
        psp: {
          type: 'ADYEN',
          country: '',
          currency: '',
          locale: '',
          sandboxMerchantId: '',
          merchantId: '',
          sandboxPublicKey: '',
          publicKey: '',
          urlPrefix: ''
        },
        onUpdatePsp,
        onCancel: () => {}
      }
    )

    // Change tab
    fireEvent.click(getByTestId('tab-1'))

    fireEvent.change(getByPlaceholderText('Country'), {
      target: { value: 'DE' }
    })
    fireEvent.change(getByPlaceholderText('Locale'), {
      target: { value: 'de-DE' }
    })
    fireEvent.change(getByPlaceholderText('Currency'), {
      target: { value: 'EUR' }
    })
    fireEvent.change(getByPlaceholderText('Sandbox Merchant ID'), {
      target: { value: 'SBMobilabSolutionsGmbHCOM' }
    })
    fireEvent.change(getByPlaceholderText('Sandbox Public Key'), {
      target: { value: 'SBAQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4R' }
    })
    const Button = getByText('Save').parentElement
    fireEvent.click(Button)
  })

  test('should submit BRAINTREE production parameters', done => {
    const onUpdatePsp = jest.fn((...p) => {
      // This approach was needed because of Formik (https://github.com/jaredpalmer/formik/issues/1673)
      // "expect(onUpdatePsp).toBeCalled()" wont work
      expect(p).toMatchSnapshot()
      done()
    })
    const { getByPlaceholderText, getByText } = deepRender(Container, {
      psp: {
        type: 'BRAINTREE',
        merchantId: '',
        publicKey: '',
        privateKey: '',
        sandboxMerchantId: '',
        sandboxPublicKey: '',
        sandboxPrivateKey: ''
      },
      onUpdatePsp,
      onCancel: () => {}
    })
    fireEvent.change(getByPlaceholderText('Merchant ID'), {
      target: { value: 'MobilabSolutionsGmbHCOM' }
    })
    fireEvent.change(getByPlaceholderText('Private Key'), {
      target: { value: 'privateAQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4R' }
    })
    fireEvent.change(getByPlaceholderText('Public Key'), {
      target: { value: 'publicAQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4R' }
    })
    const Button = getByText('Save').parentElement
    fireEvent.click(Button)
  })

  test('should submit BRAINTREE sandbox parameters', done => {
    const onUpdatePsp = jest.fn((...p) => {
      // This approach was needed because of Formik (https://github.com/jaredpalmer/formik/issues/1673)
      // "expect(onUpdatePsp).toBeCalled()" wont work
      expect(p).toMatchSnapshot()
      done()
    })
    const { getByPlaceholderText, getByText, getByTestId } = deepRender(
      Container,
      {
        psp: {
          type: 'BRAINTREE',
          merchantId: '',
          publicKey: '',
          privateKey: '',
          sandboxMerchantId: '',
          sandboxPublicKey: '',
          sandboxPrivateKey: ''
        },
        onUpdatePsp,
        onCancel: () => {}
      }
    )

    // Change tab
    fireEvent.click(getByTestId('tab-1'))

    fireEvent.change(getByPlaceholderText('Sandbox Merchant ID'), {
      target: { value: 'sbMobilabSolutionsGmbHCOM' }
    })
    fireEvent.change(getByPlaceholderText('Sandbox Private Key'), {
      target: { value: 'sbprivateAQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4R' }
    })
    fireEvent.change(getByPlaceholderText('Sandbox Public Key'), {
      target: { value: 'sbpublicAQEvhmfuXNWTK0Qc+iSdnWYxq+WZe4R' }
    })
    const Button = getByText('Save').parentElement
    fireEvent.click(Button)
  })
})
