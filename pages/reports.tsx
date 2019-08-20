import { Page } from '../components/organisms'
import { useTokenCheck } from '../hooks'
import styled from '../components/styled'
import { VerticalScrollContainer } from '../components/atoms'
import { ReportManagment } from '../components/templates'

const CustomScrollContainer = styled(VerticalScrollContainer)`
  max-width: 920px;
  margin: auto;
  padding-top: 40px;
  font-family: ${props => props.theme.fontTransactions};
`

export default () => {
  useTokenCheck()

  return (
    <Page activePath="/reports">
      <CustomScrollContainer>
        <ReportManagment />
      </CustomScrollContainer>
    </Page>
  )
}
