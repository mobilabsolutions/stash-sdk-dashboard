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
  red: Color
}

export default {
  font: 'Raleway,Ubuntu,Helvetica,Arial,sans-serif',
  fontHeadline: 'Ubuntu,Raleway,Helvetica,Arial,sans-serif',
  white: '#fff',
  primary: {
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
    A100: '#ddbdbd',
    A200: '#dd9b9b',
    A300: '#f86a6a',
    A400: '#ef4e4e',
    A500: '#e12d39',
    A600: '#cf1124',
    A700: '#ab091e',
    A800: '#8a041a',
    A900: '#610316'
  }
}
