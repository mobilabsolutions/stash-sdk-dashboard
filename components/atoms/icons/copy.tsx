import styled from '../../styled'

const Svg = styled.svg`
  fill: #d4d4d4;
  :hover {
    fill: ${props => props.theme.primary.A600};
  }
  :active {
    fill: ${props => props.theme.primary.A700};
  }
`

export default function CopyIcon({
  width = 24,
  height = 24,
  onClick = () => null,
  disable = false
}) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      onClick={disable ? null : onClick}
      className={disable ? 'disable' : 'enable'}
    >
      <g stroke="none" strokeWidth="1" fillRule="evenodd">
        <path d="M10.1538462,17 L10.1538462,19.8461538 L19.8461538,19.8461538 L19.8461538,10.1538462 L16,10.1538462 L16,15 C16,16.1045695 15.1045695,17 14,17 L10.1538462,17 Z M16,8 L19.8461538,8 C21.0356902,8 22,8.96430977 22,10.1538462 L22,19.8461538 C22,21.0356902 21.0356902,22 19.8461538,22 L10.1538462,22 C8.96430977,22 8,21.0356902 8,19.8461538 L8,17 L4,17 C2.8954305,17 2,16.1045695 2,15 L2,5 C2,3.8954305 2.8954305,3 4,3 L14,3 C15.1045695,3 16,3.8954305 16,5 L16,8 Z M4,5 L4,15 L14,15 L14,5 L4,5 Z" />
      </g>
    </Svg>
  )
}
