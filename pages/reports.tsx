import { Page } from '../components/organisms'
import { useTokenCheck } from '../hooks'
import { ScrollMargin } from '../components/atoms'
import { ReportManagment } from '../components/templates'
import { useState } from 'react'

export default () => {
  useTokenCheck()
  const [isLoading, setisLoading] = useState(false)
  return (
    <Page activePath="/reports" isLoading={isLoading}>
      <ScrollMargin maxWidth="920px">
        <ReportManagment setisLoading={setisLoading} />
      </ScrollMargin>
    </Page>
  )
}
