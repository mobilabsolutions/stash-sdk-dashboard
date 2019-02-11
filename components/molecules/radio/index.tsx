import styled from 'styled-components'

type LabelProps = {
  label: string
}

const Label = styled.label<LabelProps>`
  display: block;
  position: relative;
  padding-left: ${props => (props.label ? '35px' : '0px')};
  cursor: pointer;
  user-select: none;
  font-family: ${props => props.theme.font};

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    top: 0;
    left: 0;
  }
  span {
    position: absolute;
    top: ${props => (props.label ? '0' : '-13px')};
    left: 0;
    height: 24px;
    width: 24px;
    background-color: ${props => props.theme.white};
    border: solid 2px ${props => props.theme.shade.A100};
    border-radius: 50%;
  }
  :hover input ~ span {
    border: solid 2px ${props => props.theme.primary.A700};
  }
  span:after {
    content: '';
    position: absolute;
    display: none;
  }
  input:checked ~ span:after {
    display: block;
  }
  span:after {
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${props => props.theme.primary.A700};
  }
`

export default ({ name, value, label, selectedOption, onChange }) => (
  <Label label={label}>
    {label}
    <input
      type="radio"
      name={name}
      value={value}
      checked={selectedOption === value}
      onChange={() => onChange(value)}
    />
    <span />
  </Label>
)
