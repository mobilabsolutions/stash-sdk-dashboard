import { useRef, useState } from 'react'

import { Page, Filter } from '../components/organisms'
import { Transactions, TransactionHeader } from '../components/templates'
import { useTokenCheck, useTransactions, useClientRect } from '../hooks'
import { VerticalScrollContainer } from '../components/atoms'
import styled from '../components/styled'

const CustomVerticalScrollContainer = styled(VerticalScrollContainer)`
  font-family: ${props => props.theme.fontTransactions};
`
const FILTER_HEIGHT = 68

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
    exportCSV,
    refund
  } = useTransactions()

  const headerRef = useRef(undefined)
  const { height: headerHeight } = useClientRect(headerRef)
  function isFiltered() {
    return !!startDate || !!endDate || !!status || !!text || !!paymentMethod
  }
  const [showFilter, setShowFilter] = useState(isFiltered())
  const toggleFilter = () => setShowFilter(!showFilter)
  const upperHeight =
    (showFilter ? FILTER_HEIGHT + headerHeight : headerHeight) + 65

  return (
    <Page
      activePath="/transactions"
      isLoading={isLoading || exportCSV.downloading}
    >
      <CustomVerticalScrollContainer>
        <TransactionHeader
          toggleFilter={toggleFilter}
          showFilter={showFilter}
          downloadCSV={exportCSV.download}
          ref={headerRef}
        >
          {showFilter && (
            <Filter
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
      </CustomVerticalScrollContainer>
    </Page>
  )
}
