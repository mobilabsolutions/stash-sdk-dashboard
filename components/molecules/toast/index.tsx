import styled from '../../styled'
import { Check, Close, Warn } from '../../atoms'

const ToastContent = styled.span`
  color: ${p => p.theme.shade.A700}!important;
  svg {
    transform: translateY(2px);
  }
  .check-icon {
    margin-right: ${p => p.theme.spacing.xsmall};
  }
  .close-icon {
    margin-left: ${p => p.theme.spacing.small};
    cursor: pointer;
  }
`

export const ToastSuccess = ({ children, onClose }) => (
  <ToastContent>
    <Check className="check-icon" width={16} height={16} /> {children}{' '}
    <Close
      className="close-icon"
      onClick={onClose}
      width={16}
      height={16}
      fill="#46545e"
    />
  </ToastContent>
)

export const ToastError = ({ children, onClose }) => (
  <ToastContent>
    <Warn fill="#ef4e4e" className="check-icon" width={16} height={16} />{' '}
    {children}{' '}
    <Close
      className="close-icon"
      onClick={onClose}
      width={16}
      height={16}
      fill="#46545e"
    />
  </ToastContent>
)
