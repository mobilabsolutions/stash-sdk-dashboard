import styled from '../../styled'

import { borderColor } from './color'
import InputWrapperProps from './interfaces'

export default styled.div<InputWrapperProps>`
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  display: flex;
  height: 100%;
  border-right: solid 1px ${borderColor};
  transition: all 0.3s ease-in-out;
`
