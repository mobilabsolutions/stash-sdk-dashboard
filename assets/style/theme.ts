interface Color {
  A25: string
  A50: string
  A100: string
  A200: string
  A300: string
  A400: string
  A500: string
  A600: string
  A700: string
  A800: string
  A900: string
}

export interface ThemeInterface {
  font: string
  fontHeadline: string
  white: string
  primary: Color
  shade: Color
  blue: Color
  orange: Color
  violet: Color
}

export default {
  font: 'Raleway,Ubuntu,Helvetica,Arial,sans-serif',
  fontHeadline: 'Ubuntu,Raleway,Helvetica,Arial,sans-serif',
  white: '#FFF',
  primary: {
    A25: '#F5FEFE',
    A50: '#ECFEFD',
    A100: '#CEFBF9',
    A200: '#9DF6F2',
    A300: '#6BF2EC',
    A400: '#3AEDE5',
    A500: '#08E8DE',
    A600: '#07D0C7',
    A700: '#048B85',
    A800: '#035C58',
    A900: '#012E2C'
  },
  shade: {
    A25: '#F6F7F7',
    A50: '#EDEFF0',
    A100: '#D1D5D7',
    A200: '#A3AAAF',
    A300: '#747F86',
    A400: '#46545E',
    A500: '#22333F',
    A600: '#172935',
    A700: '#12202A',
    A800: '#0D181F',
    A900: '#091015'
  },
  blue: {
    A25: '##F7FAFE',
    A50: '#EFF5FE',
    A100: '#D8E7FD',
    A200: '#B7D2FB',
    A300: '#8EBAF8',
    A400: '#609DF6',
    A500: '#2E7EF2',
    A600: '#276BCD',
    A700: '#1F56A7',
    A800: '#194584',
    A900: '#12315E'
  },
  orange: {
    A25: '#FEF8F7',
    A50: '#FEF2F0',
    A100: '#FCDEDA',
    A200: '#F9C2BA',
    A300: '#F6A094',
    A400: '#F27969',
    A500: '#ED4E39',
    A600: '#C94230',
    A700: '#A33527',
    A800: '#822A1F',
    A900: '#5C1E16'
  },
  violet: {
    A25: '#F5F6FA',
    A50: '#EDEEF5',
    A100: '#D4D6E5',
    A200: '#AFB3CF',
    A300: '#8289B4',
    A400: '#4F5995',
    A500: '#172473',
    A600: '#131E61',
    A700: '#0F184F',
    A800: '#0C133F',
    A900: '#090E2D'
  }
}
