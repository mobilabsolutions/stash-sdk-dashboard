export default ({
  width = 24,
  height = 24,
  onClick = () => null,
  disable = false
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    onClick={disable ? null : onClick}
    className={disable ? 'disable' : 'enable'}
  >
    <g fill="none" fillRule="evenodd" stroke="#D4D4D4" strokeWidth="2">
      <rect width="12" height="12" x="3" y="4" rx="2" />
      <path d="M15.119 8L8 16.32V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-3.881z" />
    </g>
  </svg>
)
