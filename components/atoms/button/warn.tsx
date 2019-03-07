import React from 'react'
import styled from '../../styled'

const getWidth = props => (props.isFullSize ? '100%' : 'auto')

const Button = styled.button`
  border-radius: 5px;
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
  background-color: ${props => props.theme.orange.A700};
  width: ${getWidth};
  :hover,
  :focus {
    background-color: ${props => props.theme.orange.A800};
  }
  :active {
    background-color: ${props => props.theme.orange.A900};
  }
  :disabled {
    background-color: ${props => props.theme.shade.A400};
  }
  > span {
    color: ${props => props.theme.shade.A25};
    text-transform: uppercase;
  }
`

const PrimaryButton = ({
  label,
  type = 'button',
  disabled = false,
  onClick,
  className = ''
}) => (
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
    className={className}
  >
    <span>{label}</span>
  </Button>
)

export default PrimaryButton
