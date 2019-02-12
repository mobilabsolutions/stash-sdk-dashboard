import { useEffect } from 'react'

export const useKeyDown = (onKeyPress: (key: KeyboardEvent) => null) => {
  const handleKeyPress = (event: KeyboardEvent) => onKeyPress(event)

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])
}
