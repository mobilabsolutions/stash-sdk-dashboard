import Popover, { ArrowContainer } from 'react-tiny-popover'
import { useLocalization } from '../../../hooks'
import { useState } from 'react'
import { Action, ActionContainer, MoreIcon } from './styled'
import { getActionsByStatus } from '../../../assets/payment.static'

export default function TransactionActions({ status, onClick }) {
  const { getText } = useLocalization()
  const [show, setShow] = useState(false)
  const actions = getActionsByStatus(status)
  if (!actions.length) return <div />

  return (
    <Popover
      isOpen={show}
      position={'top'}
      align={'end'}
      onClickOutside={() => setShow(false)}
      content={({ position, targetRect, popoverRect }) => (
        <div>
          <ArrowContainer
            position={position}
            targetRect={targetRect}
            popoverRect={popoverRect}
            arrowColor={'white'}
            arrowStyle={{
              bottom: '1px',
              boxShadow: '0 4px 10px 0 #ededed'
            }}
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
      <MoreIcon
        height={24}
        width={32}
        onClick={() => {
          setShow(!show)
        }}
        data-testid="more-icon"
      />
    </Popover>
  )
}
