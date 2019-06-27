import { testRender } from '../../../test_utils'
import PaymentMethodsDet from './payment_method_detail'

it('Payment Method should show PayPal details', () => {
  testRender(PaymentMethodsDet, {
    paymentMethod: 'PAY_PAL',
    personalData: {
      email: 'name@emailcom'
    }
  })
})

it('Payment Method should show Credit Cards details', () => {
  testRender(PaymentMethodsDet, {
    paymentMethod: 'CC',
    ccConfig: {
      ccExpiry: '12/25',
      ccHolderName: 'Alan Doe',
      ccMask: '3344',
      ccType: 'DINERS'
    }
  })
})

it('Payment Method should show SEPA details', () => {
  testRender(PaymentMethodsDet, {
    paymentMethod: 'SEPA',
    sepaConfig: {
      bic: '87f387hf383',
      iban: '7551210800124512619'
    }
  })
})
