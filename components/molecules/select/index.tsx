import React from 'react'
import ReactSelect from 'react-select'

const global = {
  color: '#a3aaaf',
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
    color: '#12202a',
    fontWeight: 'bold'
  }),
  input: customProvider,
  control: (propv, { isFocused }) => ({
    ...propv,
    backgroundColor: '#f6f7f7',
    borderColor: isFocused ? '#07d0c7' : '#edeff0',
    boxShadow: isFocused ? '0 0 0 1px #07d0c7' : propv.boxShadow
  }),
  option: (prov, { isSelected }) => ({
    ...prov,
    ...global,
    borderBottom: '1px solid #edeff0',
    textTransform: 'capitalize',
    backgroundColor: isSelected ? '#ecfefd' : prov.backgroundColor,
    color: isSelected ? '#07d0c7' : '#a3aaaf',
    fontweight: 500
  })
}

export default function Select(props) {
  return <ReactSelect {...props} styles={styles} />
}
