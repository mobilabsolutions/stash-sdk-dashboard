import { useRef } from 'react'
import styled from 'styled-components'

import { useKeyDown } from '../../../hooks'
import { Overlay } from '../../atoms'

const Content = styled.div`
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  display: flex;
  min-height: 100px;
  min-width: 100px;
  background-color: ${props => props.theme.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.24);
  position: relative;
`

export default function Popup({ show, onClose, children }) {
  useKeyDown(key => key.code === 'Escape' && onClose())
  const overlayRef = useRef(null)

  if (!show) return null
  const handleOverlayClick = event =>
    event.target === overlayRef.current && onClose()

  return (
    <Overlay ref={overlayRef} onClick={handleOverlayClick}>
      <Content>{children}</Content>
    </Overlay>
  )
}
