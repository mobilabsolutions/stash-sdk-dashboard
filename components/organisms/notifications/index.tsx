import React, { memo } from 'react'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import { Chargebacks, Transactions, Refund, H4 } from '../../atoms'
import {
  NotificationTransaction,
  Notification as NotificationType
} from '../../../types'
import moment from 'moment'

const MAX_NOT = 10

const ActivityContainer = styled.div`
  padding: ${p => p.theme.spacing.medium};
  button {
    float: right;
    margin-top: -40px;
    span {
      font-size: 12px;
      color: ${p => p.theme.shade.A200};
      text-transform: uppercase;
    }
  }
  .title {
    margin-top: 0px;
    color: ${p => p.theme.shade.A700};
  }
  .notification-list {
    width: 100%;
    display: flex;
    flex-direction: column;

    height: ${p => p.theme.graphHeight.medium};
    overflow: auto;
  }
  .no-data {
    margin: auto;
  }
`

const NotificationWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 16px 0px;
  svg {
    margin: auto 0;
  }
  .left {
    display: flex;
  }
  .vertical-line {
    width: 1px;
    background-color: #e6ebf0;
    border: solid 1px #e6ebf0;
    float: left;
    transform: translate(17px, 38px);
  }
  .title-container {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  .description {
    font-size: 14px;
    color: ${p => p.theme.shade.A200};
    margin-top: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: initial;
    word-wrap: break-word;
  }
  .time {
    font-size: 12px;
    color: ${p => p.theme.shade.A200};
  }
  .right {
    float: right;
    margin-top: -40px;
    margin-right: 10px;
  }
  :last-child .vertical-line {
    background-color: transparent;
    border: solid 1px transparent;
  }
`

const Icon = ({ type }) => {
  switch (type) {
    case 'Refunded':
    case 'Failed':
      return <Refund />
    case 'Chargeback':
      return <Chargebacks />
    default:
      return <Transactions />
  }
}

function getTypeFromDesc(desc: string) {
  return desc.split(' ')[0]
}

const Notification = ({
  title = '',
  description = '',
  time,
  date = moment()
}) => (
  <NotificationWrapper data-testid="notification-el">
    <div className="left">
      <span className="vertical-line"></span>
      <Icon type={getTypeFromDesc(description)} />
      <div className="title-container">
        <span className="title">{title}</span>
        <span className="description" title={description}>
          {description}
        </span>
      </div>
    </div>
    <div className="right">
      <span className="time" title={date.format('DD/MM/YYYY HH:mm:ss')}>
        {time}
      </span>
    </div>
  </NotificationWrapper>
)

interface Props {
  notifications: NotificationType[]
  transactions: NotificationTransaction[]
}

const mapDays = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 0
}

function getDateFromWeekday(_weekDay: string) {
  const moment_en = moment()
  moment_en.locale('en')

  const weekDay = mapDays[_weekDay] || 0 // Using this approach in order to get the same weekday if diferent locale
  const shouldSubstract = moment_en.weekday() < weekDay
  return moment_en
    .weekday(shouldSubstract ? weekDay - 7 : weekDay)
    .locale(moment().locale())
}

export function Notifications(props: Props) {
  const { getText } = useLocalization()
  return (
    <ActivityContainer>
      <H4 className="title">{getText('Notifications')}</H4>
      <div className="notification-list">
        {props.notifications
          .filter(notification => !!notification) // Skipping null notification for pending, need fix from backend
          .map(notification => ({
            title: notification.paymentMethod,
            description: notification.content,
            date: moment(notification.date)
          }))
          .concat(
            props.transactions.map(transaction => ({
              title: transaction.day,
              description: getText('%{amount} transactions', {
                amount: transaction.nrOfTransactions
              }),
              date: getDateFromWeekday(transaction.day)
            }))
          )
          .sort((a, b) => b.date.unix() - a.date.unix())
          .map(({ title, description, date }, i) => (
            <Notification
              key={`${i}-${title}`}
              title={title}
              description={description}
              date={date}
              time={date.fromNow()}
            />
          ))
          .slice(0, MAX_NOT)}
      </div>
    </ActivityContainer>
  )
}

export default memo(Notifications)
