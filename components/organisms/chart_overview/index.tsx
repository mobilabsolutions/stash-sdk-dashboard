import React, { useState } from 'react'
import { components } from 'react-select'
import styled from '../../styled'
import { Select } from '../../molecules'
import { useLocalization } from '../../../hooks'
import { RefundOverview, PMOverview } from '..'
import Theme from '../../../assets/style/theme'

const Container = styled.div<{ color?: string }>`
  min-height: 120px;
  background-color: ${({ color = 'white' }) => color};
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
`

const IndicatorContainer = styled.div<{ color: string }>`
  .css-tlfecz-indicatorContainer,
  .css-tlfecz-indicatorContainer:hover,
  .css-1gtu0rj-indicatorContainer,
  .css-1gtu0rj-indicatorContainer:hover {
    color: ${p => p.color || '#ffffff'} !important;
  }
`

const ColorMap = {
  refund: {
    color: '#0c133f',
    colorOposite: '#ffffff',
    secondColor: '#4f5995',
    secondColorOposite: '#ffffff',
    label: 'Refund Overview'
  },
  payment: {
    color: '#ffffff',
    colorOposite: '#0c133f',
    secondColor: '#ffffff',
    secondColorOposite: '#4f5995',
    label: 'Payment Method'
  }
}
const IndicatorsContainerCreator = (color: string) => props => {
  return (
    <IndicatorContainer color={color}>
      <components.IndicatorsContainer {...props} />
    </IndicatorContainer>
  )
}

const ChartMap = {
  refund: RefundOverview,
  payment: () => <PMOverview />
}

const global = {
  color: Theme.shade.A200,
  fontSize: '14px'
}

const customProvider = provided => ({
  ...provided,
  ...global
})

export default function ChartOverviews() {
  const [selectedOverview, setSelectedOverview] = useState<
    'refund' | 'payment'
  >('payment')
  const { getText } = useLocalization()
  const options = Object.entries(ColorMap)
    .filter(opt => opt[0] !== selectedOverview)
    .map(opt => ({
      value: opt[0],
      label: getText(opt[1]['label'])
    }))
  const Chart = ChartMap[selectedOverview]
  const styles = {
    container: provided => ({
      ...provided,
      border: 'none',
      marginBottom: '48px',
      marginLeft: '24px',
      transform: 'translateY(24px)',
      maxWidth: '190px'
    }),
    indicatorsContainer: p => ({ ...p, color: '#ffffff' }),
    placeholder: customProvider,
    singleValue: p => ({
      ...p,
      color: selectedOverview == 'refund' ? '#ffffff' : '#12202a',
      fontSize: '18px',
      textTransform: 'capitalize'
    }),
    menu: propv => ({
      ...propv,
      borderRadius: '4px',
      backgroundColor: ColorMap[selectedOverview].color
    }),
    control: propv => ({
      ...propv,
      backgroundColor: 'unset',
      borderColor: 'transparent',
      boxShadow: 'unset'
    }),
    option: prov => ({
      ...prov,
      textTransform: 'capitalize',
      borderRadius: '4px',
      backgroundColor: ColorMap[selectedOverview].secondColor,
      color: ColorMap[selectedOverview].secondColorOposite
    })
  }
  const IndicatorsContainer = IndicatorsContainerCreator(
    ColorMap[selectedOverview].colorOposite
  )
  return (
    <Container color={ColorMap[selectedOverview].color}>
      <Select
        styles={styles}
        options={options}
        isSearchable={false}
        components={{
          IndicatorsContainer
        }}
        value={{
          value: selectedOverview,
          label: getText(ColorMap[selectedOverview].label)
        }}
        onChange={({ value }) => {
          setSelectedOverview(value)
        }}
      />
      <Chart />
    </Container>
  )
}
