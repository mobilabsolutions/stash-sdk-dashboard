import React from 'react'
import Popup from '.'
import styled from '../../styled'
import PropTypes from 'prop-types'
import { SecondaryButton, PrimaryButton } from '../../atoms'
import { useLocalization } from '../../../hooks'
import { Close } from '../../atoms'

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
`

const ContentContainer = styled.div`
  padding: 32px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 24px 12px 24px;
  align-items: center;
  justify-content: flex-end;
  border-radius: 5px;
  > button {
    margin-left: ${p => p.theme.spacing.small};
  }
`
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 24px;
`

const HeaderTitle = styled.span`
  color: ${props => props.theme.shade.A700};
  font-size: 1.2em;
  font-weight: bold;
  padding-right: 48px;
`

const HeaderClose = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 48px;
  svg {
    cursor: pointer;
  }
`

export function WarnPopup({
  show = false,
  onClose,
  children,
  onAction,
  secondaryBtn = true,
  header,
  PrimaryButtonEl = PrimaryButton,
  buttonStyle = {},
  action
}) {
  const { getText } = useLocalization()

  return (
    <ActionPopup show={show} onClose={onClose} header={header}>
      {!!children && <ContentContainer>{children}</ContentContainer>}
      <ButtonContainer>
        {secondaryBtn && (
          <SecondaryButton label={getText('Cancel')} onClick={onClose} />
        )}
        {typeof onAction === 'function' &&
          PrimaryButtonEl({
            label: action,
            onClick: onAction,
            style: buttonStyle
          })}
      </ButtonContainer>
    </ActionPopup>
  )
}

WarnPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func,
  header: PropTypes.string,
  action: PropTypes.string
}

export default function ActionPopup({
  show = false,
  onClose,
  children,
  header
}) {
  return (
    <Popup show={show} onClose={onClose}>
      <PopupContainer>
        <HeaderContainer>
          <HeaderTitle>{header}</HeaderTitle>
          <HeaderClose>
            <Close onClick={onClose} />
          </HeaderClose>
        </HeaderContainer>
        {children}
      </PopupContainer>
    </Popup>
  )
}

ActionPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string
}
