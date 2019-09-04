import { useEffect, useState, useCallback } from 'react'

import { useApi } from '../use_api'

const initialState = {
  data: [],
  isLoading: true,
  isCreating: false,
  isDeleting: false,
  error: null
}

export const useKeys = () => {
  const [state, setState] = useState(initialState)
  const { get, post, del, merchantId } = useApi()

  useEffect(() => {
    setState(prevState => ({ ...prevState, isLoading: true }))
    get(`/api/v1/merchant/${encodeURIComponent(merchantId)}/api-key`)
      .then((response: any) =>
        setState(prev => ({
          ...prev,
          data:
            response.result && response.result.data ? response.result.data : [],
          isLoading: false,
          error: null
        }))
      )
      .catch((error: any) =>
        setState(prev => ({ ...prev, data: [], isLoading: false, error }))
      )
  }, [])

  const create = useCallback(
    (type: string, name?: string) => {
      setState(prev => ({ ...prev, isCreating: true }))

      post(`/api/v1/merchant/${encodeURIComponent(merchantId)}/api-key`, {
        type,
        name
      }).then((response: any) => {
        if (response && response.result) {
          setState(prevState => ({
            ...prevState,
            isCreating: false,
            data: [
              ...prevState.data,
              {
                type,
                name,
                ...response.result
              }
            ]
          }))
        }
      })
    },
    [merchantId, post]
  )

  const remove = useCallback(
    (id: number) => {
      setState(prev => ({ ...prev, isDeleting: true }))
      del(
        `/api/v1/merchant/${encodeURIComponent(merchantId)}/api-key/${id}`
      ).then(() => {
        setState(prevState => ({
          ...prevState,
          isDeleting: false,
          data: prevState.data.filter(item => item.id !== id)
        }))
      })
    },
    [del, merchantId]
  )

  return { ...state, create, remove }
}
