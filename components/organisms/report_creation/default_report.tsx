import React from 'react'
import moment from 'moment'
import { useLocalization } from '../../../hooks'
import { ReactComponentLike } from 'prop-types'

enum DEFAUL_REPORTS {
  OVERVIEW = 'Transactions Monthly Overview',
  REFUND = 'Refunds Monthly Overview',
  CHARGEBACK = 'Chargebacks'
}

interface Props {
  downloadReport: (title: string, type: string, params: any) => void
  onClick: () => void
  El: ReactComponentLike
}

export default function DefaultReport(props: Props) {
  const { getText } = useLocalization()
  const { downloadReport, onClick, El } = props
  return (
    <>
      {Object.entries(DEFAUL_REPORTS).map(([key, value]) => (
        <El
          onClick={() => {
            const date = moment().format('YYYYMMDD')
            downloadReport(`${value}_${date}`, 'default', {
              reportType: key
            })
            onClick()
          }}
          title={getText(value)}
          key={key}
        />
      ))}
    </>
  )
}
