import { useEffect, useState, MutableRefObject } from 'react'

export const useClientRect = (ref: MutableRefObject<any>) => {
  const getClientRect = () => {
    if (!ref || !ref.current) return {}

    const clientRects = ref.current.getClientRects()
    return clientRects.length > 0 ? clientRects[0] : {}
  }

  const [state, setState] = useState(getClientRect())
  const updateState = () => setState(getClientRect())

  useEffect(() => {
    updateState()

    window.addEventListener('resize', updateState)
    return () => window.removeEventListener('resize', updateState)
  }, [ref.current])

  return state
}
