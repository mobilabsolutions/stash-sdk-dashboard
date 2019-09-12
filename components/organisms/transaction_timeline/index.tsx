import React from 'react'
import { DetailView, TextCurrency } from '../../molecules'
import { useLocalization } from '../../../hooks'
import { TimeAction } from '../../../hooks/types'
import styled from '../../styled'
import moment from 'moment'

interface TimeProps {
  timeline: Array<TimeAction>
  currencyId: string
}

const TimeActionItem = styled.td`
  padding: 0px 16px 16px 0px;
  > svg {
    transform: translateY(3px);
  }
  .item-details {
    font-weight: bold;
  }
`

const Info = ({ action, status, reason, amount, createdDate, currencyId }) => {
  const timestamp = moment(createdDate).toDate()

  const { getText, formatDate } = useLocalization()
  return (
    <span>
      {formatDate(timestamp)}
      <span className="item-details">
        {' - '}
        {getText(action)} {getText(status)} - {reason ? `${reason} - ` : ''}
        <TextCurrency currencyId={currencyId} value={amount / 100} />
      </span>
    </span>
  )
}

export default function TransactionTimeline(p: TimeProps) {
  const { getText } = useLocalization()
  const { timeline = [], currencyId } = p
  return (
    <DetailView title={getText('Timeline')}>
      <table>
        <tbody>
          {timeline.map((act, i) => (
            <tr key={i}>
              <TimeActionItem>
                <Info {...act} currencyId={currencyId} />
              </TimeActionItem>
            </tr>
          ))}
        </tbody>
      </table>
    </DetailView>
  )
}
