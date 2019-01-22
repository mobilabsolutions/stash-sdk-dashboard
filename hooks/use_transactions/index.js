import { useEffect, useState } from 'react'

import { useApi } from '../use_api'

const isClient = typeof window === 'object'

const initValue = {
  data: [],
  isLoading: true,
  fromDate: null,
  toDate: null,
  startPos: 0,
  pageSize: 20,
  error: null
}

let refreshCount = 0

export const useTransactions = () => {
  const { get: apiGet } = useApi()
  const [state, setState] = useState(initValue)

  useEffect(() => {
    if (!isClient) return

    if (!state.isLoading)
      setState({
        ...state,
        isLoading: true,
        error: null
      })

    let url = `/api/v1/transactions?pagesize=${state.pageSize}`

    if (state.startPos) url += `&startpos=${state.startPos}`
    if (state.fromDate) url += `&fromDate=${state.fromDate}`
    if (state.toDate) url += `&fromDate=${state.toDate}`

    apiGet(url)
      .then(response => {
        setState({
          ...state,
          data: response.result.transactions,
          totalCount: response.result.totalCount,
          isLoading: false
        })
      })
      .catch(error => {
        setState({
          ...state,
          data: [],
          error,
          isLoading: false
        })
      })
  }, [
    state.fromDate,
    state.toDate,
    state.startPos,
    state.pageSize,
    refreshCount
  ])

  const changeFromDate = fromDate => setState({ ...state, fromDate })
  const changeToDate = toDate => setState({ ...state, toDate })
  const refresh = () => refreshCount++

  return {
    ...state,
    changeFromDate,
    changeToDate,
    refresh
  }
}
