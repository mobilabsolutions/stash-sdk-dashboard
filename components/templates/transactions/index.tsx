import { useState, useEffect } from 'react'
import { useLocalization } from '../../../hooks'
import CenteredText from './centered_text'
import Popup from './popup'
import { Status, Timestamp, Reason, CustomerId, Amount } from './styled'
import 'react-table/react-table.css'
import '../../../assets/style/custom-react-table.css'
import ReactTable, { ReactTableDefaults } from 'react-table'
import { TransactionActions, PaymentMethod, Pagination } from '../../organisms'
import { actionToStatus } from '../../../assets/payment.static'

const headerStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  paddingLeft: '12px',
  paddingTop: '12px',
  paddingBottom: '5px',
  margin: 'auto',
  textAlign: 'center',
  borderRight: 'none',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.31,
  letterSpacing: 'normal',
  color: '#a3aaaf'
}

const cellStyles = {
  borderRight: 'none',
  margin: 'auto',
  textAlign: 'center',
  paddingLeft: '12px'
}

const global_columns_def = {
  ...ReactTableDefaults.column,
  style: cellStyles,
  headerStyle
}

const getActionStatus = (status: string, action: string): string => {
  switch (status) {
    case 'SUCCESS':
      return !!actionToStatus[action] ? actionToStatus[action] : 'fail'
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
  totalCount,
  pageSize,
  resetPageSizeTo,
  reverse
}) => {
  const { getText, formatDate, formatAmount } = useLocalization()
  const [action, setAction] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    // Workaround for scrolling issue
    document.getElementsByClassName('rt-tbody')[0] &&
      (document.getElementsByClassName('rt-tbody')[0].scrollTop = 0)
  }, [isLoading])

  const onClose = () => {
    isActionError(action) && clearError(action)
    setAction(null)
    setSelected(null)
  }
  const clearError = _action => {
    const map = {
      refund: refund.setError,
      capture: capture.setError,
      reverse: reverse.setError
    }
    typeof map[_action] === 'function' && map[_action]()
  }
  const isActionLoading = _action => {
    const map = {
      refund: refund.isLoading,
      capture: capture.isLoading,
      reverse: reverse.isLoading
    }
    return map[_action]
  }
  const isActionError = _action => {
    const map = {
      refund: refund.error,
      capture: capture.error,
      reverse: reverse.error
    }
    return map[_action]
  }

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
        PaginationComponent={props => (
          <Pagination {...props} totalCount={totalCount} />
        )}
        data={data}
        manual
        pages={numberOfPages}
        loading={isLoading}
        onPageSizeChange={resetPageSizeTo}
        pageSize={pageSize}
        minRows={data.length}
        previousText={getText('Previous')}
        nextText={getText('Next')}
        loadingText={getText('Loading Data')}
        noDataText={getText('No rows found')}
        pageText={getText('Page')}
        ofText={getText('of')}
        rowsText={getText('rows')}
        sortable={false}
        resizable={false}
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
            headerStyle: {
              ...headerStyle,
              textAlign: 'right'
            },
            style: {
              ...cellStyles,
              textAlign: 'right'
            },
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
            headerStyle: {
              ...headerStyle,
              textAlign: 'left'
            },
            style: {
              ...cellStyles,
              textAlign: 'left'
            },
            Cell: row => <Reason>{row.value}</Reason>
          },
          {
            Header: 'Customer Id',
            accessor: 'customerId',
            headerStyle: {
              ...headerStyle,
              textAlign: 'left'
            },
            style: {
              ...cellStyles,
              textAlign: 'left'
            },
            Cell: row => <CustomerId>{row.value}</CustomerId>
          },
          {
            Header: 'Payment Method',
            accessor: 'paymentMethod',
            Cell: row => (
              <PaymentMethod
                paymentMethod={row.value}
                title={getText(row.value)}
              />
            )
          },
          {
            Header: 'Date',
            accessor: 'timestamp',
            headerStyle: {
              ...headerStyle,
              textAlign: 'right'
            },
            style: {
              ...cellStyles,
              textAlign: 'right'
            },
            Cell: row => <Timestamp>{formatDate(row.value)}</Timestamp>
          },
          {
            Header: ' ',
            maxWidth: 96,
            resizable: false,
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
        isLoading={isActionLoading(action)}
        hasError={isActionError(action)}
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
