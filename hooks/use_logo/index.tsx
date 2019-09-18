import React, { createContext, useEffect, useState, useContext } from 'react'
import { useApi } from '..'

const logoContext = createContext(null)
logoContext.displayName = 'LogoContext'

export const LogoProvider = ({ children }) => {
  const imageControl = useLogoControl()
  return (
    <logoContext.Provider value={{ ...imageControl }}>
      {children}
    </logoContext.Provider>
  )
}

const useLogoControl = () => {
  const { post, merchantId, getRaw } = useApi()
  const [state, setState] = useState({
    imgBase64: null,
    uploading: false,
    loading: false,
    error: null
  })
  const uploadLogo = (formData: object) => {
    setState(prev => ({ ...prev, uploading: true, error: false }))
    post(
      `/api/v1/merchant/${merchantId}/logo`,
      formData,
      ({ Authorization }) => ({ Authorization }),
      false
    )
      .then(() => {
        setState(prev => ({ ...prev, error: false, uploading: false }))
      })
      .catch((e: any) => {
        setState(prev => ({ ...prev, error: e, uploading: false }))
      })
  }

  useEffect(() => {
    if (!state.uploading && merchantId) {
      setState(prev => ({ ...prev, loading: true }))
      getRaw(`/api/v1/merchant/${merchantId}/logo`)
        .then(async r => {
          var reader = new FileReader()
          reader.onloadend = function() {
            var img = new Image()
            img.src = reader.result.toString()
            setState(prev => ({ ...prev, imgBase64: img.src, loading: false }))
          }
          const Blob = await r.result.blob()
          reader.readAsDataURL(Blob)
        })
        .catch(e => {
          setState(prev => ({ ...prev, loading: false }))
          console.log(e)
        })
    }
    if (!merchantId && state.imgBase64) {
      setState({
        imgBase64: null,
        uploading: false,
        loading: false,
        error: null
      })
    }
  }, [state.uploading, merchantId])
  return {
    uploadLogo,
    ...state
  }
}

export default () => {
  const context = useContext(logoContext)
  return { ...context }
}
