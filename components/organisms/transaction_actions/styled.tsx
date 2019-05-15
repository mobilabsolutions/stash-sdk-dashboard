import styled from '../../styled'
import { More } from '../../atoms'

export const Action = styled.div`
  display: block;
  padding: 9px 30px;
  transition: background-color 0.3s;
  :hover,
  :focus {
    cursor: pointer;
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
    padding: 0.75em 1.5em;
  }
  background-color: #ffffff;
  :hover,
  :focus {
    background-color: #edeff0;
  }
  :active {
    background-color: #d1d5d7;
  }
  > span {
    color: #f6f7f7;
    white-space: nowrap;
  }
`

export const ActionContainer = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 10px 0 #ededed;
  border: solid 1px #ededed;
  background-color: #ffffff;
  ::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`

export const MoreIcon = styled(More)`
  cursor: pointer;
`
