import styled from '../../styled'

import { borderColor } from './color'
import InputWrapperProps from './interfaces'

export default styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 42px;
  border-radius: 8px;
  border: solid 1px ${borderColor};
  max-width: 300px;
  transition: border 0.3s ease-in-out;
  background-color: ${props => props.theme.white};
  margin-bottom: ${props => (props.hasErrors ? '0px' : props.theme.spacing.small)};
`
