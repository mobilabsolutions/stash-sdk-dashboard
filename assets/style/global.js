import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @font-face {
    font-family: 'Raleway';
    src: url('/static/fonts/Raleway-Regular.ttf');
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url('/static/fonts/Ubuntu-Regular.ttf');
  }

  * {
    outline: none;
    font-family: inherit;
  }

  body,
  html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Raleway, Ubuntu, Helvetica, Arial, sans-serif;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-size: 16px;
  }
`
