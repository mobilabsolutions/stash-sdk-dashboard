import React, { useContext, useState, useCallback } from 'react'

import styled, { keyframes } from '../../components/styled'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
`

const ToastContainer = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 999999999999;
  max-height: calc(100vh - 10px);
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  bottom: 100px;
`

const Toast = styled.div`
  font-family: ${props => props.theme.font};
  display: flex;
  align-items: center;
  text-align: center;
  padding: 5px 15px;
  white-space: pre-line;
  min-height: 50px;
  margin-bottom: 15px;
  border-radius: 5px;
  animation-name: ${fadeInUp};
  animation-duration: 1s;
  animation-fill-mode: both;
  transform: translateX(-50%);
`

const toastContext = React.createContext(null)
toastContext.displayName = 'NextContext'

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const success = useCallback((message: string, timer: number) => {
    console.log(message)
    setToasts(prevToasts => [
      ...prevToasts,
      { message, type: 'success', valid: Date.now() + timer }
    ])
  }, [])

  const providerValue = {
    toasts,
    success
  }

  return (
    <toastContext.Provider value={providerValue}>
      {children}
      <ToastContainer>
        {toasts.map((toast, index) => (
          <Toast key={index}>{toast.message}</Toast>
        ))}
      </ToastContainer>
    </toastContext.Provider>
  )
}

export const useToast = () => {
  const { success } = useContext(toastContext)

  return { success }
}
