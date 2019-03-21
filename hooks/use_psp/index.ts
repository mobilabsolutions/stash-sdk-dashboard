import { useCallback, useEffect, useState } from 'react'

import { useApi } from '../use_api'

const initialState = {
  data: [],
  isLoading: true,
  error: null
}

export const usePsp = () => {
  const [state, setState] = useState(initialState)
  const { get, post, merchantId } = useApi()

  useEffect(() => {
    setState(prevState => ({ ...prevState, isLoading: true }))
    get(`/api/v1/merchant/${encodeURIComponent(merchantId)}/psp`)
      .then((response: any) =>
        setState({
          data:
            response.result && response.result.psp ? response.result.psp : [],
          isLoading: false,
          error: null
        })
      )
      .catch((error: any) => setState({ data: [], isLoading: false, error }))
  }, [get, merchantId])

  const save = useCallback(
    pspConfig => {
      return post(
        `/api/v1/merchant/${encodeURIComponent(merchantId)}/psp`,
        pspConfig
      ).then(() => {
        return true
      })
    },
    [merchantId, post]
  )

  return { ...state, save }
}
