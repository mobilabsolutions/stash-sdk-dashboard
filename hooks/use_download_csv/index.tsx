import FileSaver from 'file-saver'
import { useApi } from '../use_api'
import { useState } from 'react'

const getInitial = () => ({
  downloading: false,
  error: false
})

const type = 'text/csv;charset=ISO-8859-1'

export default (url?: string, filename?: string) => {
  const [state, setstate] = useState(getInitial())
  const { getRaw } = useApi()

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
    }
  }

  return {
    ...state,
    download
  }
}
