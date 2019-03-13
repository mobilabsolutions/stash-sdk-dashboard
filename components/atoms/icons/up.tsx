export default function UpIcon({
  width = 20,
  height = 20,
  onClick = () => null,
  disable = false
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      onClick={disable ? null : onClick}
      className={disable ? 'disable' : 'enable'}
    >
      <path d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z" />
    </svg>
  )
}
