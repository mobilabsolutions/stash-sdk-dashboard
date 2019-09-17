import { useApi } from '..'
import { useState, useEffect } from 'react'
import { Report } from '../../types'

interface State {
  reportList: Report[]
  loading: boolean
  deleting: boolean
  errorLoading: any
  errorDeleting: any
}

function initial() {
  return {
    reportList: [],
    loading: false,
    deleting: false,
    errorLoading: null,
    errorDeleting: null
  }
}

export default () => {
  const { get, del, merchantId } = useApi()
  const [state, setState] = useState<State>(initial())
  const loadReportList = () => {
    setState(prev => ({ ...prev, loading: true, errorLoading: null }))
    get(`/api/v1/report/${merchantId}`)
      .then(({ result }) => {
        setState(prev => ({
          ...prev,
          reportList: result.filters,
          loading: false,
          errorLoading: null
        }))
      })
      .catch(errorLoading => {
        setState(prev => ({ ...prev, loading: false, errorLoading }))
      })
  }
  const deleteReport = (filterName: string) => {
    setState(prev => ({ ...prev, deleting: true, errorDeleting: null }))
    del(
      `/api/v1/report/${merchantId}?filterName=${encodeURIComponent(
        filterName
      )}`
    )
      .then(() => {
        setState(prev => ({
          ...prev,
          deleting: false,
          errorDeleting: null
        }))
      })
      .catch(errorDeleting => {
        setState(prev => ({ ...prev, deleting: false, errorDeleting }))
      })
  }

  useEffect(() => {
    !state.deleting && loadReportList() //Loading reports on mount and after deleting
  }, [state.deleting])

  return {
    ...state,
    deleteReport,
    loadReportList
  }
}
