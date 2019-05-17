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
    setPage,
    status,
    setStatus,
    reason,
    setReason,
    isLoading,
    reverse,
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
          setRange={setRange}
          status={status}
          setStatus={setStatus}
          reason={reason}
          setReason={setReason}
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
          selectedPage={selectedPage}
        />
      </VerticalScrollContainer>
    </Page>
  )
}
