import { keyframes } from 'styled-components'
import styled from '../../styled'

const Animation = keyframes`
    from {left: -500px}
    80% { left: 50%;}
    100% {left: 120%;}
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
    left: -500px;
    width: 70%;
    height: 2px;
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
