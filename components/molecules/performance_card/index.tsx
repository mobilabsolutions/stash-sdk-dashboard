import React from 'react'
import styled from '../../styled'
import { ReactComponentLike } from 'prop-types'
import { H1 } from '../../atoms'

const Card = styled.div`
  height: 120px;
  background-color: white;
  border-radius: 8px;
  padding: ${p => p.theme.spacing.medium};
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: row;
  .left {
    width: 10%;
    min-width: 32px;
  }
  .right {
    width: 90%;
    padding-left: ${p => p.theme.spacing.small};
    span {
      text-transform: uppercase;
      font-size: 12px;
      color: ${p => p.theme.shade.A200};
    }
  }
  .right,
  .left {
    margin: auto;
  }
`

const Title = styled(H1)`
  margin: 0px;
`

interface Props {
  title: string
  titleStyle?: any
  amount: string | number
  amountStyle?: any
  iconEl: ReactComponentLike
}

export default function PerformanceCard(p: Props) {
  const { title, amount, titleStyle = {}, amountStyle = {} } = p
  return (
    <Card>
      <div className="left">
        <p.iconEl />
      </div>
      <div className="right">
        <Title style={amountStyle}>{amount}</Title>
        <span style={titleStyle}>{title}</span>
      </div>
    </Card>
  )
}
