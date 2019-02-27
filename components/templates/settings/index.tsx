import 'react-dates/initialize'

import styled from 'components/styled'

import { useLocalization } from '../../../hooks'
import { Input, Radio } from '../../molecules'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 12px 24px;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 12px;
  flex-wrap: wrap;
`
const Label = styled.label`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  font-weight: bold;
  width: 10em;
`

const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 8px;
`

const OptionWrapper = styled.div`
  margin: 8px 24px 0 0px;
`

const langageOptions = ['en', 'de']

export default ({ locale, setLocale, token, setToken }) => {
  const { getText } = useLocalization()

  return (
    <Wrapper>
      <ItemWrapper>
        <Label>{getText('Language')}</Label>
        <OptionList>
          {langageOptions.map(option => (
            <OptionWrapper key={option}>
              <Radio
                label={getText(option)}
                name="status"
                value={option}
                selectedOption={locale}
                onChange={setLocale}
              />
            </OptionWrapper>
          ))}
        </OptionList>
      </ItemWrapper>
      <ItemWrapper>
        <Label>{getText('Token')}</Label>
        <Input id="token" name="token" value={token} onChanged={setToken} />
      </ItemWrapper>
    </Wrapper>
  )
}
