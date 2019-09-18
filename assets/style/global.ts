export default {
  __html: `
  @font-face {
    font-family: 'Lato';
    src: url('/static/fonts/Lato-Bold.ttf');
    font-weight: bold;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/static/fonts/Lato-Regular.ttf');
    font-style: normal;
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
    position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Lato, Ubuntu, Helvetica, Arial, sans-serif;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    font-size: 16px;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
      -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
      -webkit-transition-delay: 9999s;
  }  
`
}
