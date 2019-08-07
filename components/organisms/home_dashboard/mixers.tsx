import React from 'react'
import { useState, useEffect } from 'react'
import { useKeyPerformance } from '../../../hooks'
import { ReactElementLike } from 'prop-types'
import { KeyPerformance } from '../../../types'

interface KPProps {
  children: (p: KeyPerformance) => ReactElementLike
  liveData: KeyPerformance
}

export function KPMixer(props: KPProps) {
  const { children, liveData } = props

  const { kp, allowStream } = useKeyPerformance()
  const [state, setState] = useState({
    nrOfChargebacks: 0,
    nrOfRefundedTransactions: 0,
    nrOfTransactions: 0,
    salesVolume: 0,
    currencyId: 'EUR'
  })
  useEffect(() => {
    allowStream && setState(kp)
  }, [allowStream])
  useEffect(() => {
    allowStream &&
      setState(prev => ({
        nrOfChargebacks: liveData.nrOfChargebacks + prev.nrOfChargebacks,
        nrOfRefundedTransactions:
          liveData.nrOfRefundedTransactions + prev.nrOfRefundedTransactions,
        nrOfTransactions: liveData.nrOfTransactions + prev.nrOfTransactions,
        salesVolume: liveData.salesVolume + prev.salesVolume,
        currencyId: prev.currencyId
      }))
  }, [liveData])
  return <>{children(state)}</>
}
