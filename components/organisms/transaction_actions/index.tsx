import Popover, { ArrowContainer } from 'react-tiny-popover'
import { useLocalization } from '../../../hooks'
import { useState } from 'react'
import { Action, ActionContainer, MoreIcon } from './styled'

function getActions(status: string): Array<{ type: string }> {
  switch (status) {
    case 'captured':
      return [
        {
          type: 'refund'
        }
      ]
    case 'authorised':
      return [
        {
          type: 'capture'
        },
        {
          type: 'reverse'
        }
      ]
    default:
      return []
  }
}

export default function TransactionActions({ status, onClick }) {
  const { getText } = useLocalization()
  const [show, setShow] = useState(false)
  const actions = getActions(status)
  if (!actions.length) return <div />

  return (
    <Popover
      isOpen={show}
      position={'top'}
      onClickOutside={() => setShow(false)}
      content={({ position, targetRect, popoverRect }) => (
        <div>
          <ArrowContainer
            position={position}
            targetRect={targetRect}
            popoverRect={popoverRect}
            arrowColor={'white'}
            arrowSize={10}
          >
            <ActionContainer>
              {actions.map((action, index) => (
                <Action
                  key={`${index}-${action.type}`}
                  onClick={() => {
                    setShow(false)
                    onClick(action.type)
                  }}
                >
                  {getText(action.type)}
                </Action>
              ))}
            </ActionContainer>
          </ArrowContainer>
        </div>
      )}
    >
      <MoreIcon height={24} width={32} onClick={() => setShow(!show)} />
    </Popover>
  )
}
