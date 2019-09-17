import FileSaver from 'file-saver'
import { useApi, useToast, useLocalization } from '..'
import { useState } from 'react'

const getInitial = () => ({
  downloading: false,
  error: false
})

const type = 'text/csv;charset=ISO-8859-1'

export default (url?: string, filename?: string) => {
  const [state, setstate] = useState(getInitial())
  const { getRaw } = useApi()
  const { error: toastError } = useToast()
  const { getText } = useLocalization()

  async function download(customUrl?: string, customFilename?: string) {
    setstate({ downloading: true, error: false })
    try {
      const { result } = await getRaw(!!customUrl ? customUrl : url)
      const text = await result.text()
      var blob = new Blob([text], { type })
      FileSaver.saveAs(blob, !!customFilename ? customFilename : filename)
      setstate({ downloading: false, error: false })
    } catch (e) {
      setstate({ downloading: false, error: true })
      toastError(() =>
        getText('An error occurred trying to download the CSV. Try again.')
      )
    }
  }

  return {
    ...state,
    download
  }
}
