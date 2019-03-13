import styled from '../../styled'

const Button = styled.button`
  border-radius: 20px;
  border-width: 0;
  height: 40px;
  display: block;
  outline: none;
  overflow: hidden;
  padding: 0;
  position: relative;
  transition: background-color 0.3s;
  :hover,
  :focus {
    cursor: pointer;
  }
  ::before {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 100%;
    content: '';
    display: block;
    left: 50%;
    padding-top: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0;
  }
  :active:not(:disabled)::before {
    padding-top: 120%;
    transition: width 0.4s ease-out, padding-top 0.4s ease-out;
    width: 120%;
  }
  :disabled {
    cursor: not-allowed;
  }
  > span {
    display: block;
    font-size: 14px;
    padding: 0.75em 1em;
  }
  background-color: ${props => props.theme.white};
  border: solid 2px ${props => props.theme.primary.A700};
  :hover,
  :focus {
    background-color: ${props => props.theme.primary.A25};
  }
  :active {
    background-color: ${props => props.theme.primary.A50};
  }
  :disabled {
    background-color: ${props => props.theme.shade.A400};
  }
  > span {
    color: ${props =>
      props.disabled ? props.theme.shade.A400 : props.theme.primary.A700};
  }
`

export default function SecondaryButton({
  label,
  type = 'button',
  disabled = false,
  onClick
}) {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={
        !disabled && onClick
          ? e => {
              e.stopPropagation()
              onClick()
            }
          : null
      }
    >
      <span>{label}</span>
    </Button>
  )
}
