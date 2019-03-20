import { useEffect, useState } from 'react'

import { useApi } from '../use_api'

const initialState = {
  data: [],
  isLoading: false,
  error: null
}

export const usePsp = () => {
  const [state, setState] = useState(initialState)
  const { get, merchantId } = useApi()

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

  return { ...state }
}
