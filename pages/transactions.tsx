import { useRef } from 'react'

import { Page, Filter } from '../components/organisms'
import { Transactions } from '../components/templates'
import { useTokenCheck, useTransactions, useClientRect } from '../hooks'
import { VerticalScrollContainer } from '../components/atoms'

export default () => {
  useTokenCheck()

  const {
    data,
    startDate,
    endDate,
    setRange,
    selectedPage,
    numberOfPages,
    resetPageSizeTo,
    pageSize,
    setPage,
    status,
    setStatus,
    text,
    setText,
    isLoading,
    reverse,
    totalCount,
    clearFilters,
    paymentMethod,
    setPaymentMethod,
    capture,
    refund
  } = useTransactions()

  const filterRef = useRef(undefined)
  const { height: filterHeight } = useClientRect(filterRef)

  return (
    <Page activePath="/transactions">
      <VerticalScrollContainer>
        <Filter
          ref={filterRef}
          startDate={startDate}
          endDate={endDate}
          clearFilters={clearFilters}
          setRange={setRange}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          status={status}
          setStatus={setStatus}
          text={text}
          setText={setText}
        />
        <Transactions
          data={data}
          isLoading={isLoading}
          refund={refund}
          reverse={reverse}
          filterHeight={filterHeight}
          capture={capture}
          numberOfPages={numberOfPages}
          setPage={setPage}
          resetPageSizeTo={resetPageSizeTo}
          pageSize={pageSize}
          totalCount={totalCount}
          selectedPage={selectedPage}
        />
      </VerticalScrollContainer>
    </Page>
  )
}
