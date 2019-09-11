import { Page, HomeDashboard } from '../components/organisms'

import { useTokenCheck } from '../hooks'
import styled from '../components/styled'
import { VerticalScrollContainer } from '../components/atoms'

const CustomScrollContainer = styled(VerticalScrollContainer)`
  max-width: 1224px;
  margin: auto;
  padding-top: 40px;
`

export default () => {
  useTokenCheck()
  return (
    <Page activePath="/">
      <CustomScrollContainer>
        <HomeDashboard />
      </CustomScrollContainer>
    </Page>
  )
}
