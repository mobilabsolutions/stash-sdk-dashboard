import styled from '../../styled'
import { forwardRef, useRef, useState } from 'react'

const HtmlInput = styled.input`
  border: none;
  color: ${props => props.theme.shade.A700};
  display: block;
  font-family: ${props => props.theme.font};
  font-size: 14px;
  margin-left: 16px;
  margin-right: 16px;
  box-shadow: none;
  width: 100%;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${props => props.theme.shade.A100};
  }
  ::selection {
    background-color: ${props => props.theme.primary.A100};
  }
`

function TheInput(
  {
    field: { name, value, onChange, onBlur },
    form: { touched, errors },
    placeholder = 'Insert text',
    title = '',
    className = '',
    disabled = false,
    autoFocus = false
  },
  inputRef: any
) {
  const [focused, setFocused] = useState(autoFocus)
  const localRef = useRef(undefined)

  const ref = inputRef || localRef

  const handleClick = () => inputRef && inputRef.current.focus()
  const hasErrors = touched[name] && errors[name]

  return (
    <div>
      <HtmlInput />
    </div>
  )
}

export default forwardRef(TheInput)
