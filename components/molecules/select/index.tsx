import React from 'react'
import ReactSelect, { components } from 'react-select'
import Theme from '../../../assets/style/theme'
import styled from '../../styled'

const Checkmark = styled.span`
  text-align: right;
  bottom: 5px;
  display: block;
  margin: auto;
  float: right;
  width: 22px;
  height: 22px;
  transform: rotate(45deg);
`
const Checkmark_stem = styled.span`
  position: absolute;
  width: 1px;
  height: 9px;
  background-color: ${props => props.theme.primary.A600};
  left: 11px;
  top: 6px;
`
const Checkmark_kick = styled.span`
  position: absolute;
  width: 3px;
  height: 1px;
  background-color: ${props => props.theme.primary.A600};
  left: 8px;
  top: 14px;
`
const Check = () => (
  <Checkmark>
    <Checkmark_stem />
    <Checkmark_kick />
  </Checkmark>
)

const Option = props => {
  return (
    <components.Option {...props}>
      {props.children}
      {props.isSelected && <Check />}
    </components.Option>
  )
}
const global = {
  color: Theme.shade.A200,
  fontSize: '14px'
}

const customProvider = provided => ({
  ...provided,
  ...global
})

const styles = {
  container: provided => ({
    ...provided,
    borderRadius: '4px',
    minWidth: '190px'
  }),
  placeholder: customProvider,
  singleValue: p => ({
    ...p,
    ...global,
    textTransform: 'capitalize',
    color: Theme.shade.A700
  }),
  input: customProvider,
  control: (propv, { isFocused }) => ({
    ...propv,
    backgroundColor: Theme.shade.A25,
    borderColor: isFocused ? Theme.primary.A600 : Theme.shade.A50,
    '&:hover': {
      borderColor: isFocused ? Theme.primary.A600 : Theme.shade.A200
    },
    boxShadow: 'unset'
  }),
  option: (prov, { isSelected, isFocused }) => ({
    ...prov,
    ...global,
    borderBottom: `1px solid ${Theme.shade.A25}`,
    textTransform: 'capitalize',
    backgroundColor: isSelected
      ? Theme.primary.A50
      : isFocused
      ? Theme.shade.A25
      : prov.backgroundColor,
    color: isSelected ? Theme.primary.A600 : Theme.shade.A200
  })
}

export default function Select(props) {
  return <ReactSelect {...props} styles={styles} components={{ Option }} />
}
