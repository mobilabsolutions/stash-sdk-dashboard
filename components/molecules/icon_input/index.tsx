import { useState, useRef, ReactNode } from 'react'

import styled from '../../styled'

const borderColor = ({ focused, theme }) =>
  focused ? theme.primary.A500 : theme.shade.A100

interface IsFocused {
  focused: boolean
}

const Wrapper = styled.div<IsFocused>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 42px;
  border-radius: 8px;
  border: solid 1px ${borderColor};
  max-width: 300px;
  transition: all 0.3s ease-in-out;
  > div {
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
    display: flex;
    height: 100%;
    border-right: solid 1px ${borderColor};
    transition: all 0.3s ease-in-out;
  }
  > input {
    border: none;
    color: ${props => props.theme.shade.A700};
    display: block;
    font-family: ${props => props.theme.font};
    font-size: 14px;
    border-radius: 8px;
    margin-left: 16px;
    margin-right: 16px;
    box-shadow: none;
    width: 100%;
    :focus {
      outline: none;
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
  icon: ReactNode
}

export default ({
  id,
  name,
  value = '',
  type = 'text',
  placeholder = '',
  icon,
  onChanged
}: InputProps) => {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)

  const handleClick = () => inputRef && inputRef.current.focus()

  return (
    <Wrapper focused={focused} onClick={handleClick}>
      <div>{icon}</div>
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
