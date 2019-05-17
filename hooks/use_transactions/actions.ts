import { useApi } from '../use_api'
import { useState } from 'react'

export interface Params {
  transactionId: string
  reason?: string
  amount?: string | number
  currency?: string
}

const actionCreator = (getUrl: Function) =>
  function(onSuccess?: Function, onError?: Function) {
    const { post: apiPost } = useApi()
    const [state, setState] = useState({
      error: null,
      isLoading: false
    })

    const action = (params: Params) => {
      setState(prevState => ({ ...prevState, isLoading: true }))

      return new Promise(resolve => {
        apiPost(getUrl(params), params)
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
      ...state
    }
  }

export function useRefund(onSuccess?: Function, onError?: Function) {
  return actionCreator(
    (params: Params) => `/api/v1/authorization/${params.transactionId}/refund`
  )(onSuccess, onError)
}

export function useCapture(onSuccess?: Function, onError?: Function) {
  return actionCreator(
    (params: Params) =>
      `/api/v1/preauthorization/${params.transactionId}/capture`
  )(onSuccess, onError)
}

export function useReverse(onSuccess?: Function, onError?: Function) {
  return actionCreator(
    (params: Params) =>
      `/api/v1/preauthorization/${params.transactionId}/reverse`
  )(onSuccess, onError)
}

export default actionCreator
