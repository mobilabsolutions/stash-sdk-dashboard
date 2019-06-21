import { useApi } from '../use_api'
import { useState } from 'react'
import { SDK_CONFIG } from '../../server/env'
import uuidv1 from 'uuid/v1'

function toInt(num?: any) {
  const conversion = Number(num) * 100
  return !!num ? Number.parseInt(conversion.toString()) : num
}
export interface Params {
  transactionId: string
  merchantId: string
  reason?: string
  amount?: string | number
  currency?: string
}

const actionCreator = (getUrl: Function) =>
  function(onSuccess?: Function, onError?: Function) {
    const { put: apiPut, merchantId } = useApi()
    const [state, setState] = useState({
      error: null,
      isLoading: false
    })
    const setError = (error: boolean) => setState(prev => ({ ...prev, error }))
    const action = (params: Params) => {
      setState(prevState => ({ ...prevState, isLoading: true }))
      const amount = toInt(params.amount)
      return new Promise(resolve => {
        apiPut(
          getUrl({ ...params, merchantId }),
          { ...params, amount },
          {
            'PSP-Test-Mode': SDK_CONFIG.PspTestMode,
            'Idempotent-Key': uuidv1()
          }
        )
          .then(response => {
            setState(prevState => ({
              ...prevState,
              error: null,
              isLoading: false
            }))
            typeof onSuccess === 'function' && onSuccess(response, params)
            resolve(true)
          })
          .catch(error => {
            setState(prevState => ({
              ...prevState,
              error,
              isLoading: false
            }))
            typeof onError === 'function' && onError(error, params)
          })
      })
    }
    return {
      action,
      setError,
      ...state
    }
  }

export function useRefund(onSuccess?: Function, onError?: Function) {
  return actionCreator(
    (params: Params) =>
      `/api/v1/merchant/${params.merchantId}/authorization/${params.transactionId}/refund`
  )(onSuccess, onError)
}

export function useCapture(onSuccess?: Function, onError?: Function) {
  return actionCreator(
    (params: Params) =>
      `/api/v1/merchant/${params.merchantId}/preauthorization/${params.transactionId}/capture`
  )(onSuccess, onError)
}

export function useReverse(onSuccess?: Function, onError?: Function) {
  return actionCreator(
    (params: Params) =>
      `/api/v1/merchant/${params.merchantId}/preauthorization/${params.transactionId}/reverse`
  )(onSuccess, onError)
}

export default actionCreator
