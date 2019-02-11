import { useEffect } from 'react'

export const useKeyDown = onKeyPress => {
  const handleKeyPress = event => onKeyPress(event)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])
}
