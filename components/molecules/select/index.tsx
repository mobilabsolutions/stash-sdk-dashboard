import React from 'react'
import ReactSelect, { components } from 'react-select'
import Theme from '../../../assets/style/theme'
import { Check } from '../../atoms'

const Option = props => {
  return (
    <components.Option {...props}>
      {props.children}
      {props.isSelected && (
        <Check
          width={22}
          height={22}
          circleColor="transparent"
          checkStroke={Theme.primary.A500}
          style={{
            transform: 'translateY(-4px)',
            display: 'block',
            margin: 'auto',
            float: 'right'
          }}
        />
      )}
    </components.Option>
  )
}

const IndicatorSeparator = () => <span></span>

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
    borderColor: isFocused ? Theme.primary.A500 : Theme.shade.A50,
    '&:hover': {
      borderColor: isFocused ? Theme.primary.A500 : Theme.shade.A200
    },
    boxShadow: 'unset'
  }),
  option: (prov, { isSelected, isFocused }) => ({
    ...prov,
    ...global,
    borderBottom: `1px solid ${Theme.shade.A25}`,
    textTransform: 'capitalize',
    fontWeight: isSelected ? 'bold' : 'normal',
    backgroundColor: isSelected
      ? Theme.primary.A50
      : isFocused
      ? Theme.shade.A25
      : prov.backgroundColor,
    color: isSelected
      ? Theme.primary.A500
      : isFocused
      ? Theme.shade.A400
      : Theme.shade.A200
  })
}

export default function Select(props) {
  const { components = {}, ...rest } = props
  return (
    <ReactSelect
      styles={styles}
      {...rest}
      components={{ Option, IndicatorSeparator, ...components }}
    />
  )
}
