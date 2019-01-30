import { useRef } from 'react'

import { Page, Filter, Transactions } from '../components/templates'
import { Pagination } from '../components/molecules'
import { useTransactions, useClientRect } from '../hooks'

export default () => {
  const {
    data,
    startDate,
    endDate,
    setRange,
    selectedPage,
    numberOfPages,
    setPage,
    status,
    setStatus,
    reason,
    setReason,
    isLoading,
    refund,
    isRefunding
  } = useTransactions()

  const filterRef = useRef(null)
  const { height: filterHeight } = useClientRect(filterRef)

  return (
    <Page activePath="/">
      <Filter
        ref={filterRef}
        startDate={startDate}
        endDate={endDate}
        setRange={setRange}
        status={status}
        setStatus={setStatus}
        reason={reason}
        setReason={setReason}
      />
      <Transactions
        data={data}
        isLoading={isLoading}
        filterHeight={filterHeight}
        refund={refund}
        isRefunding={isRefunding}
      />
      <Pagination
        numberOfPages={numberOfPages}
        selectedPage={selectedPage}
        onSelectPage={setPage}
      />
    </Page>
  )
}
