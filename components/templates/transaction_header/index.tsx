import React, { forwardRef } from 'react'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'

import {
  FlatButton,
  ArrowDown,
  ArrowUp,
  Settings,
  ArrowBack
} from '../../atoms'

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
  padding: 11px;
  > svg {
    margin: auto;
  }
  > span {
    margin: auto;
    font-size: 14px;
  }
`

const BtnContainer = styled.div`
  margin: auto;
  float: right;
`

const Export = () => (
  <ArrowBack style={{ marginRight: '8px', transform: 'rotate(135deg)' }} />
)

export function TransactionHeader(
  { toggleFilter, showFilter, children, downloadCSV },
  headerRef
) {
  const { getText } = useLocalization()
  return (
    <div>
      <Header ref={headerRef}>
        <H4>{getText('Transactions Overview')}</H4>
        <BtnContainer>
          <HeaderBtn onClick={downloadCSV}>
            <Export />
            <span>{getText('Export')}</span>
          </HeaderBtn>
        </BtnContainer>
        <BtnContainer>
          <HeaderBtn onClick={toggleFilter}>
            <Settings width={21} height={18} style={{ marginRight: '8px' }} />
            <span>{getText('Filter')}</span>
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
