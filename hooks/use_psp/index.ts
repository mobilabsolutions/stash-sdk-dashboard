import { useCallback, useEffect, useState } from 'react'

import { useApi } from '../use_api'
import { PSP } from '../../types/psp'

interface State {
  data: Array<PSP>
  isLoading: boolean
  error: any
}

function initialPsPState(): State {
  return {
    data: [],
    isLoading: true,
    error: null
  }
}

export const usePsp = () => {
  const [state, setState] = useState(initialPsPState())
  const { get, post, merchantId, put, del } = useApi()

  const loadPsps = () => {
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
  }

  useEffect(loadPsps, [get, merchantId])

  const save = useCallback(
    (pspId, pspConfig) => {
      return post(`/api/v1/merchant/${encodeURIComponent(merchantId)}/psp`, {
        pspId,
        pspConfig
      }).then(() => {
        loadPsps()
      })
    },
    [merchantId, post]
  )

  const update = useCallback(
    (pspId, pspConfig) => {
      return put(
        `/api/v1/merchant/${encodeURIComponent(
          merchantId
        )}/psp/${encodeURIComponent(pspId)}`,
        pspConfig
      ).then(() => {
        loadPsps()
      })
    },
    [merchantId, post]
  )

  const remove = useCallback(
    pspId => {
      return del(
        `/api/v1/merchant/${encodeURIComponent(
          merchantId
        )}/psp/${encodeURIComponent(pspId)}`
      ).then(() => {
        loadPsps()
      })
    },
    [merchantId, post]
  )

  return { ...state, save, update, remove }
}
