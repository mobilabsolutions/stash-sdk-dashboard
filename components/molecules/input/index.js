import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
  margin-right: 8px;
`
const Input = styled.input`
  border-bottom: 1.2px solid ${props => props.theme.primary.A700};
  border: none;
  color: ${props => props.theme.shade.A700}
  display: block;
  font-family: ${props => props.theme.font};
  font-size: 1em;
  border-radius: 5px;
  padding: 10px 10px 10px 5px;
  width: 285px;
  box-shadow: none;
  :focus {
    outline: none;
  }
`

const Line = styled.span`
  position: relative;
  display: block;
  width: 300px;
  ::before,
  ::after {
    content: '';
    height: 1.2px;
    width: 50%;
    bottom: 1.2px;
    position: absolute;
    background: ${props => props.theme.shade.A700};
  }
  ::before {
    left: 50%;
  }
  ::after {
    right: 50%;
  }
`

const Bar = styled.span`
  position: relative;
  display: block;
  width: 300px;
  ::before,
  ::after {
    content: '';
    height: 2px;
    width: ${props => (props.focused ? '50%' : '0px')};
    bottom: 1.2px;
    position: absolute;
    background: ${props => props.theme.primary.A700};
    transition: 0.2s ease all;
  }
  ::before {
    left: 50%;
  }
  ::after {
    right: 50%;
  }
`

export default ({ id, name, value, type, onChanged }) => {
  const [focused, setFocused] = useState()

  return (
    <Wrapper>
      <Input
        id={id}
        name={name}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={event => onChanged(event.target.value)}
        value={value}
        type={type}
      />
      <Line />
      <Bar focused={focused} />
    </Wrapper>
  )
}
