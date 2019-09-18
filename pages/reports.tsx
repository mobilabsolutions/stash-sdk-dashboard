import { Page } from '../components/organisms'
import { useTokenCheck } from '../hooks'
import styled from '../components/styled'
import { VerticalScrollContainer } from '../components/atoms'
import { ReportManagment } from '../components/templates'
import { useState } from 'react'

const CustomScrollContainer = styled(VerticalScrollContainer)`
  max-width: 920px;
  margin: auto;
  padding-top: 40px;
  font-family: ${props => props.theme.fontTransactions};
`

export default () => {
  useTokenCheck()
  const [isLoading, setisLoading] = useState(false)
  return (
    <Page activePath="/reports" isLoading={isLoading}>
      <CustomScrollContainer>
        <ReportManagment setisLoading={setisLoading} />
      </CustomScrollContainer>
    </Page>
  )
}
