import React from 'react'
import { DetailView } from '../../molecules'
import { useLocalization } from '../../../hooks'
import { TimeAction } from '../../../hooks/types'
import styled from '../../styled'
import { getMappedStatus, getStatusColor } from '../../../assets/payment.static'
import { Warn } from '../../atoms'
import moment from 'moment'

interface TimeProps {
  timeline: Array<TimeAction>
}

const TimeActionItem = styled.td`
  padding: 0px 16px 16px 0px;
  > svg {
    transform: translateY(3px);
  }
`
function shouldExplain(action: string, status: string) {
  return action == 'PREAUTH' && status == 'SUCCESS'
}
function shouldShouwWarn(p: number) {
  return p === 0
}

const Info = ({ action, status }) => {
  const { getText } = useLocalization()
  const _status = getMappedStatus(status, action)
  return (
    <b>
      {getText('Payment')}{' '}
      <span style={{ textTransform: 'lowercase' }}>{getText(_status)}</span>
      {shouldExplain(action, status) && `, ${getText('but not yet captured')}`}
      {'  '}
    </b>
  )
}
const DateCmp = styled.span`
  padding-left: 8px;
`

export default function TransactionTimeline(p: TimeProps) {
  const { getText } = useLocalization()
  const { timeline = [] } = p
  return (
    <DetailView title={getText('Timeline')}>
      <table>
        <tbody>
          {timeline.map((act, i) => (
            <tr key={i}>
              <TimeActionItem>
                {shouldShouwWarn(i) && (
                  <Warn
                    fill={getStatusColor(
                      getMappedStatus(act.status, act.action)
                    )}
                  />
                )}
              </TimeActionItem>
              <TimeActionItem>
                <Info action={act.action} status={act.status} />
                <DateCmp>
                  {moment(act.createdDate, moment.defaultFormatUtc).format(
                    'MMM D, h:mm A'
                  )}
                </DateCmp>
              </TimeActionItem>
            </tr>
          ))}
        </tbody>
      </table>
    </DetailView>
  )
}
