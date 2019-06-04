import React from 'react'
import ReactSelect from 'react-select'
import Theme from '../../../assets/style/theme'

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
    color: Theme.shade.A700,
    fontWeight: 'bold'
  }),
  input: customProvider,
  control: (propv, { isFocused }) => ({
    ...propv,
    backgroundColor: Theme.shade.A25,
    borderColor: isFocused ? Theme.primary.A600 : Theme.shade.A50,
    boxShadow: isFocused ? `0 0 0 1px ${Theme.primary.A600}` : propv.boxShadow
  }),
  option: (prov, { isSelected }) => ({
    ...prov,
    ...global,
    borderBottom: `1px solid ${Theme.shade.A25}`,
    textTransform: 'capitalize',
    backgroundColor: isSelected ? Theme.primary.A50 : prov.backgroundColor,
    color: isSelected ? Theme.primary.A600 : Theme.shade.A200,
    fontweight: 500
  })
}

export default function Select(props) {
  return <ReactSelect {...props} styles={styles} />
}
