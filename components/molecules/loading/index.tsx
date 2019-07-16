import { keyframes } from 'styled-components'
import styled from '../../styled'
import { useDebounce } from '../../../hooks'

const Animation = keyframes`
    from {left: -500px}
    80% { left: 50%;}
    100% {left: 120%;}
`

const LoadingBar = styled.div`
  height: 2px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${p => p.theme.primary.A600};
  ::before {
    display: block;
    position: absolute;
    content: '';
    left: -500px;
    width: 70%;
    height: 2px;
    background-image: linear-gradient(
      to right,
      ${p => p.theme.primary.A600},
      #ffffff,
      #ffffff,
      ${p => p.theme.primary.A600}
    );
    animation: ${Animation} 1s linear infinite;
  }
`

export default function Loading({ isLoading = false }) {
  const debouncedFlag = useDebounce(isLoading, 500)
  return debouncedFlag ? <LoadingBar /> : null
}
