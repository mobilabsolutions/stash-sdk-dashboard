import styled from '../../styled'

const Svg = styled.svg`
  cursor: pointer;
  fill: ${props => props.theme.shade.A300};
  :hover {
    fill: ${props => props.theme.primary.A600};
  }
  :active {
    fill: ${props => props.theme.primary.A700};
  }
`

export default function LogoutIcon({
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
      <path
        fillRule="evenodd"
        d="M6.859 5.17a1 1 0 0 1 1.117 1.66C6.12 8.078 5 10.103 5 12.307 5 15.994 8.125 19 12 19s7-3.006 7-6.693c0-2.202-1.12-4.226-2.972-5.475a1 1 0 1 1 1.118-1.658C19.54 6.787 21 9.427 21 12.307 21 17.117 16.962 21 12 21s-9-3.883-9-8.693C3 9.425 4.462 6.784 6.859 5.17zM13 4v8a1 1 0 0 1-2 0V4a1 1 0 0 1 2 0z"
      />
    </Svg>
  )
}
