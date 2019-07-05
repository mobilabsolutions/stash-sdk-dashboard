import React from 'react'
import styled from '../../styled'

const CCMASK = styled.span`
  padding-right: 16px;
  ::before {
    padding-right: 2px;
    content: '****';
  }
`

export default function CreditCardMask({ children }) {
  return <CCMASK>{children}</CCMASK>
}
