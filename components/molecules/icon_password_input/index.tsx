import { useState, useRef } from 'react'

import { VisibilityIcon, InvisibilityIcon } from '../../atoms'
import styled from '../../styled'

const borderColor = ({ focused, hasErrors, theme }) =>
  hasErrors ? theme.red.A400 : focused ? theme.primary.A600 : theme.shade.A100

interface IsFocused {
  focused: boolean
  hasErrors: boolean
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
  background-color: ${props => props.theme.white};
  margin-top: 4px;
  margin-bottom: 16px;
  > .icon {
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
    display: flex;
    height: 100%;
    border-right: solid 1px ${borderColor};
    transition: all 0.3s ease-in-out;
  }
  > .visibility {
    display: flex;
    margin-right: 12px;
    align-self: center;
    align-items: center;
    cursor: pointer;
  }
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

export default ({
  field: { name, value, onChange, onBlur },
  form: { touched, errors },
  icon,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef(null)

  const handleClick = () => inputRef && inputRef.current.focus()
  const hasErrors = touched[name] && errors[name]

  return (
    <Wrapper focused={focused} hasErrors={hasErrors} onClick={handleClick}>
      <div className="icon">{icon}</div>
      <input
        {...props}
        type={visible ? 'text' : 'password'}
        name={name}
        ref={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={event => {
          setFocused(false)
          onBlur(event)
        }}
        onChange={onChange}
        value={value}
      />
      <div className="visibility">
        {visible ? (
          <InvisibilityIcon onClick={() => setVisible(false)} />
        ) : (
          <VisibilityIcon onClick={() => setVisible(true)} />
        )}
      </div>
    </Wrapper>
  )
}
