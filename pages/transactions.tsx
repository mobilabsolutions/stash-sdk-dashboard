import { useRef, useState } from 'react'

import { Page, Filter } from '../components/organisms'
import { Transactions, TransactionHeader } from '../components/templates'
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

  const headerRef = useRef(undefined)
  const filterRef = useRef(undefined)
  const { height: filterHeight } = useClientRect(filterRef)
  const { height: headerHeight } = useClientRect(headerRef)

  const [showFilter, setShowFilter] = useState(false)
  const toggleFilter = () => setShowFilter(!showFilter)
  const upperHeight =
    (showFilter ? filterHeight + headerHeight : headerHeight) + 65
  return (
    <Page activePath="/transactions">
      <VerticalScrollContainer>
        <TransactionHeader
          toggleFilter={toggleFilter}
          showFilter={showFilter}
          ref={headerRef}
        >
          {showFilter && (
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
          )}
        </TransactionHeader>
        <Transactions
          data={data}
          isLoading={isLoading}
          refund={refund}
          reverse={reverse}
          filterHeight={upperHeight}
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
