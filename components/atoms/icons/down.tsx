export default ({
  width = 20,
  height = 20,
  onClick = () => null,
  disable = false
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48"
    onClick={disable ? null : onClick}
    className={disable ? 'disable' : 'enable'}
  >
    <path d="M14.83 16.42L24 25.59l9.17-9.17L36 19.25l-12 12-12-12z" />
  </svg>
)
