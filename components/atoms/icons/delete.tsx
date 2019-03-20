import styled from '../../styled'

const Svg = styled.svg`
  fill: #d4d4d4;
  :hover {
    fill: ${props => props.theme.red.A600};
  }
`

export default function DeleteIcon({
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
        d="M12.707 11.293l5.657-5.657-5.657 5.657zM12 12zm-.707.707l-5.657 5.657 5.657-5.657zM13.414 12l5.657 5.657a1 1 0 0 1-1.414 1.414L12 13.414l-5.657 5.657a1 1 0 1 1-1.414-1.414L10.586 12 4.929 6.343A1 1 0 0 1 6.343 4.93L12 10.586l5.657-5.657a1 1 0 0 1 1.414 1.414L13.414 12zm-.707.707l5.657 5.657-5.657-5.657zm-1.414-1.414L5.636 5.636l5.657 5.657z"
      />
    </Svg>
  )
}
