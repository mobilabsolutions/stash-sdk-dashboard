import styled from '../../styled'
import { InputFieldWrapper, InputErrorMessage } from '../../atoms'
import Radio from '../radio'

const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2px;
`

const OptionWrapper = styled.div`
  margin: 0px 24px 0 0px;
`

export default function RadioGroup({
  field: { name, value, onChange },
  form: { touched, errors },
  items = []
}) {
  const hasErrors = touched[name] && errors[name]

  return (
    <InputFieldWrapper>
      <OptionList>
        {items.map(option => (
          <OptionWrapper key={option.value}>
            <Radio
              label={option.label}
              name={name}
              value={option.value}
              selectedOption={value}
              onChange={onChange}
            />
          </OptionWrapper>
        ))}
      </OptionList>
      {!!hasErrors && <InputErrorMessage>{errors[name]}</InputErrorMessage>}
    </InputFieldWrapper>
  )
}
