import { useApi } from '..'
import { useState, useEffect } from 'react'
import { Report } from '../../types'
import { useToast, useLocalization } from '..'

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
  const { error: toastError } = useToast()
  const { getText } = useLocalization()
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
        toastError(() =>
          getText(
            'An error occurred trying to get the list of reports. Try again.'
          )
        )
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
        toastError(() =>
          getText('An error occurred trying to delete the report. Try again.')
        )
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
