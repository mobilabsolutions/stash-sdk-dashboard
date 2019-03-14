import { useState, useRef } from 'react'

import styled from '../../styled'

const borderColor = ({ focused, theme }) =>
  focused ? theme.primary.A600 : theme.shade.A100

interface WrapperProps {
  focused: boolean
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 42px;
  border-radius: 8px;
  border: solid 1px ${borderColor};
  max-width: 300px;
  background-color: ${props => props.theme.white};
  > input {
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
  }
`

interface InputProps {
  id: string
  name: string
  value?: string
  type?: string
  placeholder?: string
  onChanged: (value: string) => void
}

export default ({
  id,
  name,
  value = '',
  type = 'text',
  placeholder = '',
  onChanged
}: InputProps) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const handleClick = () => inputRef && inputRef.current.focus()

  return (
    <Wrapper focused={focused} onClick={handleClick}>
      <input
        id={id}
        name={name}
        ref={inputRef}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={event => onChanged(event.target.value)}
        value={value}
        type={type}
      />
    </Wrapper>
  )
}
