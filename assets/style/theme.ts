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

interface Spacing {
  xxsmall: string
  xsmall: string
  small: string
  medium: string
  large: string
  xlarge: string
  xxlarge: string
  xxxlarge: string
  xxxxlarge: string
}

interface GraphHeight {
  small: string
  medium: string
  large: string
}

export interface ThemeInterface {
  font: string
  fontHeadline: string
  white: string
  graphHeight: GraphHeight
  primary: Color
  shade: Color
  red: Color
  green: Color
  mobilab: Color
  spacing: Spacing
}

export default {
  font: 'Lato,Ubuntu,Helvetica,Arial,sans-serif',
  fontHeadline: 'Lato,Ubuntu,Helvetica,Arial,sans-serif',
  white: '#fff',
  graphHeight: {
    small: '200px',
    medium: '300px',
    large: '500px'
  },
  spacing: {
    xxsmall: '4px',
    xsmall: '8px',
    small: '16px',
    medium: '24px',
    large: '32px',
    xlarge: '40px',
    xxlarge: '48px',
    xxxlarge: '72px',
    xxxxlarge: '144px'
  },
  mobilab: {
    A25: '#f5fefe',
    A50: '#ecfefd',
    A100: '#cefbf9',
    A200: '#9df6f2',
    A300: '#6bf2ec',
    A400: '#3aede5',
    A500: '#08e8de',
    A600: '#07d0c7',
    A700: '#048b85',
    A800: '#035c58',
    A900: '#012e2c'
  },
  shade: {
    A25: '#f6f7f7',
    A50: '#edeff0',
    A100: '#d1d5d7',
    A200: '#a3aaaf',
    A300: '#747f86',
    A400: '#46545e',
    A500: '#22333f',
    A600: '#172935',
    A700: '#12202a',
    A800: '#0d181f',
    A900: '#091015'
  },
  red: {
    A25: '#fff1f1',
    A50: '#ffe3e3',
    A100: '#ffbdbd',
    A200: '#ff9b9b',
    A300: '#f86a6a',
    A400: '#ef4e4e',
    A500: '#e12d39',
    A600: '#cf1124',
    A700: '#ab091e',
    A800: '#8a041a',
    A900: '#610316'
  },
  green: {
    A25: '#f7fdfa',
    A50: '#EFFCF6',
    A100: '#C6F7E2',
    A200: '#8EEDC7',
    A300: '#65D6AD',
    A400: '#3EBD93',
    A500: '#27AB83',
    A600: '#199473',
    A700: '#147D64',
    A800: '#0C6B58',
    A900: '#014D40'
  },
  primary: {
    A25: '#f7fafe',
    A50: '#eff5fe',
    A100: '#d8e7fd',
    A200: '#b7d2fb',
    A300: '#8ebaf8',
    A400: '#609df6',
    A500: '#2e7ef2',
    A600: '#276bcd',
    A700: '#1f56a7',
    A800: '#194584',
    A900: '#12315e'
  }
}
