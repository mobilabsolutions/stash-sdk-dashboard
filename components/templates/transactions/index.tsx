import { useState, useEffect } from 'react'

import { useLocalization } from '../../../hooks'
import CenteredText from './centered_text'
import Popup from './popup'
import { Status, Timestamp, Reason, CustomerId, Amount } from './styled'
import 'react-table/react-table.css'
import ReactTable, { ReactTableDefaults } from 'react-table'
import { TransactionActions, PaymentMethod } from '../../organisms'
const global_columns_def = {
  ...ReactTableDefaults.column,
  style: {
    textAlign: 'center'
  },
  headerStyle: {
    ontSize: '16px',
    fontWeight: 'bold',
    padding: '12px 5px',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.31,
    letterSpacing: 'normal',
    color: '#a3aaaf'
  }
}

const getActionStatus = (status: string, action: string): string => {
  switch (status) {
    case 'SUCCESS':
      const mapping = {
        PREAUTH: 'pre-Authorised',
        AUTH: 'authorised',
        REVERSAL: 'peversed',
        REFUND: 'refunded',
        CAPTURE: 'captured'
      }
      return !!mapping[action] ? mapping[action] : 'fail'
    case 'FAIL':
    default:
      return 'fail'
  }
}

export default ({
  data,
  isLoading,
  numberOfPages,
  selectedPage,
  setPage,
  refund,
  capture,
  filterHeight,
  reverse
}) => {
  const { getText, formatDate, formatAmount } = useLocalization()
  const [action, setAction] = useState(null)
  const [selected, setSelected] = useState(null)

  const onClose = () => {
    setAction(null)
    setSelected(null)
  }

  //Close action popup when the action is finished
  useEffect(() => {
    !refund.isLoading && !refund.error && onClose()
  }, [refund.isLoading])
  useEffect(() => {
    !capture.isLoading && !refund.error && onClose()
  }, [capture.isLoading])
  useEffect(() => {
    !reverse.isLoading && !refund.error && onClose()
  }, [reverse.isLoading])

  if (!data || data.length === 0) {
    return isLoading ? (
      <CenteredText>{getText('Loading Data')}</CenteredText>
    ) : (
      <CenteredText>{getText('No Data')}</CenteredText>
    )
  }

  return (
    <>
      <ReactTable
        data={data}
        manual
        pages={numberOfPages}
        loading={isLoading}
        defaultPageSize={100}
        minRows={20}
        previousText={getText('Previous')}
        nextText={getText('Next')}
        loadingText={getText('Loading Data')}
        noDataText={getText('No rows found')}
        pageText={getText('Page')}
        ofText={getText('of')}
        rowsText={getText('rows')}
        sortable={false}
        showPageSizeOptions={false}
        onPageChange={setPage}
        page={selectedPage}
        className=""
        style={{
          flex: '0 0 auto',
          border: 'none',
          borderRadius: '4px',
          flexDirection: 'column',
          padding: 0,
          maxHeight: `calc(100% - 24px - ${filterHeight || 0}px)`,
          overflowY: 'auto',
          margin: '12px 48px',
          backgroundColor: '#ffffff'
        }}
        column={global_columns_def}
        columns={[
          {
            Header: 'Amount',
            accessor: 'amount',
            Cell: row => (
              <Amount>
                {formatAmount(row.original.currencyId, row.value).value}
              </Amount>
            )
          },
          {
            Header: 'Status',
            accessor: 'status',
            Cell: row => {
              const status = getActionStatus(row.value, row.original.action)
              return <Status status={status}>{getText(status)}</Status>
            }
          },
          {
            Header: 'Description',
            accessor: 'reason',
            Cell: row => <Reason>{row.value}</Reason>
          },
          {
            Header: 'Customer Id',
            accessor: 'customerId',
            Cell: row => <CustomerId>{row.value}</CustomerId>
          },
          {
            Header: 'Payment Method',
            accessor: 'paymentMethod',
            Cell: row => (
              <PaymentMethod
                paymentMethod={row.value}
                ccType={row.original.ccType}
              />
            )
          },
          {
            Header: 'Date',
            accessor: 'timestamp',
            Cell: row => <Timestamp>{formatDate(row.value)}</Timestamp>
          },
          {
            Header: ' ',
            maxWidth: 50,
            Cell: row => (
              <TransactionActions
                status={getActionStatus(
                  row.original.status,
                  row.original.action
                )}
                onClick={type => {
                  setAction(type)
                  setSelected(row.original)
                }}
              />
            )
          }
        ]}
      />
      <Popup
        onClose={onClose}
        onAction={(
          action: string,
          values: { reason: any; refundType: string; refund: any }
        ) => {
          switch (action) {
            case 'reverse':
              return reverse.action({
                transactionId: selected.transactionId,
                reason: values.reason || ''
              })
            case 'capture':
              return capture.action({
                transactionId: selected.transactionId
              })
            case 'refund':
              return refund.action({
                transactionId: selected.transactionId,
                reason: values.reason,
                refund:
                  values.refundType == 'full' ? selected.amount : values.refund,
                currency: selected.currencyId
              })
            default:
              return ''
          }
        }}
        action={action}
        initialRefund={!!selected ? selected.amount : null}
        show={!!action}
        currencyId={!!selected ? selected.currencyId : null}
      />
    </>
  )
}
