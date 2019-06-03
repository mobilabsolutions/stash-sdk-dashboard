import React, { forwardRef } from 'react'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'

import { FlatButton, ArrowDown, ArrowUp, Settings } from '../../atoms'

const Header = styled.div`
  margin: 32px 48px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${props => props.theme.shade.A700};
`

const H4 = styled.span`
  font-size: 18px;
`

const HeaderBtn = styled(FlatButton)`
  margin-left: 16px;
  display: flex;
  font-size: 14px;
  padding: 8px;
  > svg {
    margin: auto;
  }
  > div {
    margin: auto;
    font-size: 14px;
  }
`

const BtnContainer = styled.div`
  margin: auto;
  float: right;
`

export function TransactionHeader(
  { toggleFilter, showFilter, children },
  headerRef
) {
  const { getText } = useLocalization()
  return (
    <div>
      <Header ref={headerRef}>
        <H4>{getText('Transactions Overview')}</H4>
        <BtnContainer>
          <HeaderBtn onClick={toggleFilter}>
            <Settings style={{ marginRight: '8px' }} />
            <div>{getText('Filter')}</div>
            {showFilter ? (
              <ArrowUp style={{ marginLeft: '8px' }} />
            ) : (
              <ArrowDown style={{ marginLeft: '8px' }} />
            )}
          </HeaderBtn>
        </BtnContainer>
      </Header>
      {children}
    </div>
  )
}

export default forwardRef(TransactionHeader)
