import React from 'react'
import { DetailView } from '../../molecules'
import { useLocalization } from '../../../hooks'
import { TimeAction } from '../../../hooks/types'
import styled from '../../styled'
import { getMappedStatus } from '../../../assets/payment.static'
import { Warn } from '../../atoms'
import moment from 'moment'

interface TimeProps {
  timeline: Array<TimeAction>
}

const TimeActionItem = styled.td`
  padding: 0px 3px 16px 0px;
`
function shouldWarn(action, status, pos) {
  return pos == 0 && action == 'PREAUTH' && status == 'SUCCESS'
}
const Info = ({ action, status, pos }) => {
  const { getText } = useLocalization()
  const _status = getMappedStatus(status, action)
  return (
    <b>
      {getText('Payment')}{' '}
      <span style={{ textTransform: 'lowercase' }}>{getText(_status)}</span>
      {shouldWarn(action, status, pos) &&
        `, ${getText('but not yet captured')}`}
      {'  '}
    </b>
  )
}
const DateCmp = styled.span`
  padding-left: 8px;
`
function sortByDate(arr: Array<TimeAction>) {
  return arr.sort(function(a, b) {
    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  })
}

export default function TransactionTimeline(p: TimeProps) {
  const { getText } = useLocalization()
  const { timeline = [] } = p
  return (
    <DetailView title={getText('Timeline')}>
      <table>
        <tbody>
          {sortByDate(timeline).map((act, i) => (
            <tr key={i}>
              <TimeActionItem>
                {shouldWarn(act.action, act.status, i) && (
                  <Warn fill="#00be41" />
                )}
              </TimeActionItem>
              <TimeActionItem>
                <Info action={act.action} status={act.status} pos={i} />
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
