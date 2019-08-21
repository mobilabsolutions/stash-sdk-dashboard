import React from 'react'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import {
  Chargebacks,
  Transactions,
  Refund,
  H4,
  FlatButton,
  ArrowBack
} from '../../atoms'

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

const Notification = styled.div`
  width: 100%;
  background-color: #ffffff;
  margin: 16px 0px;
  svg {
    margin: auto 0;
  }
  .left {
    display: flex;
  }
  .title-container {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
  .description {
    font-size: 14px;
    color: ${p => p.theme.shade.A200};
  }
  .time {
    font-size: 12px;
    color: ${p => p.theme.shade.A200};
  }
  .right {
    float: right;
    margin-top: -40px;
  }
`

export default function Notifications() {
  const { getText } = useLocalization()
  return (
    <ActivityContainer>
      <H4 className="title">{getText('Notifications')}</H4>
      <FlatButton>
        <span>View all</span>
        <ArrowBack
          height={13}
          width={13}
          fill={'#a3aaaf'}
          style={{
            marginLeft: '8px',
            transform: 'rotate(180deg) translateY(-2px)'
          }}
        />
      </FlatButton>
      <div className="notification-list">
        <Notification>
          <div className="left">
            <Refund />
            <div className="title-container">
              <span className="title">PayPal</span>
              <span className="description">Refunded 1000€</span>
            </div>
          </div>
          <div className="right">
            <span className="time">1 hour ago</span>
          </div>
        </Notification>
        <Notification>
          <div className="left">
            <Chargebacks />
            <div className="title-container">
              <span className="title">SEPA</span>
              <span className="description">Chargeback 30€ from SEPA</span>
            </div>
          </div>
          <div className="right">
            <span className="time">2 hour ago</span>
          </div>
        </Notification>
        <Notification>
          <div className="left">
            <Transactions />
            <div className="title-container">
              <span className="title">Yesterday</span>
              <span className="description">234 Transactions</span>
            </div>
          </div>
          <div className="right">
            <span className="time">24 hour ago</span>
          </div>
        </Notification>
        <Notification>
          <div className="left">
            <Refund />
            <div className="title-container">
              <span className="title">Credit Card</span>
              <span className="description">Mastercard 370€ - ***3456</span>
            </div>
          </div>
          <div className="right">
            <span className="time">24 hour ago</span>
          </div>
        </Notification>
        <Notification>
          <div className="left">
            <Chargebacks />
            <div className="title-container">
              <span className="title">SEPA</span>
              <span className="description">Chargeback 330€ from SEPA</span>
            </div>
          </div>
          <div className="right">
            <span className="time">2 days ago</span>
          </div>
        </Notification>
      </div>
    </ActivityContainer>
  )
}
