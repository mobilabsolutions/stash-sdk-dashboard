import React, { useContext, useState, useCallback } from 'react'

import styled, { keyframes } from '../../components/styled'
import { useInterval } from '../use_interval'
import { ReactComponentLike } from 'prop-types'

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  10% {
    opacity: 1;
    transform: none;
  }
  90% {
    opacity: 1;
    transform: none;
  }
  100% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
`

const ToastContainer = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 999;
  width: 100vw;
  max-height: 100vh;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  bottom: 0px;
`

interface TostProps {
  type: string
  time: number
}

const getBackgroundColor = props => {
  switch (props.type) {
    case 'success':
      return props.theme.green.A100
    default:
      return props.theme.red.A100
  }
}

const getFontColor = props => {
  switch (props.type) {
    case 'success':
      return props.theme.green.A800
    default:
      return '#e7faee'
  }
}

const Toast = styled.div<TostProps>`
  font-family: ${props => props.theme.font};
  display: flex;
  align-items: center;
  text-align: center;
  background-color: ${getBackgroundColor};
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 ${props => props.theme.shade.A50};
  padding: 8px 16px 8px 16px;
  margin: 8px;
  white-space: pre-line;
  min-height: 50px;
  margin-bottom: 15px;
  border-radius: 5px;
  animation-name: ${fadeInUp};
  animation-duration: ${props => props.time}s;
  animation-fill-mode: both;
  transform: translateX(-50%);
  > span {
    display: block;
    color: ${getFontColor};
  }
`

const toastContext = React.createContext(null)
toastContext.displayName = 'NextContext'

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  useInterval(() => {
    if (toasts.length > 0)
      setToasts(prevToasts =>
        prevToasts.filter(toast => toast.valid + 50 > Date.now())
      )
  }, 1000)

  const success = useCallback((message: ReactComponentLike, time = 5) => {
    setToasts(prevToasts => [
      ...prevToasts,
      { message, type: 'success', time, valid: Date.now() + time * 1000 }
    ])
  }, [])

  const error = useCallback((message: ReactComponentLike, time = 5) => {
    setToasts(prevToasts => [
      ...prevToasts,
      { message, type: 'error', time, valid: Date.now() + time * 1000 }
    ])
  }, [])

  const providerValue = {
    toasts,
    error,
    success
  }

  return (
    <toastContext.Provider value={providerValue}>
      {children}
      <ToastContainer>
        {toasts.map(
          (
            toast: {
              type: string
              time: number
              message: ReactComponentLike
            },
            index
          ) => (
            <Toast key={index} type={toast.type} time={toast.time}>
              {typeof toast.message == 'string' ? (
                <span>{toast.message}</span>
              ) : (
                <toast.message />
              )}
            </Toast>
          )
        )}
      </ToastContainer>
    </toastContext.Provider>
  )
}

export const useToast: () => {
  success: (message: ReactComponentLike, time?: number) => void
  error: (message: ReactComponentLike, time?: number) => void
} = () => {
  const { success, error } = useContext(toastContext)

  return { success, error }
}
