import { keyframes } from 'styled-components'
import styled from '../../styled'

const Animation = keyframes`
    from {left: -200px; width: 70%;}
    50% {width: 85%;}
    70% {width: 90%;}
    80% { left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
`

export default styled.div`
  height: 2px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #07d0c7;
  ::before {
    display: block;
    position: absolute;
    content: '';
    left: -200px;
    width: 200px;
    height: 4px;
    background-image: linear-gradient(
      to right,
      #07d0c7,
      #ffffff,
      #ffffff,
      #07d0c7
    );
    animation: ${Animation} 1s linear infinite;
  }
`
