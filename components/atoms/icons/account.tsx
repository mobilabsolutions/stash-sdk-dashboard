export default function AccountIcon({
  width = 20,
  height = 20,
  onClick = () => null,
  disable = false
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      onClick={disable ? null : onClick}
      className={disable ? 'disable' : 'enable'}
    >
      <path
        fill="#D6D9DB"
        fillRule="evenodd"
        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z"
      />
    </svg>
  )
}
