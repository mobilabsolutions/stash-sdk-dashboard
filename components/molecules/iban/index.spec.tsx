import { testRender } from '../../../test_utils'
import IBAN from '.'

it('IBAN formater should format 16 size', () => {
  testRender(IBAN, {
    value: 'BE71096123456769'
  })
})

it('IBAN formater should format 22 size', () => {
  testRender(IBAN, {
    value: 'DE75512108001245126199'
  })
})
