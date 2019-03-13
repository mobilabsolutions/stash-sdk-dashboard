export default function KeyIcon({
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
        transform="rotate(-45 7.879 15.121)"
        d="M13.65 11A5.99 5.99 0 0 0 8 7c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H18v4h4v-4h2v-4H13.65zM8 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
      />
    </svg>
  )
}
